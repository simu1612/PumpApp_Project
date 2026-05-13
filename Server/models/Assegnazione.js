const { db } = require('../db/db');

class Assegnazione {
    static create(data, callback) {
        const { idCliente, idAllenatore, idScheda } = data;
        const sql = `INSERT INTO ASSEGNAZIONE (ID_CLIENTE, ID_ALLENATORE, ID_SCHEDA) VALUES (?, ?, ?)`;
        db.run(sql, [idCliente, idAllenatore, idScheda], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    }

    static findByIds(idCliente, idAllenatore, idScheda, callback) {
        const sql = `SELECT * FROM ASSEGNAZIONE WHERE ID_CLIENTE = ? AND ID_ALLENATORE = ? AND ID_SCHEDA = ?`;
        db.get(sql, [idCliente, idAllenatore, idScheda], function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }

    static findAll(callback) {
        const sql = `SELECT * FROM ASSEGNAZIONE`;
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static delete(idCliente, idAllenatore, idScheda, callback) {
        const sql = `DELETE FROM ASSEGNAZIONE WHERE ID_CLIENTE = ? AND ID_ALLENATORE = ? AND ID_SCHEDA = ?`;
        db.run(sql, [idCliente, idAllenatore, idScheda], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }

    // Forse una funzione per trovare assegnazioni per cliente o allenatore
    static findByCliente(idCliente, callback) {
        const sql = `SELECT * FROM ASSEGNAZIONE WHERE ID_CLIENTE = ?`;
        db.all(sql, [idCliente], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static findByAllenatore(idAllenatore, callback) {
        const sql = `SELECT * FROM ASSEGNAZIONE WHERE ID_ALLENATORE = ?`;
        db.all(sql, [idAllenatore], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }
}

module.exports = Assegnazione;