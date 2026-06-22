const bcrypt = require('bcrypt');
const db = require('../db');

async function createAdmin() {
  const email = 'sharmarishabh2725@gmail.com';
  const password = 'pass-2725Sprj';

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET password_hash = $2 RETURNING id',
      [email, hash]
    );

    console.log(`Successfully created/updated admin account for ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin account:', error);
    process.exit(1);
  }
}

createAdmin();
