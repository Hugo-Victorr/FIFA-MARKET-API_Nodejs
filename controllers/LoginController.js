const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
  static async register(req, res) {
    const { name, email, age,  password, confirmpassword } = req.body;
    if (!name) return res.status(422).json({ msg: 'O nome é obrigatorio!' });
    if (!email) return res.status(422).json({ msg: 'O email é obrigatorio!' });
    if (!password) return res.status(422).json({ msg: 'A senha é obrigatoria!' });
    if (password !== confirmpassword) return res.status(422).json({ msg: 'As senhas não conferem!' });

    const userExists = await User.findOne({ email });

    if (userExists) return res.status(422).json({ msg: 'Email já está sendo usado, escolha outro!' });
    
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = User({ name, email, age, password: passwordHash });
    try {
      await user.save();
      res.status(201).json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
      res.status(500).json({ msg: 'Erro no servidor' });
    }
  }

  static async login(req, res) {
    console.log('LoginController.login called');
    const { email, password } = req.body;
    console.log('login body:', req.body);
    if (!email) return res.status(422).json({ msg: 'O email é obrigatorio' });
    if (!password) return res.status(422).json({ msg: 'A senha é obrigatorio' });
    const user = await User.findOne({ email });
    console.log('user found:', user);
    if (!user) return res.status(404).json({ msg: 'Usuario não encontrado!' });

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log('checkPassword:', checkPassword);

    if (!checkPassword) return res.status(422).json({ msg: 'Senha inválida!' });
    console.log('Senha válida, gerando tokens...');
    try {
      const secret = process.env.SECRET;
      const accessToken = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
      user.refreshToken = refreshToken;
      await user.save();
      // Remove senha e refreshToken do objeto retornado
      const userObj = user.toObject();
      delete userObj.password;
      delete userObj.refreshToken;
      res.status(200).json({
        msg: 'Autenticação realizada com sucesso!',
        user: userObj,
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Erro ao gerar token:', error); 
      res.status(500).json({ msg: 'Erro no servidor' });
    }
  }

  static async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ msg: 'Refresh token não enviado' });
    try {
      const secret = process.env.SECRET;
      const payload = jwt.verify(refreshToken, secret);
      const user = await User.findById(payload.id);
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ msg: 'Refresh token inválido ou expirado! Faça login nvamente.' });
      }
      const newAccessToken = jwt.sign({ id: user._id }, secret, { expiresIn: '15m' });
      // (Opcional) Gerar novo refreshToken e atualizar no banco
      // const newRefreshToken = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
      // user.refreshToken = newRefreshToken;
      // await user.save();
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(403).json({ msg: 'Refresh token inválido ou expirado! Faça login nvamente.' });
    }
  }

  static async getUser(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findById(id, "-password");
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao buscar usuário' });
    }
  }

  static checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Acesso negado!" });
    }
    try {
      const secret = process.env.SECRET;
      jwt.verify(token, secret);
      next();
    } catch (error) {
      res.status(400).json({ msg: "O token é invalido" });
    }
  }
}

module.exports = LoginController;
