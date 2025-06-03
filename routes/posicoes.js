const express = require('express');
const PosicaoController = require('../controllers/PosicaoController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

// CREATE
router.post('/adiciona', checkToken, PosicaoController.create);

// READ ALL
router.get('/', checkToken, PosicaoController.getAll);

// READ ONE
router.get('/:id', checkToken, PosicaoController.getById);

// UPDATE
router.put('/atualiza/:id', checkToken, PosicaoController.update);

// DELETE BY ID
router.delete('/delete/:id', checkToken, PosicaoController.delete);
// DELETE ALL (não implementado, mas rota para compatibilidade)
router.delete('/deleteAll', checkToken, (req, res) => res.status(501).json({ error: 'Não implementado' }));

// CLEAR ALL
router.post('/clear', checkToken, PosicaoController.clearAll);

module.exports = router;
