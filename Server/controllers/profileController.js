const bcrypt = require("bcrypt");

const db = require("../db/db");
// Gli unici che possono usare tale controller sono gli utenti dunque
// richiamo il modello User

const User = require("../models/User");

const getProfile = async (req, res) => {
    const id = req.user.id; // Ottieni l'ID dell'utente dal token JWT decodificato dal middleware
    
    try {
        const user = await User.findById(id); // Trova l'utente nel database usando l'ID
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        const {password, ...safeUser} = user; // Rimuovi la password dai dati dell'utente
        res.json({ safeUser }); // Restituisci i dati dell'utente
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: "Errore del server" });
    }
}

const updateProfile = async (req, res) => {
    const id = req.user.id; //Ottieni l'ID utente dal token decodificato dal middleware 

    const { username, email } = req.body; // Ottieni i nuovi dati dal corpo della richiesta

    // IMPORTANTE DI DEFAULT, I CAMPI DEVONO ESSERE IMPOSTATI COME QUELLI GIÀ PRESENTI NEL DATABASE, 
    // SE NON VUOI CHE VENGANO MODIFICATI, LI LASCIO UGUALI A QUELLI CHE SONO NEL DATABASE
    
    try {
        const changes = await User.updateAllInfos(id, { username, email, nome: req.body.nome, cognome: req.body.cognome }); // Aggiorna le informazioni dell'utente nel database
        if (changes === 0) {
            return res.status(404).json({ message: "Utente non trovato o nessuna modifica effettuata" });
        }
        res.json({ message: "Profilo aggiornato con successo" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

const changePassword = async (req, res) => {
    id = req.user.id; //Ottieni l'ID utente dal token
    const { oldPassword, newPassword } = req.body; // Ottieni la vecchia e la nuova password dal corpo della richiesta

    try {
        const user = await User.findById(id); // Trova l'utente nel database usando l'ID
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato, prova a rifare il login" });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.PASSWORD); // Verifica che la vecchia password sia corretta
        if (!isOldPasswordValid) {
            return res.status(400).json({ message: "La vecchia password non corrisponde" });
        }

        const newPasswordHashed = await bcrypt.hash(newPassword, db.serverPublicKey + user.ID_US);
        const changes = await User.updatePassword(id, newPasswordHashed); // Aggiorna la password dell'utente nel database
        if (changes === 0) {
            return res.status(404).json({ message: "Utente non trovato o nessuna modifica effettuata" });
        }
        res.json({ message: "Password cambiata con successo" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}