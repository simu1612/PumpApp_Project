const { db } = require('../db/db')

class Esercizio {

    // crea nuovo esercizio con nome
    static create(data, callback) {
        const { nomeEsercizio } = data;
        const sql = `INSERT INTO ESERCIZIO (NOME_ESERCIZIO) VALUES (?)`;
        db.run(sql, [nomeEsercizio], function(err) {
           if (err) {
               reject(err);
           } else {
               resolve(this.lastID);
           }
        });
    }

    // cerca un esercizio per id
    static findById(id, callback) {
        const sql = `SELECT * FROM ESERCIZIO WHERE ID_ES = ?`;
        db.get(sql, [id], function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }

    // cerca tutti gli esercizi
    static findAll(callback) {
        const sql = `SELECT * FROM ESERCIZIO`;
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    // modifica il nome di un esercizio
    static updateName(id, data, callback) {
        const { nomeEsercizio } = data;
        const sql = `UPDATE ESERCIZIO SET NOME_ESERCIZIO = ? WHERE ID_ES = ?`;
        db.run(sql, [nomeEsercizio, id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }

    //elimina un esercizio per id
    static delete(id, callback) {
        const sql = `DELETE FROM ESERCIZIO WHERE ID_ES = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }
}

module.exports = Esercizio;