const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');
const Tempo = require('../models/tempoModel'); // <- IMPORTADO AQUI

const produtoController = {

    createProduto: (req, res) => {
        const newProduto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria,
            tempo: req.body.tempo // se estiver usando esse campo na criação
        };

        Produto.create(newProduto, (err, produtoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    getProdutoById: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/show', { produto });
        });
    },

    getAllProdutos: (req, res) => {
        const categoria = req.query.categoria || null;

        Produto.getAll(categoria, (err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            Tempo.getAll((err, tempos) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }

                res.render('produtos/create', { categorias, tempos });
            });
        });
    },

    renderEditForm: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }

                Tempo.getAll((err, tempos) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    }

                    res.render('produtos/edit', { produto, categorias, tempos });
                });
            });
        });
    },

    updateProduto: (req, res) => {
        const produtoId = req.params.id;

        const updatedProduto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria,
            tempo: req.body.tempo // se esse campo existir no banco
        };

        Produto.update(produtoId, updatedProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    deleteProduto: (req, res) => {
        const produtoId = req.params.id;

        Produto.delete(produtoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    }
};

module.exports = produtoController;
