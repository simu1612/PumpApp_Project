const db = require('../db/db');
const Esercizio = require('../models/Esercizio');
const UTagEsercizio = require('../models/UTagEsercizio');
const Tag = require('../models/Tag');

const getAllExercises = async (req, res) => {
    try {
        const esercizi = await Esercizio.findAll();
        res.json(esercizi);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero degli esercizi", error: err });
    }
};

const changeExerciseName = async(req, res) => {
    const id = req.params.id;
    try {
        await Esercizio.updateName(id, req.body.nomeEsercizio);
        res.json({ message: "Esercizio aggiornato con successo" });
    } catch (err) {
        res.status(500).json({ message: "Errore nell'aggiornamento dell'esercizio", error: err });
    }
};

const createExercise = async (req, res) => {
    const { nomeEsercizio } = req.body.nomeEsercizio;
    const idEsercizio = await Esercizio.create({ nomeEsercizio });
    if (idEsercizio) {
        res.status(201).json({ message: "Esercizio creato con successo", id: idEsercizio });
    } else {
        res.status(500).json({ message: "Errore nella creazione dell'esercizio" });
    }
};

const getExerciseTags = async (req, res) => {
    const id = req.params.id;
    UTagEsercizio.findByEsercizio(id);
    try {
        const utags = await UTagEsercizio.getTagsByEsercizio(id);
        res.json(utags);
    } catch (err) {
        res.status(500).json({ message: "Errore nel recupero dei tag dell'esercizio", error: err });
    }
}

const removeTagFromExercise = async (req, res) => {
    const idEs = req.params.id;
    const nomeTag = req.body.nomeTag;
    
    try {
        const changes = await UTagEsercizio.delete(idEs, nomeTag);
        if (changes === 0) {
            return res.status(404).json({ message: "Associazione tag-esercizio non trovata" });
        }
        res.json({ message: "Tag rimosso dall'esercizio con successo" });
    } catch (err) {
        res.status(500).json({ message: "Errore nella rimozione del tag dall'esercizio", error: err });
    }
}

const addTagToExercise = async (req, res) => {
    const idEs = req.params.id;
    const nomeTag = req.body.nomeTag;

    try {
        const tagExists = await Tag.findByName(nomeTag);
        if (!tagExists) {
            return res.status(404).json({ message: "Tag non trovato" });
        }

        const idUTagEsercizio = await UTagEsercizio.create({ idEs, nomeTag });
        if (idUTagEsercizio) {
            res.status(201).json({ message: "Tag aggiunto all'esercizio con successo", id: idUTagEsercizio });
        } else {
            res.status(500).json({ message: "Errore nell'aggiunta del tag all'esercizio" });
        }
    } catch (err) {
        res.status(500).json({ message: "Errore nel processo di aggiunta del tag all'esercizio", error: err });
    }
}

module.exports = { 
    getAllExercises,
    changeExerciseName,
    createExercise,
    getExerciseTags,
    removeTagFromExercise,
    addTagToExercise
};