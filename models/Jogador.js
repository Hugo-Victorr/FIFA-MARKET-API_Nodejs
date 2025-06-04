const mongoose = require('mongoose');

const JogadorSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  posicao: String,
  ritmo: Number,
  finalizacao: Number,
  passe: Number,
  conducao: Number,
  defesa: Number,
  fisico: Number,
  preco: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Jogador', JogadorSchema);
