const express = require('express');
const JogadorController = require('../controllers/JogadorController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

// CREATE
router.post('/adiciona', checkToken, JogadorController.create);

// READ ALL
router.get('/', checkToken, JogadorController.getAll);

// READ ONE
router.get('/:id', checkToken, JogadorController.getById);

// UPDATE
router.put('/atualiza/:id', checkToken, JogadorController.update);

// DELETE BY ID
router.delete('/delete/:id', checkToken, JogadorController.delete);
// DELETE ALL (não implementado, mas rota para compatibilidade)
router.delete('/deleteAll', checkToken, (req, res) => res.status(501).json({ error: 'Não implementado' }));

// CLEAR ALL
router.post('/clear', checkToken, JogadorController.clearAll);

module.exports = router;
