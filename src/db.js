const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("myBusinessCareTeamTestDB.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS transcripts (
        id INTEGER PRIMARY KEY, 
        transcript TEXT, 
        analyse TEXT,
        timestamp TEXT
    )`);

});


module.exports = db;
