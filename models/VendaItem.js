const mongoose = require('mongoose');

const VendaItemSchema = new mongoose.Schema({
  venda_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Venda' },
  produto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
  quantidade: Number,
  preco_unit: Number,
  subtotal: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('VendaItem', VendaItemSchema);
