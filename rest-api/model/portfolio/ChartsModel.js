const db = require('../../banco/dbConexao');

module.exports = class ChartsModel {

    static chartsSexo(pessoas, callback){
        return db.query("SELECT DISTINCT(SELECT COUNT(sexo) FROM pessoas WHERE sexo='M')AS Masculino,(SELECT COUNT(sexo) FROM pessoas WHERE sexo='F')AS Feminino FROM pessoas")
    }

};

