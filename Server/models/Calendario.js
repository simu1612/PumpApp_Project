const { db } = require('../db/db');

class Calendario {
    static create(data, callback) {
        const { idUtente, dataCalendario, idAllenamento } = data;
        const sql = `INSERT INTO CALENDARIO (ID_UTENTE, DATA, ID_ALLENAMENTO) VALUES (?, ?, ?)`;
        db.run(sql, [idUtente, dataCalendario, idAllenamento], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    }

    static findByIds(idUtente, dataCalendario, callback) {
        const sql = `SELECT * FROM CALENDARIO WHERE ID_UTENTE = ? AND DATA = ?`;
        db.get(sql, [idUtente, dataCalendario], function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }

    static findAll(callback) {
        const sql = `SELECT * FROM CALENDARIO`;
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static findByUtente(idUtente, callback) {
        const sql = `SELECT * FROM CALENDARIO WHERE ID_UTENTE = ?`;
        db.all(sql, [idUtente], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static findByDate(dataCalendario, callback) {
        const sql = `SELECT * FROM CALENDARIO WHERE DATA = ?`;
        db.all(sql, [dataCalendario], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static delete(idUtente, dataCalendario, callback) {
        const sql = `DELETE FROM CALENDARIO WHERE ID_UTENTE = ? AND DATA = ?`;
        db.run(sql, [idUtente, dataCalendario], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }
}

module.exports = Calendario;
