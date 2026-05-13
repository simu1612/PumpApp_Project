const { db } = require('../db/db');

class Scheda {
    static create(data, callback) {
        const { nomeScheda } = data;
        const sql = `INSERT INTO SCHEDA (NOME_SCHEDA) VALUES (?)`;
        db.run(sql, [nomeScheda], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    }

    static findById(id, callback) {
        const sql = `SELECT * FROM SCHEDA WHERE ID_SCHEDA = ?`;
        db.get(sql, [id], function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }

    static findAll(callback) {
        const sql = `SELECT * FROM SCHEDA`;
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static update(id, data, callback) {
        const { nomeScheda } = data;
        const sql = `UPDATE SCHEDA SET NOME_SCHEDA = ? WHERE ID_SCHEDA = ?`;
        db.run(sql, [nomeScheda, id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }

    static delete(id, callback) {
        const sql = `DELETE FROM SCHEDA WHERE ID_SCHEDA = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }

    static findAllByUser(idCliente, callback) {
        const sql = `SELECT S.* FROM SCHEDA S JOIN ASSEGNAZIONE A ON S.ID_SCHEDA = A.ID_SCHEDA WHERE A.ID_CLIENTE = ?`;
        db.all(sql, [idCliente], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }
}

module.exports = Scheda;