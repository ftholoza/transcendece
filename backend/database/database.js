const sqlite3Pkg = require('sqlite3');
require('dotenv').config();
const logger = require("../srcs/utils/logger");
const dbConnexionException = require("../srcs/errors/dbConnexion");
const fs = require('fs');
const path = require('path');

function connected(err) {
	try {
		if (err) {
			throw new dbConnexionException();
		}
		logger.info("Connected to database");
	} catch (err) {
		if (err.isCustomException) {
			err.fallback();
		} else {
			logger.error(err);
		}
	}
}

// Ensure database directory exists
const dbPath = process.env.DB_PATH || 'database/mydata.db';
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection
const db = new sqlite3Pkg.Database(dbPath, sqlite3Pkg.OPEN_READWRITE, connected);

// Create users table with avatar column
const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar TEXT
)`;

// Add avatar column if it doesn't exist (safe migration)
const addAvatarColumn = `
    PRAGMA table_info(users);
`;

db.all(addAvatarColumn, [], (err, rows) => {
	if (err) {
		console.error('Error checking table structure:', err);
		return;
	}

	const hasAvatarColumn = rows.some(row => row.name === 'avatar');
	if (!hasAvatarColumn) {
		db.run('ALTER TABLE users ADD COLUMN avatar TEXT;', (err) => {
			if (err) {
				console.error('Error adding avatar column:', err);
				return;
			}
			console.log('Avatar column added successfully');
		});
	}
});

// Create the table
db.run(createUsersTable, [], (err) => {
	if (err) {
		console.log('error creating user table:', err);
		return;
	}
	console.log('CREATED/VERIFIED TABLE STRUCTURE');
});

module.exports = { db };
