const path = require('path');
const api = require(path.join(__dirname, 'url.js'));
const log = require(path.join(__dirname, '..', 'configlogs', 'gravalog.js'));
const request = require('request');
class RpInfo {
    constructor(unidade) {
        this.unidade = unidade;
        this.apikey;
    }
    async buscaClientes(dados) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: api.url + `/v1.5/clientes/cnpj_cpf/${dados['cliente']['cpf']}`,
                headers: {
                    accept: 'application/json',
                    'token': this.apikey,
                    'content-type': 'application/json'
                },
            };
            request(options, async (error, response, body) => {
                if (error) {
                    console.log(error)
                }
                else {
                    switch (response.statusCode) {
                        case 200:
                            const data = JSON.parse(response.body);
                            if (data['response']['status'] == 'ok') {
                                resolve(data['response']['cliente']['codigo']);
                            }
                            else {
                                console.log(`Cadastrando Cliente na base`)
                                await this.cadastraCliente(dados).then((_) => {
                                    resolve(_);
                                }).catch((_) => console.log(_))
                            }
                            break;
                        case 401:
                            console.log('api key não autorizada busca clientes')
                            this.getToken().then((_) => {
                                this.buscaClientes(dados).then((_) => resolve(_)).catch((_) => reject(_))
                            })
                            break
                        default:
                            resolve(`Dados do cliente  ${response.body}`);
                            break;
                    }
                }
            }
            )
        })
    }
    getToken() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: api.url + `/v1.1/auth`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: {
                    "usuario": api.usuario,
                    "senha": api.senha
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    console.log(error)
                }
                else {
                    switch (response.statusCode) {
                        case 200:
                            const data = response.body
                            if (data['response']['status'] == 'ok') {
                                this.apikey = data['response']['token'];
                                console.log(data['response']['token'])
                                resolve(`Token gerado ${response.body}`);
                            }
                            else if (data['response']['status'] == 'error') {
                                resolve(`Credenciais Invalidas ${response.body}`)
                            }
                            break;
                        case 401:
                            console.log('api key não autorizada get Token')
                            break
                    }
                }
            }
            )
        })
    }
    cadastraCliente(dados) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: api.url + `/v1.6/clientes`,
                headers: {
                    'token': this.apikey,
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: {
                    "nome": `InstaLeap | ${dados['cliente']['nome']}`,
                    "classe": "",
                    "contribuinte": "S",
                    "unidadeCadastro": "100",
                    "tipoCliente": "1",
                    "sexo": "M",
                    "tipo": "F",
                    "enderecoResidencial": {
                        "uf": "SP",
                        "cep": dados['cliente']['endereco']['cep'],
                        "cidade": "4004",
                        "endereco": dados['cliente']['endereco']['endereco'],
                        "bairro": dados['cliente']['endereco']['bairro'],
                        "numero": dados['cliente']['endereco']['numero'],
                    },
                    "cpf": dados['cliente']['cpf'],
                    "orgaoExpRG": "SP",
                    "ufExpRG": "SP",
                    "email": dados['email']
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    console.log(error)
                }
                else {
                    switch (response.statusCode) {
                        case 200:
                            const data = response.body
                            if (data['response']['status'] == 'ok') {
                                resolve(`${response.body['response']['cliente']['codigo']}`);
                            }
                            else if (data['response']['status'] == 'error') {
                                resolve(`erro ao criar cliente ${response.body}`)
                            }
                            break;
                        case 401:
                            console.log('api key não autorizada cadastra cliente')
                            this.getToken().then((_) => {
                                this.cadastraCliente(dados).then((_) => console.log(_)).catch((_) => console.log(_))
                            }).catch((_) => console.log)
                            break
                    }
                }
            }
            )
        })
    }
    async InserePedidoPVD(dados) {
        var codigoCliente = await this.buscaClientes(dados)
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: api.url + `/v2.5/pedidos`,
                headers: {
                    'token': this.apikey,
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                body: {
                    "unidade": "100",
                    "origem": "Teste API",
                    "data": "21/08/2023",
                    "codigoCliente": codigoCliente,
                    "formaPagamento": "001",
                    "numeroPedidoCliente": dados['pedido']['numeropedido'],
                    "observacao": "Pedido Teste API Ecommerce",
                    "especie": 1,
                    "codigoDocumento": "8299",
                    "nome": dados['cliente']['nome'],
                    "email": dados['cliente']['email'],
                    "cpf": dados['cliente']['cpf'],
                    "cidade": 4004,
                    "itens": dados['pedido']['itens']['itensvalor']
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    console.log(error)
                }
                else {
                    switch (response.statusCode) {
                        case 200:
                            const data = response.body
                            if (data['response']['status'] == 'ok') {
                                resolve(`Pedido Criado ${JSON.stringify(response.body['response'])}`);
                            }
                            else if (data['response']['status'] == 'error') {
                                reject(response.body['response'])
                            }
                            break;
                        case 401:
                            console.log('api key não autorizada insere Pedido')
                            this.getToken().then((_) => {
                                this.InserePedidoPVD(dados).then((_) => resolve(_)).catch((_) => reject(_))
                            }).catch((_) => console.log)
                            break
                    }
                }
            }
            )
        })
    }
}
module.exports = RpInfo;


