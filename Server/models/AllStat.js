const { db } = require('../db/db');

class AllStat {
    static create(data, callback) {
        const { idUtente, idEs, giorno } = data;
        const sql = `INSERT INTO ALL_STAT (ID_UTENTE, ID_ES, GIORNO) VALUES (?, ?, ?)`;
        db.run(sql, [idUtente, idEs, giorno], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    }

    static findByIds(idUtente, idEs, callback) {
        const sql = `SELECT * FROM ALL_STAT WHERE ID_UTENTE = ? AND ID_ES = ?`;
        db.get(sql, [idUtente, idEs], function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }

    static findAll(callback) {
        const sql = `SELECT * FROM ALL_STAT`;
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static findByUtente(idUtente, callback) {
        const sql = `SELECT * FROM ALL_STAT WHERE ID_UTENTE = ?`;
        db.all(sql, [idUtente], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static findByEsercizio(idEs, callback) {
        const sql = `SELECT * FROM ALL_STAT WHERE ID_ES = ?`;
        db.all(sql, [idEs], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static delete(idUtente, idEs, giorno, callback) {
        const sql = `DELETE FROM ALL_STAT WHERE ID_UTENTE = ? AND ID_ES = ? AND GIORNO = ?`;
        db.run(sql, [idUtente, idEs, giorno], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }
}

module.exports = AllStat;