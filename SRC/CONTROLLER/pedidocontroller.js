const db = require('../DB/db'); 
const joi = require('joi'); 

const pedidoSchema = joi.object({
    dataPedido: joi.string().required(),
    qtdeItens: joi.string().required(),
    formaPagto: joi.string().required().max(15), 
    valorTotal: joi.string().required().max(10), 
    observacao: joi.string().required().max(50), 
    cpf: joi.string().length(11).required(), 
    idEntregador: joi.string().required(), 
})


exports.listarPedidos = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM pedido');
        res.json(result); 
    } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
}


exports.listarPedidosID = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM pedido WHERE idPedido = ?', [idPedido]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        res.json(result[0])
    } catch (err) {
        console.error('Erro ao buscar pedido:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


exports.adicionarPedido = async (req, res) => {
    const { dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador } = req.body;

    const { error } = pedidoSchema.validate({ dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const novoPedido = { dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador };
        await db.query('INSERT INTO pedido SET ?', novoPedido);

        res.json({ message: 'Pedido adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar pedido:', err);
        res.status(500).json({ error: 'Erro ao adicionar pedido' })
    }
};

exports.atualizarPedido = async (req, res) => {
    const { idPedido } = req.params;
    const { dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador } = req.body;
    
    const { error } = pedidoSchema.validate({ dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
    
    const [result] = await db.query('SELECT * FROM pedido WHERE idPedido = ?', [idPedido]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado'});
        }
    
    const pedidoAtualizado = { qtdeItens, formaPagto, valorTotal, observacao};
    await db.query('UPDATE pedido SET ? WHERE idPedido = ? ', [pedidoAtualizado, idPedido]);
    res.json({message: 'Pedido atualizado com sucesso'});
    } catch (err) {
    console.error('Erro ao atualizar pedido:', err); 
    res.status(500).json({error: 'Erro ao atualizar'});
    }
};


exports.deletarPedido = async (req, res) => {
    const { idPedido } = req.params;
    try {
    
    const [result] = await db.query('SELECT * FROM pedido WHERE idPedido = ?', [idPedido]);
    if (result.length === 0) {
        return res.status(400).json({ error: 'Pedido não encontrado'});
    }
    await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
    res.json({message: 'Pedido deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar pedido:', err);
        res.status(500).json({error: 'Erro ao deletar pedido'});
    }
};
