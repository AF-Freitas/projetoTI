const db = require('../DB/db')
const joi = require ('joi');

const entregadorSchema = joi.object ({
    nomeEntregador: joi.string().required().max(50), 
    cnh: joi.string().required(),
    telefoneEntregador: joi.string(),
})

exports.listarEntregador = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM entregador');
        res.json(result); 
    } catch (err) {
        console.error('Erro ao buscar entregadores:', err);
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
} 

exports.listarEntregadorID = async (req, res) => {
    const { idEntregador } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM entregador WHERE idEntregador = ?', [idEntregador]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Entregador não encontrado' });
        }
        res.json(result[0])
    } catch (err) {
        console.error('Erro ao buscar entregador:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.adicionarEntregador = async (req, res) => {
    const { nomeEntregador, cnh, telefoneEntregador } = req.body;

    const { error } = entregadorSchema.validate({ nomeEntregador, cnh, telefoneEntregador});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        
        const novoEntregador = { nomeEntregador, cnh, telefoneEntregador};
        await db.query('INSERT INTO entregador SET ?', novoEntregador);

        res.json({ message: 'Entregador adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar Entregador:', err);
        res.status(500).json({ error: 'Erro ao adicionar entregdor' })
    }
};

exports.atualizarEntregador = async (req, res) => {
    const { idEntregador } = req.params;
    const { nomeEntregador, telefoneEntregador } = req.body;
   
    const { error } = entregadorSchema.validate({ nomeEntregador, cnh, telefoneEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
    
    const [result] = await db.query('SELECT * FROM entregador WHERE idEntregador = ?', [idEntregador]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Entregador não encontrado'});
        }
    
    const entregadorAtualizado = { nomeEntregador, telefoneEntregador};
    await db.query('UPDATE entregador SET ? WHERE idEntregador = ? ', [entregadorAtualizado, idEntregador]);
    res.json({message: 'Entregador atualizado com sucesso'});
    } catch (err) {
    console.error('Erro ao atualizar entregador:', err); 
    res.status(500).json({ error: 'Erro ao atualizar' });
    }
};

exports.deletarEntregador = async (req, res) => {
    const { idEntregador } = req.params;
    try {
    const [result] = await db.query('SELECT * FROM entregador WHERE idEntregador = ?', [idEntregador]);
    if (result.length === 0) {
        return res.status(400).json({ error: 'Entregador não encontrado'});
    }
    await db.query('DELETE FROM entregador WHERE idEntregador = ?', [idEntregador]);
    res.json({message: 'Entrergador deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar entregador:', err);
        res.status(500).json({ error: 'Erro ao deletar entregador' });
    }
};
