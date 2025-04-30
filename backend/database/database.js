const sqlite3Pkg = require('sqlite3');
const logger = require("../srcs/utils/logger");
const dbConnexionException = require("../srcs/errors/dbConnexion");
const sqlite3 = sqlite3Pkg.verbose();

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

const db = new sqlite3.Database('/usr/src/app/database/mydata.db', sqlite3.OPEN_READWRITE, connected);

const sql = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
)`;

db.run(sql, [], (err) => {
    if (err) {
        console.log('error creating user table');
        return ;
    }
    console.log('CREATED TABLE')
});

module.exports = { db };
