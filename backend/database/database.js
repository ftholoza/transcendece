const sqlite3 = require('sqlite3').verbose();
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
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, connected);

const sql = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
	avatar BLOB
)`;

db.run(sql, [], (err) => {
    if (err) {
        console.log('error creating user table');
        return ;
    }
    console.log('CREATED TABLE')
});

module.exports = { db };
