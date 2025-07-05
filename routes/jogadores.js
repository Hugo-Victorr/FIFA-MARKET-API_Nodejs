const express = require('express');
const JogadorController = require('../controllers/JogadorController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.post('/adiciona', checkToken, JogadorController.create);
router.get('/', checkToken, JogadorController.getAll);
router.get('/:id', checkToken, JogadorController.getById);
router.put('/atualiza/:id', checkToken, JogadorController.update);
router.delete('/delete/:id', checkToken, JogadorController.delete);
router.delete('/deleteAll', checkToken, (req, res) => res.status(501).json({ error: 'Não implementado' }));
router.post('/clear', checkToken, JogadorController.clearAll);

module.exports = router;
