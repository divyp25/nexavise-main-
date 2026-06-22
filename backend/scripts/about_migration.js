const db = require('../db');

async function migrate() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS company_info (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const info = await db.query('SELECT * FROM company_info');
    if (info.rows.length === 0) {
      await db.query(`
        INSERT INTO company_info (title, description) 
        VALUES ('Our Mission & Vision', 'We are dedicated to providing the highest level of enterprise cybersecurity solutions globally. From proactive VAPT to comprehensive SOC monitoring, we secure the future of business.')
      `);
    }

    const team = await db.query('SELECT * FROM team_members');
    if (team.rows.length === 0) {
      await db.query(`
        INSERT INTO team_members (name, role, bio, image_url) 
        VALUES ('Alex Vance', 'Chief Executive Officer', 'Alex brings 20 years of military cyber defense experience into the private sector.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80')
      `);
      await db.query(`
        INSERT INTO team_members (name, role, bio, image_url) 
        VALUES ('Sarah Jenkins', 'Head of VAPT', 'Sarah leads the red team operations, finding zero-days before the bad guys do.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80')
      `);
    }
    
    console.log('Migration successful.');
  } catch(e) {
    console.error('Migration failed:', e);
  } finally {
    process.exit();
  }
}

migrate();
