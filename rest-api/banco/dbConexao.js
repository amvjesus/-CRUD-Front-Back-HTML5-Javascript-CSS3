const mysql = require('mysql');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_test'
});

module.exports = conexao;