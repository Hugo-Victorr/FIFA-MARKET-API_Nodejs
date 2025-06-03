const VendaItem = require('../models/VendaItem');

class VendaItemController {
  static async create(req, res) {
    try {
      console.log('create vendaItem called');
      console.log('body:', req.body);
      const vendaItem = await VendaItem.create({ ...req.body, user: req.userId });
      res.status(201).json(vendaItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static getUserIdFromRequest(req) {
    return req.userId || req.headers['x-user-id'];
  }

  static async getAll(req, res) {
    try {
      console.log('getAll vendaItem called');
      const vendaItens = await VendaItem.find({ user: req.userId });
      res.json(vendaItens);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      console.log('getById vendaItem called');
      // console.log('vendaItem quantidade:', );
      const id = req.params.id;
      console.log('id:', id);
      const vendaItem = await VendaItem.findOne({ venda_id: req.params.id, user: req.userId });
      console.log('teste:', vendaItem);
      if (!vendaItem) return res.status(404).json({ error: 'VendaItem não encontrado' });
      res.json(vendaItem);
    } catch (err) {
      console.error('Erro ao buscar vendaItem:', err.message); 
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      console.log('update vendaItem called');
      // id sempre por params (rota /atualiza/:id)
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID é obrigatório para atualizar' });
      const vendaItem = await VendaItem.findOneAndUpdate(
        { _id: id, user: req.userId },
        req.body,
        { new: true }
      );
      if (!vendaItem) return res.status(404).json({ error: 'VendaItem não encontrado' });
      res.json(vendaItem);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      console.log('delete vendaItem called');
      // id sempre por params (rota /delete/:id)
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID é obrigatório para deletar' });
      const vendaItem = await VendaItem.findOneAndDelete({ _id: id, user: req.userId });
      if (!vendaItem) return res.status(404).json({ error: 'VendaItem não encontrado' });
      res.json({ message: 'VendaItem removido' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async clearAll(req, res) {
    try {
      await VendaItem.deleteMany({ user: req.userId });
      res.json({ message: 'Todos os vendaItens removidos para o usuário.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getItensDaVenda(req, res) {
    try {
      console.log('getItensDaVenda vendaItem called');
      const vendaId = req.params.id;
      if (!vendaId) return res.status(400).json({ error: 'venda_id é obrigatório' });
      const itens = await VendaItem.find({ venda_id: vendaId, user: req.userId });
      res.json(Array.isArray(itens) ? itens : []);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = VendaItemController;
