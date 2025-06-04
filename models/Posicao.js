const mongoose = require('mongoose');

const PosicaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Posicao', PosicaoSchema);
