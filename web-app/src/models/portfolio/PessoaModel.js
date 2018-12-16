import ConfigClass from "../../ConfigClass"

const caminho = `${ConfigClass.getUrlApi().toString()}/pessoas`;

export default class PessoaModel{
    constructor(){        
    }

    static getTodos(){
        return fetch(caminho).then(response =>{
            if(response.status >= 400){
                throw new Error('erro server');
            }
            return response.json();
        })
    }

    static getId(id){
        return fetch(`${caminho}/${id}`).then(response =>{
            if(response.status >= 400){
                throw new Error('erro server');
            }
            return response.json();
        })
    }

    static adicionar(objPessoaClass){
        return fetch(caminho,
            {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                method: "POST",
                body: JSON.stringify(objPessoaClass)
            }
        ).then(response =>{
            if(response.status >= 400){
                throw new Error('erro server');
            }
            return response.json();
        })
    }

    static editar(objPessoaClass){
        return fetch(caminho,
            {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                method: "PUT",
                body: JSON.stringify(objPessoaClass)
            }
        ).then(response =>{
            if(response.status >= 400){
                throw new Error('erro server');
            }
            return response.json();
        })
    }

    static deletar(id){
        return fetch(`${caminho}/${id}`,
            {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                method: "DELETE",
            }
        ).then(response =>{
            if(response.status >= 400){
                throw new Error('erro server');
            }
            return response.json();
        })
    }
}