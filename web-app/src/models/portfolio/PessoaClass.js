export default class PessoaClass{
    constructor(id, nome, data, documento, sexo, enderenco){
        if(id!=null) this.id_pessoa = id;
        this.nome = nome;
        this.data = data;
        this.documento = documento;
        this.sexo = sexo;
        this.enderenco = enderenco;
    }
}