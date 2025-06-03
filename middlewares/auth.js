const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("Token não encontrado");
    return res.status(401).json({ msg: "Acesso negado!" });
  }
  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    // (Opcional) Você pode buscar o usuário e validar o refreshToken se quiser mais segurança
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ msg: "O token é invalido" });
  }
}

module.exports = checkToken;
