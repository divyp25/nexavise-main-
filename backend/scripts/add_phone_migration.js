const db = require('../db');

async function migrate() {
  try {
    await db.query('ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS phone VARCHAR(20);');
    console.log('Migration successful: phone column added.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit();
  }
}

migrate();
