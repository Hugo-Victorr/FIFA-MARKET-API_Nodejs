const express = require('express');
const LoginController = require('../controllers/LoginController');
const checkToken = require('../middlewares/auth');

const router = express.Router();

router.post('/register', LoginController.register);
router.post('/login', LoginController.login);
router.get('/user/:id', checkToken, LoginController.getUser);
router.post('/refresh', LoginController.refreshToken);

module.exports = router;
