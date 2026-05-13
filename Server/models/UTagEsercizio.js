const { db } = require('../db/db');

class UTagEsercizio {
    static create(data, callback) {
        const { idEs, nomeTag } = data;
        const sql = `INSERT INTO U_TAG_ESERCIZIO (ID_ES, NOME_TAG) VALUES (?, ?)`;
        db.run(sql, [idEs, nomeTag], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    }

    static findByIds(idEs, nomeTag, callback) {
        const sql = `SELECT * FROM U_TAG_ESERCIZIO WHERE ID_ES = ? AND NOME_TAG = ?`;
        db.get(sql, [idEs, nomeTag], function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }

    static findAll(callback) {
        const sql = `SELECT * FROM U_TAG_ESERCIZIO`;
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static findByEsercizio(idEs, callback) {
        const sql = `SELECT * FROM U_TAG_ESERCIZIO WHERE ID_ES = ?`;
        db.all(sql, [idEs], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static findByTag(nomeTag, callback) {
        const sql = `SELECT * FROM U_TAG_ESERCIZIO WHERE NOME_TAG = ?`;
        db.all(sql, [nomeTag], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static getTagsByEsercizio(idEs, callback) {
        const sql = `SELECT TG.* FROM U_TAG_ESERCIZIO UTE JOIN TAG_GRUPPO TG ON UTE.NOME_TAG = TG.NOME WHERE UTE.ID_ES = ?`;
        db.all(sql, [idEs], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static delete(idEs, nomeTag, callback) {
        const sql = `DELETE FROM U_TAG_ESERCIZIO WHERE ID_ES = ? AND NOME_TAG = ?`;
        db.run(sql, [idEs, nomeTag], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }
}

module.exports = UTagEsercizio;