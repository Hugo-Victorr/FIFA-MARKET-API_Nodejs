const Posicao = require('../models/Posicao');

class PosicaoController {
  static async create(req, res) {
    try {
      console.log('create posiçao called');
      if (typeof req.body.nome !== 'string') throw new Error('Nome da posição é obrigatório e deve ser string');
      const posicao = await Posicao.create({ nome: req.body.nome, user: req.userId });  
      console.log('Posição criada:', posicao);
      res.status(201).json(posicao);
    } catch (err) {
      console.error('Erro ao criar posição:', err);  
      res.status(400).json({ error: err.message });  
    }
  }

  static async getAll(req, res) {
    try {
      console.log('getAll posiçao called');
      console.log('User ID:', req.userId);
      const posicoes = await Posicao.find({ user: req.userId });
      res.status(200).json(posicoes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      console.log('getById posiçao called');
      const posicao = await Posicao.findOne({ _id: req.params.id, user: req.userId });
      if (!posicao) return res.status(404).json({ error: 'Posição não encontrada' });
      res.status(200).json(posicao);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      console.log('update posiçao called');
      // id sempre por params (rota /atualiza/:id)
      const id = req.params.id;
      console.log('id: ' + id);
      if (!id) return res.status(400).json({ error: 'ID é obrigatório para atualizar' });
      const posicao = await Posicao.findOneAndUpdate(
        { _id: id, user: req.userId },
        req.body,
        { new: true }
      );
      if (!posicao) return res.status(404).json({ error: 'Posição não encontrada' });
      res.json(posicao);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      console.log('delete posiçao called');
      // id sempre por params (rota /delete/:id)
      const id = req.params.id;
      if (!id) return res.status(400).json({ error: 'ID é obrigatório para deletar' });
      const posicao = await Posicao.findOneAndDelete({ _id: id, user: req.userId });
      if (!posicao) return res.status(404).json({ error: 'Posição não encontrada' });
      res.json({ message: 'Posição removida' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async clearAll(req, res) {
    try {
      await Posicao.deleteMany({ user: req.userId });
      res.json({ message: 'Todas as posições removidas para o usuário.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PosicaoController;
