const Venda = require('../models/Venda');

class VendaController {
  static async create(req, res) {
    try {
      console.log('create venda called');
      const venda = await Venda.create({ ...req.body, user: req.userId });
      res.status(201).json(venda);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static getUserIdFromRequest(req) {
    return req.userId || req.headers['x-user-id'];
  }
 
  static async getAll(req, res) {
    try {
      console.log('getAll venda called');
      console.log('User ID:', req.userId);
      const vendas = await Venda.find({ user: req.userId });
      res.json(vendas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      console.log('getById venda called');
      const venda = await Venda.findOne({ _id: req.params.id, user: req.userId });
      if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });
      res.json(venda);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      console.log('update venda called');
      // id sempre por params (rota /atualiza/:id)
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID é obrigatório para atualizar' });
      const venda = await Venda.findOneAndUpdate(
        { _id: id, user: req.userId },
        req.body,
        { new: true }
      );
      if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });
      res.json(venda);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      console.log('delete venda called');
      // id sempre por params (rota /delete/:id)
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID é obrigatório para deletar' });
      const venda = await Venda.findOneAndDelete({ _id: id, user: req.userId });
      if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });
      res.json({ message: 'Venda removida' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async clearAll(req, res) {
    try {
      await Venda.deleteMany({ user: req.userId });
      res.json({ message: 'Todas as vendas removidas para o usuário.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = VendaController;
