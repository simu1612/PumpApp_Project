const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

// Gli unici che possono usare tale controller sono gli utenti dunque 
// richiamo il modello User

const User = require("../models/User");
const { serverPublicKey, serverSecretKey } = require("../db/db");

console.log(User); 

// Funzione per registrare un nuovo utente
async function registerUser(req, res) {
    const { username, email, password } = req.body;
    
    try {
        // Verifica se l'utente esiste già
        const existingEmailUser = await User.findByEmail(email);
        if (existingEmailUser) return res.status(400).json({ message: "Email già in uso" });

        // Verifico se il nome utente è già in uso
        const existingUsernameUser = await User.findByUsername(username);
        if (existingUsernameUser) return res.status(400).json({ message: "Username già in uso" });

        // Hash della password 
        // meccanismo di hashing previsto, usando bcrypt faccio 
        // chiave di hash = ID utente + chiave privata server
        let lastUsedKey = await User.getLastUsedKey(); // Ottieni l'ultima chiave utilizzata
        ++lastUsedKey; // Incrementa la chiave per il nuovo utente

        const passwordHashed = await bcrypt.hash(password, serverPublicKey + lastUsedKey);

        // Crea l'utente
        const userId = await User.create({ username, email, priv: 0, password: passwordHashed }); // Assumo priv default 1

        // Genera JWT
        const token = jwt.sign({ id: userId, username }, serverSecretKey, {
            expiresIn: '3h' // Il token scade dopo 3 ore
        }); // Sostituisci con chiave segreta reale

        res.status(201).json({ message: "Utente registrato con successo", token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Verifica se l'utente esiste già
        const existingEmailUser = await User.findByEmail(email);
        if (existingEmailUser) return res.status(400).json({ message: "Email già in uso" });
        // Verifico se il nome utente è già in uso
        const existingUsernameUser = await User.findByUsername(username);
        if (existingUsernameUser) return res.status(400).json({ message: "Username già in uso" });
        
        // Hash della password 
        let lastUsedKey = await User.getLastUsedKey(); // Ottieni l'ultima chiave utilizzata
        ++lastUsedKey; // Incrementa la chiave per il nuovo utente
        const passwordHashed = await bcrypt.hash(password, serverPublicKey + lastUsedKey);

        // Crea l'utente con priv 1 (admin)
        const userId = await User.create({ username, email, priv: 1, password: passwordHashed });

        // Genera JWT
        const token = jwt.sign({ id: userId, username }, serverSecretKey,
            {
                expiresIn: '3h' // Il token scade dopo 3 ore
            }
        ); // Sostituisci con chiave segreta reale

        res.status(201).json({ message: "Admin registrato con successo", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

const login = async (req, res) => {
    const { elementForLogin, password} = req.body; // elementForLogin può essere username o email
    
    try {
        // Trova l'utente per username o email
        const user = await User.findByBothUsernameAndEmail(elementForLogin);
        if (!user) return res.status(400).json({ message: "Credenziali non valide" });
        
        // Verifica la password
        const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
        if (!isPasswordValid) return res.status(400).json({ message: "Credenziali non valide" });
        
        // Genera JWT
        const token = jwt.sign({ id: user.ID_US, username: user.USERNAME }, serverSecretKey, {
            expiresIn: '3h' // Il token scade dopo 3 ore
        }); // Sostituisci con chiave segreta reale

        res.json({ message: "Login effettuato con successo", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

module.exports = { registerUser, registerAdmin };

