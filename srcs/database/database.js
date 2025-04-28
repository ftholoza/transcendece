import sqlite3Pkg from 'sqlite3';
const sqlite3 = sqlite3Pkg.verbose();

const db = new sqlite3.Database("./database/mydata.db", sqlite3.OPEN_READWRITE, connected);

function connected(err) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log;
}

let sql = `CREATE TABLE IF NOT EXISTS users(
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

export { db };