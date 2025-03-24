const db = require("./db");



class DB_Manager{

    saveTranscript = (text, callback = () => {})  => {
        if(text != ""){
            db.run(
                "INSERT INTO transcripts (transcript, timestamp) VALUES (?, ?)", 
                [text, new Date()], 
                function (err) {
                    if (err) return callback(err, null);
                    if (callback) callback(null, this.lastID);
                }
            );
        }
      }

    getAllTranscripts = (callback) => {
        const query = "SELECT id, transcript, analyse, timestamp FROM transcripts";
        
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("Error fetching transcripts:", err);
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    }


    getTranscriptById = async (id, callback = () => {}) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT transcript FROM transcripts WHERE id = ?", [id], (err, row) => {
              if (err) {
                reject(err);
              } else {
                resolve(row ? row.transcript : null);
              }
            });
          });
    };


    updateAnalyze = (id, analyzeText, callback = () => {}) => {
        db.run(
            "UPDATE transcripts SET analyse = ? WHERE id = ?", 
            [analyzeText, id], 
            function (err) {
                if (err) return callback(err, null);
                callback(null, this.changes); 
            }
        );
    };


    deleteRecord = (recordId, callback = () => {}) => {
        db.run(`DELETE FROM transcripts WHERE id = ?`, [recordId], function(err) {
            if (err) {
               return callback(err, null);
            } else {
                callback(null, "Ok"); 
            }
        });
    };


}

module.exports = { DB_Manager };