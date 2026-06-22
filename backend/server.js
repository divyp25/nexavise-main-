const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Database Schema
const initDb = async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.query(schema);
    
    // Schema migrations for email and phone columns in reviews
    try {
      await db.query('ALTER TABLE reviews ADD COLUMN email VARCHAR(255);');
    } catch (e) {}
    try {
      await db.query('ALTER TABLE reviews ADD COLUMN phone VARCHAR(20);');
    } catch (e) {}
    try {
      await db.query("ALTER TABLE reviews ADD COLUMN status VARCHAR(50) DEFAULT 'pending';");
      await db.query("UPDATE reviews SET status = 'approved' WHERE status = 'pending';");
    } catch (e) {}

    console.log('Database schema initialized.');
  } catch (error) {
    console.error('Failed to initialize database (Make sure PostgreSQL is running):', error.message);
  }
};
initDb();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
let stats = { totalVisitors: 1 };
if (fs.existsSync(DATA_FILE)) {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    stats = JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading data.json:', err);
  }
} else {
  fs.writeFileSync(DATA_FILE, JSON.stringify(stats));
}

const saveStats = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(stats));
};

let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  
  socket.on('register_visit', (data) => {
    if (data && data.isNewVisit) {
      stats.totalVisitors++;
      saveStats();
    }
    io.emit('stats_update', {
      activeUsers,
      totalVisitors: stats.totalVisitors
    });
  });

  socket.emit('stats_update', {
    activeUsers,
    totalVisitors: stats.totalVisitors
  });

  socket.on('disconnect', () => {
    activeUsers--;
    io.emit('stats_update', {
      activeUsers,
      totalVisitors: stats.totalVisitors
    });
  });
});

// === REST APIs ===

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.error("Auth token missing");
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) {
      console.error("JWT verify error:", err);
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, sector, service, message } = req.body;
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO inquiries (first_name, last_name, email, phone, sector, service, message) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [firstName, lastName, email, phone, sector, service, message]
    );
    res.status(201).json({ success: true, inquiryId: result.rows[0].id });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ error: 'Failed to save inquiry. Make sure PostgreSQL is running.' });
  }
});

// Admin Inquiries Endpoint
app.get('/api/inquiries', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Sectors Endpoints
app.get('/api/sectors', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM sectors ORDER BY created_at ASC');
    const sectors = result.rows;
    for (let s of sectors) {
      const srvResult = await db.query('SELECT * FROM sector_services WHERE sector_id = $1 ORDER BY created_at ASC', [s.id]);
      s.services = srvResult.rows;
      s.desc = s.description;
    }
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sectors' });
  }
});

app.post('/api/sectors', authenticateToken, async (req, res) => {
  const { id, name, icon, description } = req.body;
  try {
    await db.query(
      'INSERT INTO sectors (id, name, icon, description) VALUES ($1, $2, $3, $4)',
      [id, name, icon, description]
    );
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sector' });
  }
});

app.delete('/api/sectors/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM sectors WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sector' });
  }
});

// Sector Services
app.get('/api/sector_services', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM sector_services ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sector services' });
  }
});

app.post('/api/sector_services', authenticateToken, async (req, res) => {
  const { sector_id, name, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO sector_services (sector_id, name, description) VALUES ($1, $2, $3) RETURNING *',
      [sector_id, name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sector service' });
  }
});

app.delete('/api/sector_services/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM sector_services WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sector service' });
  }
});

// Service Categories
app.get('/api/service_categories', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM service_categories ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service categories' });
  }
});

app.post('/api/service_categories', authenticateToken, async (req, res) => {
  const { id, name, icon, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO service_categories (id, name, icon, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, name, icon, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service category' });
  }
});

app.delete('/api/service_categories/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM service_categories WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service category' });
  }
});

// Services Endpoints
app.get('/api/services', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM services ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.post('/api/services', authenticateToken, async (req, res) => {
  const { category_id, name, description, icon } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO services (category_id, name, description, icon) VALUES ($1, $2, $3, $4) RETURNING *',
      [category_id, name, description, icon]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

app.delete('/api/services/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM services WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// About Page Endpoints
app.get('/api/about', async (req, res) => {
  try {
    const info = await db.query('SELECT * FROM company_info LIMIT 1');
    const team = await db.query('SELECT * FROM team_members ORDER BY id ASC');
    res.json({ company: info.rows[0], team: team.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about data' });
  }
});

app.put('/api/about/company', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await db.query(
      'UPDATE company_info SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP RETURNING *',
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update company info' });
  }
});

app.post('/api/about/team', authenticateToken, async (req, res) => {
  const { name, role, bio, image_url } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO team_members (name, role, bio, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, role, bio, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add team member' });
  }
});

app.put('/api/about/team/:id', authenticateToken, async (req, res) => {
  const { name, role, bio, image_url } = req.body;
  try {
    const result = await db.query(
      'UPDATE team_members SET name = $1, role = $2, bio = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [name, role, bio, image_url, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

app.delete('/api/about/team/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM team_members WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// Reviews Endpoints
app.get('/api/reviews', async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.get('/api/reviews/admin', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.post('/api/reviews', async (req, res) => {
  console.log("POST /api/reviews received body:", req.body);
  const { text, author, role, rating, email, phone } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO reviews (text, author, role, rating, email, phone, status) VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING *",
      [text, author, role, rating || 5, email || null, phone || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

app.put('/api/reviews/:id', authenticateToken, async (req, res) => {
  const fields = ['text', 'author', 'role', 'rating', 'email', 'phone', 'status'];
  const updates = [];
  const values = [];
  let index = 1;

  for (const field of fields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = $${index}`);
      values.push(req.body[field]);
      index++;
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  values.push(req.params.id);
  const query = `UPDATE reviews SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`;

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /api/reviews/:id error:", error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

app.delete('/api/reviews/:id', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM reviews WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Stats Endpoint
app.get('/api/stats', (req, res) => {
  res.json({ totalVisitors: stats.totalVisitors, activeUsers });
});

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  try {
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, hash]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    
    res.status(201).json({ success: true, token, user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create account. Make sure PostgreSQL is running.' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log(`[LOGIN ATTEMPT] Email received: "${email}"`);
  console.log(`[LOGIN ATTEMPT] Password received: "${password}"`);
  
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      console.log(`[LOGIN FAILED] No user found for email: "${email}"`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      console.log(`[LOGIN FAILED] Password mismatch for email: "${email}"`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log(`[LOGIN SUCCESS] User authenticated: "${email}"`);
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    
    res.json({ success: true, token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login. Make sure PostgreSQL is running.' });
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
