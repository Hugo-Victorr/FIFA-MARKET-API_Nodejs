const express = require('express');
const router = express.Router();
const VendaItemController = require('../controllers/VendaItemController');
const checkToken = require('../middlewares/auth');

// CREATE
router.post('/adiciona', checkToken, VendaItemController.create);

// READ ALL
router.get('/', checkToken, VendaItemController.getAll);

// READ ONE
// router.get('/:id', checkToken, VendaItemController.getById);

// GET ITENS DA VENDA POR VENDA_ID
router.get('/:id', checkToken, VendaItemController.getItensDaVenda);

// UPDATE
router.put('/atualiza/:id', checkToken, VendaItemController.update);

// DELETE BY ID
router.delete('/delete/:id', checkToken, VendaItemController.delete);
// DELETE ALL (não implementado, mas rota para compatibilidade)
router.delete('/deleteAll', checkToken, (req, res) => res.status(501).json({ error: 'Não implementado' }));

// CLEAR ALL
router.post('/clear', checkToken, VendaItemController.clearAll);

module.exports = router;
