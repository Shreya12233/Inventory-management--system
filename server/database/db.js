const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'inventory.db');
const schemaPath = path.join(__dirname, 'schema.sql');

// Open database connection
const db = new Database(dbPath, { verbose: console.log });

// Enable performance and safety features
db.pragma('journal_mode = WAL');
db.pragma('busy_timeout = 5000');
db.pragma('foreign_keys = ON');

// Initialize schema
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

module.exports = db;
