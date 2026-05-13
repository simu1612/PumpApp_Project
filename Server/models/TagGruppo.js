const { db } = require('../db/db');

class TagGruppo {
    static create(data, callback) {
        const { nome, red, green, blue } = data;
        const sql = `INSERT INTO TAG_GRUPPO (NOME, RED, GREEN, BLUE) VALUES (?, ?, ?, ?)`;
        db.run(sql, [nome, red, green, blue], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    }

    static findByNome(nome, callback) {
        const sql = `SELECT * FROM TAG_GRUPPO WHERE NOME = ?`;
        db.get(sql, [nome], function(err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    }

    static findAll(callback) {
        const sql = `SELECT * FROM TAG_GRUPPO`;
        db.all(sql, [], function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }

    static update(nome, data, callback) {
        const { red, green, blue } = data;
        const sql = `UPDATE TAG_GRUPPO SET RED = ?, GREEN = ?, BLUE = ? WHERE NOME = ?`;
        db.run(sql, [red, green, blue, nome], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }

    static delete(nome, callback) {
        const sql = `DELETE FROM TAG_GRUPPO WHERE NOME = ?`;
        db.run(sql, [nome], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    }
}

module.exports = TagGruppo;