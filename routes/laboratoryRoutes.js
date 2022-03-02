const router = require('express').Router();
const Laboratory = require('../models/Laboratory');
const Utils = require('../utils');

router.post('/', Utils.checkToken, async (req, res) => {
    const { name, address, status } = req.body;
    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório' });
        return;
    } else if (!address) {
        res.status(422).json({ error: 'O endereço é obrigatório' });
        return;
    } else if (!status) {
        res.status(422).json({ error: 'O status é obrigatório' });
        return;
    }
    const laboratory = {
        name,
        address,
        status,
    };
    try {
        await Laboratory.create(laboratory);
        res.status(201).json({ message: 'Registro inserido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', Utils.checkToken, async (req, res) => {
    try {
        const labs = await Laboratory.find();
        res.status(200).json(labs);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', Utils.checkToken, async (req, res) => {
    const id = req.params.id;
    try {
        const lab = await Laboratory.findOne({ _id: id });
        if (!lab) {
            res.status(422).json({ message: 'Registro não encontrado' });
            return;
        }
        res.status(200).json(lab);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.patch('/:id', Utils.checkToken, async (req, res) => {
    const id = req.params.id;
    const { name, address, status } = req.body;
    const lab = {
        name,
        address,
        status,
    };
    try {
        const updateLab = await Laboratory.updateOne({ _id: id }, lab);
        if (updateLab.matchedCount === 0) {
            res.status(422).json({ error: 'Registro não encontrado' });
            return;
        }
        res.status(200).json({ message: 'Registro editado com sucesso', updateLab });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', Utils.checkToken, async (req, res) => {
    const id = req.params.id;
    try {
        const lab = await Laboratory.findOne({ _id: id });
        if (!lab) {
            res.status(422).json({ error: 'Registro não encontrado' });
            return;
        }
        await Laboratory.deleteOne({ _id: id });
        res.status(200).json({ message: 'Registro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
module.exports = router;
