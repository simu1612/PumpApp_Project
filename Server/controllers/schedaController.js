const db = require('../db');
const Scheda = require('../models/Scheda');
const Esercizio = require('../models/Esercizio');
const Assegnazione = require('../models/Assegnazione');
const Allenamento = require('../models /Allenamento');
const User = require('../models/User');

const getSchede = async (req, res) => {
    const id = req.user.id; // Ottieni l'ID dell'utente autenticato
    
    try {
        const schede = await Scheda.findAllByUserId(id); // Trova tutte le schede associate all'utente
        res.json({ schede }); // Restituisci le schede in formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

const getEserciziByScheda = async (req, res) => {
    const idScheda = req.params.id; // Ottieni l'ID della scheda dai parametri della richiesta
    const giorno = req.params.giorno; 
    try {
        const esercizi = await Allenamento.findBySchedaeGiorno(idScheda, giorno); // Trova tutti gli esercizi associati alla scheda
        res.json({ esercizi }); // Restituisci gli esercizi in formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

//necessità di controllare i permessi prima di fare questa operazione
const addEsercizioToScheda = async (req, res) => {
    const idScheda = req.params.id; // Ottieni l'ID della scheda dai parametri della richiesta
    const { idEs, giorno } = req.body; // Ottieni l'ID dell'esercizio e il giorno dal corpo della richiesta
    try {
        const esercizio = await Esercizio.findById(idEs); // Verifica se l'esercizio esiste
        if (!esercizio) return res.status(404).json({ message: "Esercizio non trovato" });

        await Allenamento.create({ idScheda, idEs, giorno, ripetizioni: 10 }); // Aggiungi l'esercizio alla scheda (con un numero di ripetizioni di default)
        res.status(201).json({ message: "Esercizio aggiunto alla scheda con successo" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}