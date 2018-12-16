import PessoaModel from "../models/portfolio/PessoaModel";
import PessoaClass from "../models/portfolio/PessoaClass";

let divMsg = window.document.getElementById("msg");
let divPessoas = window.document.getElementById("pessoas");
let formulario = window.document.getElementById("form");

let objPessoaController;

class PessoaController {

    getTodosTable(divPessoas) {
        let promise = new Promise(function (resolve, reject) {
            let promiseFetch = PessoaModel.getTodos();

            promiseFetch.then(response => {
                resolve(response);
            });
        })

        promise.then(response => {
            let dados = "";

            if (response.erro) {
                this.exibirMsgAlert(response.msg, 'erro');
            } else {
                dados += `<div class="table-responsive">
                <table class="table table-striped table-bordered table-hover table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Data de Nasc.</th>
                            <th>Doc. de Identidade</th>
                            <th>Sexo</th>
                            <th>Endereço</th>
                            <th></th>
                            <th></th>
                        </th>
                    </thead>
                    <tbody>`;

                for (const servico of response.dados) {
                    dados += `<tr>
                                <td>${servico.id_pessoa}</td>
                                <td>${servico.nome}</td>
                                <td>${servico.data}</td>
                                <td>${servico.documento}</td>
                                <td>${servico.sexo}</td>
                                <td>${servico.endereco}</td>
                                <td><button type="button" class="btn btn-success btn-editar" data-id="${servico.id_pessoa}">Editar</button></td>
                                <td><button type="button" class="btn btn-danger btn-excluir" data-id="${servico.id_pessoa}">Excluir</button></td>
                            </tr>`;

                }

                dados += "</tbody></table></div>";
                divPessoas.innerHTML = dados;

                let btnsEditar = document.querySelectorAll(".btn-editar");
                let btnsExcluir = document.querySelectorAll(".btn-excluir");

                btnsEditar.forEach(function (item) {
                    item.addEventListener("click", event => {
                        objPessoaController.limparMsgAlert();
                        let id = event.target.getAttribute('data-id');
                        objPessoaController.prepararEditar(id);
                    });
                });

                btnsExcluir.forEach(function (item) {
                    item.addEventListener("click", event => {
                        objPessoaController.limparMsgAlert();
                        let id = event.target.getAttribute('data-id');
                        objPessoaController.deletar(id);
                    });
                });
            }
        }).catch(response => console.log("erro catch:", response));
    }

    prepararEditar(id){

        let promise = new Promise(function (resolve, reject) {
            let promiseFetch = PessoaModel.getId(id);

            promiseFetch.then(response => {
                resolve(response);
            });
        })

        promise.then(response => {
            if (response.erro) {
                this.exibirMsgAlert(response.msg, "erro");
            } else {

                let objPessoaClass = new PessoaClass(
                    response.dados[0].id_pessoa,
                    response.dados[0].nome,
                    response.dados[0].data,
                    response.dados[0].documento,
                    response.dados[0].sexo,
                    response.dados[0].endereco);

                formulario.id.value = objPessoaClass.id_pessoa;
                formulario.nome.value = objPessoaClass.nome;
                formulario.data.value = objPessoaClass.data;
                formulario.documento.value = objPessoaClass.documento;
                formulario.sexo.value = objPessoaClass.sexo;
                formulario.endereco.value = objPessoaClass.endereco;

                objPessoaController.ocultarElemento("listagem");
                objPessoaController.exibirElemento("formulario");
            }
        }).catch(response => {
            console.log("erro catch:", response);
        });
    };

    editar(formulario) {
        let id, nome, data, documento, sexo, endereco;
        id = formulario.id.value;
        nome = formulario.nome.value;
        data = formulario.data.value;
        documento = formulario.documento.value;
        sexo = formulario.sexo.value;
        endereco = formulario.endereco.value;

        if (id && nome && data && documento && sexo && endereco) {
            let objPessoaClass = new PessoaClass(id, nome, data, documento, sexo, endereco);

            let promise = new Promise(function (resolve, reject) {
                let promiseFetch = PessoaModel.editar(objPessoaClass);

                promiseFetch.then(response => {
                    resolve(response);
                });
            })

            promise.then(response => {
                if (response.erro) {
                    this.exibirMsgAlert(response.msg, "erro");
                } else {
                    objPessoaController.getTodosTable(divPessoas);
                    objPessoaController.exibirMsgAlert(response.msg, "sucesso");
                    objPessoaController.ocultarElemento("formulario");
                    objPessoaController.exibirElemento("listagem");
                    objPessoaController.limparCamposForm(formulario);
                }
            }).catch(response => {
                console.log("erro catch:", response);
            });

        } else {
            this.exibirMsgAlert("Por favor preencher todos os campos.", "erro");
        }
    }

