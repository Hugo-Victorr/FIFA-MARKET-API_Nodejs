const express = require('express');
const router = express.Router();
const VendaItemController = require('../controllers/VendaItemController');
const checkToken = require('../middlewares/auth');

router.post('/adiciona', checkToken, VendaItemController.create);
router.get('/', checkToken, VendaItemController.getAll);
router.get('/:id', checkToken, VendaItemController.getItensDaVenda);
router.put('/atualiza/:id', checkToken, VendaItemController.update);
router.delete('/delete/:id', checkToken, VendaItemController.delete);
router.delete('/deleteAll', checkToken, (req, res) => res.status(501).json({ error: 'Não implementado' }));
router.post('/clear', checkToken, VendaItemController.clearAll);

module.exports = router;
