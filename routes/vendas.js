const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/VendaController');
const checkToken = require('../middlewares/auth');

router.post('/adiciona', checkToken, VendaController.create);
router.get('/', checkToken, VendaController.getAll);
router.get('/:id', checkToken, VendaController.getById);
router.put('/atualiza/:id', checkToken, VendaController.update);
router.delete('/delete/:id', checkToken, VendaController.delete);
router.delete('/deleteAll', checkToken, (req, res) => res.status(501).json({ error: 'Não implementado' }));
router.post('/clear', checkToken, VendaController.clearAll);

module.exports = router;
