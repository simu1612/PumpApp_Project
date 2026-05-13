const jwt = require("jsonwebtoken");
const { serverSecretKey } = require("../db/db");

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json ({
            message: "Token mancante, accesso negato!"
        });
    }

    req.token = token;

    jwt.verify(req.token, serverSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token non valido o scaduto" });
        }
        req.user = decoded; // Imposta req.user con i dati decodificati dal token
        next();
    });
}

module.exports = protect;