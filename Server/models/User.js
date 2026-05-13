const { db } = require('../db/db');

class User {
    static create(data, callback) {
        return new Promise((resolve, reject) => {
            
            const { username, email, priv, password, nome, cognome } = data;

            const sql = 'INSERT INTO USER (USERNAME, EMAIL, PRIV, PASSWORD, NOME, COGNOME) VALUES (?, ?, ?, ?, ?, ?)';
            db.run(sql, [username, email, priv, password, nome, cognome], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); 
                }
            });
        })
    }

    static findById(id, callback) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM USER WHERE ID_US = ?`;
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        }); 
    }
    

    static findAll(callback) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM USER`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static updateAllInfos(id, data, callback) {
        return new Promise((resolve, reject) => {
            const { username, email, nome, cognome } = data;
            const sql = `UPDATE USER SET USERNAME = ?, EMAIL = ?, NOME = ?, COGNOME = ? WHERE ID_US = ?`;
            db.run(sql, [username, email, nome, cognome, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    static deleteById(id, callback) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM USER WHERE ID_US = ?`;
            db.run(sql, [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });

        });
    }

    static findByUsername(username, callback) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM USER WHERE USERNAME = ?`;
            db.get(sql, [username], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        }); 
    }

    static findByBothUsernameAndEmail(elementForSearch, callback) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM USER WHERE USERNAME = ? OR EMAIL = ?`;
            db.get(sql, [elementForSearch, elementForSearch], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }); 
        });
    }

    static findByEmail(email, callback) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM USER WHERE EMAIL = ?`;
            db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static getLastUsedKey(callback) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT MAX(ID_US) AS lastKey FROM USER';
            db.get(sql, [], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    const lastKey = row ? row.lastKey : 0;
                    resolve(lastKey);
                }
            }); 
        }); 
    }

    static changePassword(id, newPassword, callback) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE USER SET PASSWORD = ? WHERE ID_US = ?`;
            db.run(sql, [newPassword, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }
}

module.exports = User;