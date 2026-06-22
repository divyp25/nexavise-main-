const bcrypt = require('bcrypt');
const db = require('./db');

(async () => {
  try {
    const hash = await bcrypt.hash('admin123', 10);
    const res = await db.query("UPDATE users SET password_hash = $1 WHERE email = 'admin@nexavise.com'", [hash]);
    if (res.rowCount > 0) {
      console.log('Successfully updated password for admin@nexavise.com');
    } else {
      console.log('User not found. Inserting...');
      await db.query("INSERT INTO users (email, password_hash) VALUES ('admin@nexavise.com', $1)", [hash]);
      console.log('Successfully inserted admin@nexavise.com');
    }
  } catch (error) {
    console.error('Error updating admin user:', error);
  } finally {
    process.exit();
  }
})();
