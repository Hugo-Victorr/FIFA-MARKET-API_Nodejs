const Jogador = require('../models/Jogador');

class JogadorController {
  static async create(req, res) {
    try {
      console.log('create jogador called');
      const jogador = await Jogador.create({ ...req.body, user: req.userId });
      res.status(201).json(jogador);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static getUserIdFromRequest(req) {
    // Prioriza o userId do token (req.userId), mas permite header para debug
    return req.userId || req.headers['x-user-id'];
  }

  static async getAll(req, res) {
    try {
      console.log('getAll jogador called');
      const jogadores = await Jogador.find({ user: req.userId });
      res.json(jogadores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      console.log('getById jogador called');
      const jogador = await Jogador.findOne({ _id: req.params.id, user: req.userId });
      if (!jogador) return res.status(404).json({ error: 'Jogador não encontrado' });
      res.json(jogador);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      console.log('update jogador called');
      // id sempre por params (rota /atualiza/:id)
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID é obrigatório para atualizar' });
      const jogador = await Jogador.findOneAndUpdate(
        { _id: id, user: req.userId },
        req.body,
        { new: true }
      );
      if (!jogador) return res.status(404).json({ error: 'Jogador não encontrado' });
      res.json(jogador);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      console.log('delete jogador called');
      // id sempre por params (rota /delete/:id)
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID é obrigatório para deletar' });
      const jogador = await Jogador.findOneAndDelete({ _id: id, user: req.userId });
      if (!jogador) return res.status(404).json({ error: 'Jogador não encontrado' });
      res.json({ message: 'Jogador removido' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async clearAll(req, res) {
    try {
      await Jogador.deleteMany({ user: req.userId });
      res.json({ message: 'Todos os jogadores removidos para o usuário.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = JogadorController;