    adicionar(formulario) {
        let nome, data, documento, sexo, endereco;
        nome = formulario.nome.value;
        data = formulario.data.value;
        documento = formulario.documento.value;
        sexo = formulario.sexo.value;
        endereco = formulario.endereco.value;

        if (nome && data && documento && sexo && endereco) {
            let objPessoaClass = new PessoaClass(null, nome, data, documento, sexo, endereco);

            let promise = new Promise(function (resolve, reject) {
                let promiseFetch = PessoaModel.adicionar(objPessoaClass);

                promiseFetch.then(response => {
                    resolve(response);
                });
            })

            promise.then(response => {
                if (response.erro) {
                    this.exibirMsgAlert(response.msg, "erro");
                } else {
                    objPessoaController.getTodosTable(divPessoas);
                    objPessoaController.exibirMsgAlert(response.msg, "sucesso");
                    objPessoaController.ocultarElemento("formulario");
                    objPessoaController.exibirElemento("listagem");
                    objPessoaController.limparCamposForm(formulario);
                }
            }).catch(response => {
                console.log("erro catch:", response);
            });

        } else {
            this.exibirMsgAlert("Por favor preencher todos os campos.", "erro");
        }
    }

    deletar(id) {

        let promise = new Promise(function (resolve, reject) {
            let promiseFetch = PessoaModel.deletar(id);

            promiseFetch.then(response => {
                resolve(response);
            });
        })

        promise.then(response => {
            if (response.erro) {
                this.exibirMsgAlert(response.msg, "erro");
            } else {
                objPessoaController.getTodosTable(divPessoas);
                objPessoaController.exibirMsgAlert(response.msg, "sucesso");
            }
        }).catch(response => {
            console.log("erro catch:", response);
        });
    };

    ocultarElemento(elemento) {
        document.getElementById(elemento).style.display = "none";

    }

    exibirElemento(elemento) {
        document.getElementById(elemento).style.display = "block";
    }

    limparCamposForm(form) {
        form.id.value = "";
        form.nome.value = "";
        form.data.value = "";
        form.documento.value = "";
        form.sexo.value = "";
        form.endereco.value = "";
    }

    exibirMsgAlert(msg, tipo) {
        let dados = "";
        if (tipo == "sucesso") {
            dados = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${msg}</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
        } else if (tipo == "erro") {
            dados = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${msg}</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
        }

        divMsg.innerHTML = dados;
    }

    limparMsgAlert() {
        divMsg.innerHTML = "";
    }

    registrarEvents() {
        document.getElementById('btn-exibir-formulario').addEventListener("click", function () {
            objPessoaController.limparMsgAlert();
            objPessoaController.ocultarElemento("listagem");
            objPessoaController.exibirElemento("formulario");
        });

        document.getElementById('btn-cadastrar-portfolio').addEventListener("click", function () {
            event.preventDefault();
            objPessoaController.limparMsgAlert();
            if (formulario.id.value) {
                objPessoaController.editar(formulario);
            } else {
                objPessoaController.adicionar(formulario);
            }
        });

        document.getElementById('btn-cancelar-operacao').addEventListener("click", function () {
            objPessoaController.limparMsgAlert();
            objPessoaController.limparCamposForm(formulario);
            objPessoaController.ocultarElemento("formulario");
            objPessoaController.exibirElemento("listagem");
        });
    }
}

function main() {
    objPessoaController = new PessoaController();
    objPessoaController.ocultarElemento("formulario");
    objPessoaController.getTodosTable(divPessoas);
    objPessoaController.registrarEvents();
}

window.onload = main;