const db = require('../../banco/dbConexao');

module.exports = class PessoaModel {

    static getTodos(callback) {
        return db.query("SELECT id_pessoa, nome, DATE_FORMAT(data,'%d/%m/%Y') AS data, documento, CASE sexo WHEN 'F' THEN 'Feminino' WHEN 'M' THEN 'Masculino' ELSE 'Nulo' END AS sexo, endereco FROM pessoas", callback);
    }

    static getId(id, callback) {
        return db.query("SELECT * FROM pessoas WHERE id_pessoa = ?", [id], callback)
    }

    static adicionar(pessoas, callback) {
        return db.query("INSERT INTO pessoas (nome, data, documento, sexo, endereco) VALUES(?, ?, ?, ?, ?)",
            [pessoas.nome, pessoas.data, pessoas.documento, pessoas.sexo, pessoas.endereco], callback);
    }

    static deletar(id, callback) {
        return db.query("DELETE FROM pessoas WHERE id_pessoa = ?",
            [id], callback)
    }

    static editar(pessoas, callback) {
        return db.query("UPDATE pessoas SET nome = ?, data = ?, documento = ?, sexo = ?, endereco = ? WHERE id_pessoa = ?",
        [pessoas.nome, pessoas.data, pessoas.documento, pessoas.sexo, pessoas.endereco, pessoas.id_pessoa], callback)
    }

};

