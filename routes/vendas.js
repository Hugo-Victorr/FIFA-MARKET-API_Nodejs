const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/VendaController');
const checkToken = require('../middlewares/auth');

// CREATE
router.post('/adiciona', checkToken, VendaController.create);

// READ ALL
router.get('/', checkToken, VendaController.getAll);

// READ ONE
router.get('/:id', checkToken, VendaController.getById);

// UPDATE
router.put('/atualiza/:id', checkToken, VendaController.update);

// DELETE BY ID
router.delete('/delete/:id', checkToken, VendaController.delete);
// DELETE ALL (não implementado, mas rota para compatibilidade)
router.delete('/deleteAll', checkToken, (req, res) => res.status(501).json({ error: 'Não implementado' }));

// CLEAR ALL
router.post('/clear', checkToken, VendaController.clearAll);

module.exports = router;
