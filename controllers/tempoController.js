const Tempo = require('../models/tempoModel');

const tempoController = {
    createTempo: (req, res) => {
        const newTempo = {
            nome: req.body.nome
        };

        Tempo.create(newTempo, (err, tempoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/tempos');
        });
    },

    getTempoById: (req, res) => {
        const tempoId = req.params.id;

        Tempo.findById(tempoId, (err, tempo) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!tempo) {
                return res.status(404).json({ message: 'Tempo not found' });
            }
            res.render('tempos/show', { tempo });
        });
    },

    getAllTempos: (req, res) => {
        Tempo.getAll((err, tempos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('tempos/index', { tempos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('tempos/create');
    },

    renderEditForm: (req, res) => {
        const tempoId = req.params.id;

        Tempo.findById(tempoId, (err, tempo) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!tempo) {
                return res.status(404).json({ message: 'Tempo not found' });
            }
            res.render('tempos/edit', { tempo });
        });
    },

    updateTempo: (req, res) => {
        const tempoId = req.params.id;
        const updatedTempo = {
            nome: req.body.nome
        };

        Tempo.update(tempoId, updatedTempo, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/tempos');
        });
    },

    deleteTempo: (req, res) => {
        const tempoId = req.params.id;

        Tempo.delete(tempoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/tempos');
        });
    }
};

module.exports = tempoController;
