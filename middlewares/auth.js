const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  console.log("Verificando token...");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("Token não encontrado");
    return res.status(401).json({ msg: "Acesso negado!" });
  }
  try {
    const secret = process.env.SECRET;
    console.log("Decodificando token...");
    const decoded = jwt.verify(token, secret);
    console.log("Token decodificado com sucesso:", decoded);

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error.name);
    if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ msg: "O token é invalido" });
  }
}

module.exports = checkToken;
