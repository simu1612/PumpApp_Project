const db = require('../db');

const Allenamento = require('../models/Allenamento');

const inserisciAllenamento = async (req, res) => {
    const id = req.user.id;
    //ricorda di cercare la scheda per il proprio ID 
    const { giorno, reps, idScheda, idEsercizio } = req.body;

    if (giorno > 7 || giorno < 1) {
        return res.status(400).json({ message: "Il giorno deve essere compreso tra 1 e 7" });
    }

    // a livello frontend dobbiamo prevedere che nell'invio del form vi siano le voci :
    /*
    * giorno: numero da 1 a 7
    * reps: numero di ripetizioni
    * idScheda: id della scheda a cui associare l'allenamento (preso in automatico ovviamente)
    * idEsercizio: id dell'esercizio da associare all'allenamento
    */

    try {
        const newAllenamento = await Allenamento.create({ idScheda : idScheda, idEsercizio: idEsercizio, giorno: giorno, ripetizioni: reps }); // Crea un nuovo allenamento nel database
        res.status(201).json({ message: "Allenamento inserito con successo", allenamento: newAllenamento });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

//serve a modificare un allenamento tra quelli delle schede 

const modificaAllenamento = async (req, res) => {
    const idAllenamento = req.params.id;
    //metti come valore di default quelli già presenti nel database o comunque metti che si modifica solo quando cliccano
    const giorno = req.body.giorno;
    const reps = req.body.reps;

    if (!giorno || !reps){
        return res.status(400).json({ message: "Non possono esserci dati null" });
    }

    if (giorno && (giorno > 7 || giorno < 1)) {
        return res.status(400).json({ message: "Il giorno deve essere compreso tra 1 e 7" });
    }

    try {
        const changes = await Allenamento.update(idAllenamento, { giorno: giorno, ripetizioni: reps });
        if (changes === 0) {
            return res.status(404).json({ message: "Allenamento non trovato o nessuna modifica effettuata" });
        }
        res.json({ message: "Allenamento modificato con successo" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

const eliminaAllenamento = async (req, res) => {
    const idAllenamento = req.params.id;
    try {
        const changes = await Allenamento.delete(idAllenamento); // Elimina l'allenamento dal database
        if (changes === 0) {
            return res.status(404).json({ message: "Allenamento non trovato" });
        }
        res.json({ message: "Azione effettuata con successo" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

const getAllenamentiScheda = async (req, res) => {
    const idScheda = req.params.idScheda;
    try {
        const allenamenti = await Allenamento.findByScheda(idScheda); // Trova gli allenamenti associati alla scheda
        res.json({ allenamenti });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Errore del server" });
    }
}

module.exports = {
    inserisciAllenamento,
    modificaAllenamento,
    eliminaAllenamento,
    getAllenamentiScheda
};