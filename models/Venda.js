const mongoose = require('mongoose');

const VendaSchema = new mongoose.Schema({
  data: String,
  total: Number,
  forma_pagamento: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Venda', VendaSchema);
