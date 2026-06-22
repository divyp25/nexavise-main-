const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run('PRAGMA foreign_keys = ON;');
    db.run('PRAGMA journal_mode = WAL;');
    db.run('PRAGMA synchronous = NORMAL;');
    db.run('PRAGMA temp_store = MEMORY;');
    db.run('PRAGMA cache_size = -64000;');
  }
});

module.exports = {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      // Handle multiple statements (used for schema.sql)
      if (!params && text.includes(';') && text.trim().split(';').length > 2) {
        db.exec(text, (err) => {
          if (err) reject(err);
          else resolve({ rows: [] });
        });
        return;
      }

      // Convert Postgres placeholders ($1, $2) to SQLite placeholders (?)
      let sql = text.replace(/\$\d+/g, '?');

      db.all(sql, params || [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve({ rows: rows || [] });
        }
      });
    });
  },
  db
};
