const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');
const Tempo = require('../models/tempoModel');

const produtoController = {
  createProduto: async (req, res) => {
    try {
      const newProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
        categoriaId: req.body.categoria,
        tempoId: req.body.tempo
      };
      await Produto.create(newProduto);
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProdutoById: async (req, res) => {
    try {
      const produto = await Produto.findByPk(req.params.id, {
        include: [Categoria, Tempo]
      });
      if (!produto) return res.status(404).json({ message: 'Produto not found' });
      res.render('produtos/show', { produto });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllProdutos: async (req, res) => {
    try {
      const categoriaFiltro = req.query.categoria || null;
      const where = categoriaFiltro ? { categoriaId: categoriaFiltro } : {};

      const produtos = await Produto.findAll({ where, include: [Categoria, Tempo] });
      const categorias = await Categoria.findAll();

      res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoriaFiltro });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderCreateForm: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      const tempos = await Tempo.findAll();
      res.render('produtos/create', { categorias, tempos });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderEditForm: async (req, res) => {
    try {
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) return res.status(404).json({ message: 'Produto not found' });

      const categorias = await Categoria.findAll();
      const tempos = await Tempo.findAll();

      res.render('produtos/edit', { produto, categorias, tempos });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateProduto: async (req, res) => {
    try {
      const updatedProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
        categoriaId: req.body.categoria,
        tempoId: req.body.tempo
      };

      const [updated] = await Produto.update(updatedProduto, {
        where: { id: req.params.id }
      });

      if (updated === 0) return res.status(404).json({ message: 'Produto not found' });

      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteProduto: async (req, res) => {
    try {
      const deleted = await Produto.destroy({ where: { id: req.params.id } });
      if (deleted === 0) return res.status(404).json({ message: 'Produto not found' });
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = produtoController;
