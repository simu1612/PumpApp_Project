const { db } = require('../db/db');

//tiene conto degli allenamenti di ogni scheda, con riferimento all'esercizio e al giorno della settimana

class Allenamento {
    static create(data, callback) {
        const { idScheda, idEs, giorno, ripetizioni } = data;
        const sql = `INSERT INTO ALLENAMENTO (ID_SCHEDA, ID_ES, GIORNO, RIPETIZIONI) VALUES (?, ?, ?, ?)`;
        db.run(sql, [idScheda, idEs, giorno, ripetizioni], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    }

    static findById(id, callback) {
        const sql = `SELECT * FROM ALLENAMENTO WHERE ID_ALLENAMENTO = ?`;
        db.get(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }

    static findAll(callback) {
        const sql = `SELECT * FROM ALLENAMENTO`;
        db.all(sql, [], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static update(id, data, callback) {
        const { giorno, ripetizioni } = data;
        const sql = `UPDATE ALLENAMENTO SET RIPETIZIONI = ?, GIORNO = ? WHERE ID_ALLENAMENTO = ?`;
        db.run(sql, [ripetizioni, giorno, id], function(err){
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }

    static delete(id, callback) {
        const sql = `DELETE FROM ALLENAMENTO WHERE ID_ALLENAMENTO = ?`;
        db.run(sql, [id], function(err){
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }

    // Trova allenamenti per scheda
    static findByScheda(idScheda, callback) {
        const sql = `SELECT * FROM ALLENAMENTO WHERE ID_SCHEDA = ? ORDER BY GIORNO`;
        db.all(sql, [idScheda], function(err, rows){ 
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    // Trova allenamenti per esercizio
    static findByEsercizio(idEs, callback) {
        const sql = `SELECT * FROM ALLENAMENTO WHERE ID_ES = ?`;
        db.all(sql, [idEs], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static findBySchedaeGiorno(idScheda, giorno, callback) {
        const sql = `SELECT * FROM ALLENAMENTO WHERE ID_SCHEDA = ? AND GIORNO = ?`;
        db.all(sql, [idScheda, giorno], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    // Trova allenamenti per giorno
    static findByGiorno(giorno, callback) {
        const sql = `SELECT * FROM ALLENAMENTO WHERE GIORNO = ?`;
        db.all(sql, [giorno], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }
}

module.exports = Allenamento;