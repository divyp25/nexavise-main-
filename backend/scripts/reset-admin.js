const bcrypt = require('bcrypt');
const db = require('../db');

async function updateAdmin() {
  const email = 'admin@nexavise.com';
  const password = 'admin123';

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    await db.query(
      'UPDATE users SET password_hash = $1 WHERE email = $2',
      [hash, email]
    );

    console.log(`Successfully updated password to "admin123" for ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating password:', error);
    process.exit(1);
  }
}

updateAdmin();
