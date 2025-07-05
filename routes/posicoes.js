const express = require('express');
const PosicaoController = require('../controllers/PosicaoController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.post('/adiciona', checkToken, PosicaoController.create);
router.get('/', checkToken, PosicaoController.getAll);
router.get('/:id', checkToken, PosicaoController.getById);
router.put('/atualiza/:id', checkToken, PosicaoController.update);
router.delete('/delete/:id', checkToken, PosicaoController.delete);
router.delete('/deleteAll', checkToken, (req, res) => res.status(501).json({ error: 'Não implementado' }));
router.post('/clear', checkToken, PosicaoController.clearAll);

module.exports = router;
