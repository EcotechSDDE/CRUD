const express = require('express');
const tempoController = require('../controllers/tempoController');
const router = express.Router();

router.get('/', tempoController.getAllTempos);
router.get('/new', tempoController.renderCreateForm);
router.post('/', tempoController.createTempo);
router.get('/:id', tempoController.getTempoById);
router.get('/:id/edit', tempoController.renderEditForm);
router.put('/:id', tempoController.updateTempo);
router.delete('/:id', tempoController.deleteTempo);

module.exports = router;