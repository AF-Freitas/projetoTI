const mysql = require('mysql2/promise');
require('dotenv').config(); //carrega as variaveis de ambiente

//cria um pool de conexões com Promises
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

//testando a conexão ao iniciar a aplicação
(async() => {
    try {
        const connection = await db.getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
        connection.release(); //libera a conexão de volta para o pool
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
})();

module.exports = db;
