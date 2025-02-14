const db = require('../DB/db'); //Módulo de conexão com o banco de dados
const joi = require('joi'); //Biblioteca de validação de dados
const bcrypt = require('bcrypt'); //para encriptação de senhas

const clienteSchema = joi.object({
    cpf: joi.string().length(11).required(), // CPF deve ser uma string de exatamente 11 caracteres
    nome: joi.string().required().max(50), //nome deve ser uma string e é obrigatório
    endereco: joi.string().required().max(80), //endereço deve ser uma string e é obrigatório
    bairro: joi.string().required().max(30), //bairro é uma string e é obrigatório
    cidade: joi.string().required().max(30), //cidade é uma string e é obrigatório 
    cep: joi.string().required(), //CEP deve ser uma string e é obrigatório
    telefone: joi.string().required(), //telefone deve ser uma string e é obrigatório
    email: joi.string().email().required().max(50), //email deve ser válido e é obrigatório
    senha: joi.string().min(6).required().max(300) // Senha deve te no mínimo 6 caracteres e é obrigatória
})

//listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result); // aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
}

//buscar um cliente por CPF
exports.listarClienteCPF = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(result[0])
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//adicionar um novo cliente
exports.adicionarCliente = async (req, res) => {
    const { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;

    //validação de dados
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        //Criptografando a senha
        const hash = await bcrypt.hash(senha, 10)
        const novoCliente = { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
        await db.query('INSERT INTO cliente SET ?', novoCliente);

        res.json({ message: 'Cliente adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' })
    }
};

// Atualizar cliente
exports.atualizarCliente = async (req, res) => {
    const { cpf } = req.params;
    const { nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    //validação de dados
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
    // verifica se o cliente existe antes de atualizar 
    const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado'});
        }
    const hash = await bcrypt.hash(senha, 10);  // Criptografando a senha    
    const clienteAtualizado = { nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
    await db.query('UPDATE cliente SET ? WHERE cpf = ? ', [clienteAtualizado, cpf]);
    res.json({message: 'Cliente atualizado com sucesso'});
    } catch (err) {
    console.error('Erro ao atualizar cliente:', err); 
    res.status(500).json({error: 'Erro ao atualizar'});
    }
};

//Deletar cliente
exports.deletarCliente = async (req, res) => {
    const { cpf } = req.params;
    try {
    //verifica se o cliente existe antes de deletar
    const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
    if (result.length === 0) {
        return res.status(400).json({ error: 'Cliente não encontrado'});
    }
    await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
    res.json({message: 'Cliente deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({error: 'Erro ao deletar cliente'});
    }
};
