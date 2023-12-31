const path = require('path');
const api = require(path.join(__dirname, 'url.js'));
const log = require(path.join(__dirname, '..', 'configlogs', 'gravalog.js'));
const Data = require(path.join(__dirname, '..', 'configlogs', 'time.js'))
const data = new Data()
const request = require('request');

class InstaleapAPI {
    constructor(unidade) {
        this.unidade = unidade;
        this.apikeyunidade = this.apikey(unidade)
        this.apikeyLogisticaunidade = this.apikeyLogistica(unidade)
    }
    apikey(unidade) {
        var apikeyunidade;
        switch (unidade) {
            case '002':
                apikeyunidade = api.apikeyms
                break;
            case '007':
                apikeyunidade = api.apikeykl
                break;
            case '100':
                apikeyunidade = api.apikeycd
                break;
        }
        return apikeyunidade;
    }
    apikeyLogistica(unidade) {
        var apikeyLogisticaunidade;
        switch (unidade) {
            case '002':
                apikeyLogisticaunidade = api.apiKeyMsLogistica
                break;
            case '007':
                apikeyLogisticaunidade = api.apiKeyKLLogistica
                break;
            case '100':
                apikeyLogisticaunidade = api.apiKeyAtcLogistica
                break;
        }
        return apikeyLogisticaunidade;
    }
    async criarProduto(produtonome, produtosku, produtoembalagem, produtourlfoto, produtoean, produtomarca, fatormultiplicativo) {
        return new Promise((resolve, reject) => {
            const unidade = this.unidade
            const options = {
                method: 'POST',
                url: api.url + '/product/products',
                headers: {
                    accept: 'application/json',
                    'x-api-key': this.apikeyunidade,
                    'content-type': 'application/json'
                },
                body: {
                    photosUrl: [produtourlfoto],
                    ean: [produtoean],
                    name: produtonome,
                    sku: produtosku,
                    unit: produtoembalagem,
                    brand: produtomarca,
                    clickMultiplier: fatormultiplicativo
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    log.gravaLog(`Criacao de produto unidade : ${unidade} : Retentativa ${produtonome}-${produtosku} ${error}`)
                    this.criarProduto(produtonome, produtosku, produtoembalagem, produtourlfoto, produtoean, produtomarca).then(resolve(
                        `Criacao de produto unidade : ${unidade} : Retentativa ${produtonome}-${produtosku} Concluida`
                    )).catch(reject());
                }
                else {
                    switch (response.statusCode) {
                        case 201:
                            log.gravaLog(`Criacao de produto unidade : ${unidade} : Statuscode: 201 ${produtonome}-${produtosku} Criado`)
                            resolve(`Criacao de produto unidade : ${unidade} : Statuscode: 201 ${produtonome}-${produtosku} Criado`);
                            // console.log(`Statuscode: 201 \n${produtonome}-${produtosku} Criado`);
                            break;
                        case 400:
                            log.gravaLog(`Criacao de produto unidade : ${unidade} : Statuscode: 400 ${produtonome}-${produtosku} Campo obrigatorio nao preenchido ${JSON.stringify(response.body)}`)
                            resolve(`Criacao de produto unidade : ${unidade} : Statuscode: 400 ${produtonome}-${produtosku} Campo obrigatorio nao preenchido ${JSON.stringify(response.body)}`);
                            // console.log(`Statuscode: 400 ${produtonome}-${produtosku} Campo obrigatorio nao preenchido`);
                            break;
                        case 401:
                            log.gravaLog(`Criacao de produto unidade : ${unidade} : Statuscode: 401 ${produtonome}-${produtosku} Nao autorizado verifique a chave da api`)
                            resolve(`Criacao de produto unidade : ${unidade} : Statuscode: 401 ${produtonome}-${produtosku} Nao autorizado verifique a chave da api`);
                            // console.log('Statuscode: 401 \nNao autorizado verifique a chave da api');
                            break;
                        case 409:
                            log.gravaLog(`Criacao de produto unidade : ${unidade} : Statuscode: 409 ${produtonome}-${produtosku} Item duplicado o mesmo ja foi criado na base`)
                            resolve(`Criacao de produto unidade : ${unidade} : Statuscode: 409 ${produtonome}-${produtosku} Item duplicado o mesmo ja foi criado na base`);
                            //console.log(`Criacao de produto : Statuscode: 409 \n${produtonome}-${produtosku} Item duplicado o mesmo ja foi criado na base`);
                            break;
                        default:
                            log.gravaLog(`Criacao de produto unidade : ${unidade} : Erro desconhecido ${JSON.stringify(response.body)}`)
                            resolve(`Criacao de produto unidade : ${unidade} : Erro desconhecido ${JSON.stringify(response.body)}`);
                            // console.log("Erro desconhecido")
                            // console.log(response.body);
                            break;
                    }
                }
            }
            )
        })
    }


    async atualizaProduto(produtonome, produtosku, produtoembalagem, produtourlfoto, produtoean, produtomarca, multiplo) {
        return new Promise((resolve, reject) => {
            const unidade = this.unidade
            const options = {
                method: 'PUT',
                url: api.url + '/product/products/sku/' + produtosku,
                headers: {
                    accept: 'application/json',
                    'x-api-key': this.apikeyunidade,
                    'content-type': 'application/json'
                },
                body: {
                    "photosUrl": [
                        produtourlfoto
                    ],
                    ean: [produtoean],
                    name: produtonome,
                    brand: produtomarca,
                    unit: produtoembalagem,
                    clickMultiplier: multiplo
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    log.gravaLog(`atualizacao de produto unidade : ${unidade} : Retentativa ${produtonome}-${produtosku} ${error}`)
                    this.atualizaProduto(produtonome, produtosku, produtoembalagem, produtourlfoto, produtoean, produtomarca, multiplo).then(resolve(
                        `atualizacao de produto unidade : ${unidade} : Retentativa ${produtonome}-${produtosku} Concluida`
                    )).catch(reject())
                }
                else {
                    switch (response.statusCode) {
                        case 204:
                            log.gravaLog(`Atualizacao de produto unidade : ${unidade} : Statuscode: 204 ${produtonome}-${produtosku} Atualizado`)
                            // console.log(`Statuscode: 204 \n${produtonome}-${produtosku} Atualizado`);
                            resolve(`Atualizacao de produto unidade : ${unidade} : Statuscode: 204 ${produtonome}-${produtosku} Atualizado`);
                            break;
                        case 400:
                            log.gravaLog(`Atualizacao de produto unidade : ${unidade} : Statuscode: 400 ${produtonome}-${produtosku} Erro no corpo da request ${JSON.stringify(response.body)}`)
                            // console.log(`Statuscode: 400 \nErro no corpo da request`);
                            resolve(`Atualizacao de produto unidade : ${unidade} : Statuscode: 400 ${produtonome}-${produtosku} Erro no corpo da request ${JSON.stringify(response.body)}`);
                            break;
                        case 401:
                            log.gravaLog(`Atualizacao de produto unidade : ${unidade} : Statuscode: 401 ${produtonome}-${produtosku} Nao autorizado verifique a chave da api`);
                            //console.log(`Atualizacao de produto : Statuscode: 401 ${produtonome}-${produtosku} Nao autorizado verifique a chave da api`);
                            resolve(`Atualizacao de produto unidade : ${unidade} : Statuscode: 401 ${produtonome}-${produtosku} Nao autorizado verifique a chave da api`);
                            break;
                        case 409:
                            log.gravaLog(`Atualizacao de produto unidade : ${unidade} : Statuscode: 409 ${produtonome}-${produtosku} nenhuma informacao gravada pois o produto esta atualizado`)
                            //Atualizacao de produto : console.log(`Statuscode: 409 ${produtonome}-${produtosku} nenhuma informacao gravada pois o produto esta atualizado`);
                            resolve(`Atualizacao de produto unidade : ${unidade} : Statuscode: 409 ${produtonome}-${produtosku} nenhuma informacao gravada pois o produto esta atualizado`);
                            break;
                        default:
                            log.gravaLog(`Atualizacao de produto unidade : ${unidade} : Erro desconhecido ${JSON.stringify(response.body)}`)
                            // console.log("Erro desconhecido")
                            // console.log(response.body);
                            resolve(`Atualizacao de produto unidade : ${unidade} : Erro desconhecido ${JSON.stringify(response.body)}`);
                            break;
                    }
                }
            }
            )
        })
    }

    async criaCatalogo(
        produtosku,
        produtopreco,
        produtoestoque,
        lojaproduto,
        produtocategoria,
        produtosubcategoria,
        produtocontrolaestoque,
        produtoativo,
        produtoquantidademinima,
        produtolocalizacao
    ) {
        return new Promise((resolve, reject) => {
            const unidade = this.unidade
            const options = {
                method: 'POST',
                url: api.url + '/catalog/catalogs',
                headers: {
                    accept: 'application/json',
                    'x-api-key': this.apikeyunidade,
                    'content-type': 'application/json'
                },
                body: {
                    "product": { "sku": produtosku },
                    "store": { "storeReference": lojaproduto, },
                    "price": produtopreco,
                    "stock": produtoestoque,
                    "isActive": produtoativo,
                    "isAvailableWithoutStock": produtocontrolaestoque,
                    "categoriesAggregated": [{ "categoryReference": produtocategoria }, { "categoryReference": produtosubcategoria }],
                    "minQty": produtoquantidademinima,
                    "location": produtolocalizacao
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    log.gravaLog(`Criacao de catalogo : Retentativa ${produtosku} `)
                    this.criaCatalogo(
                        produtosku,
                        produtopreco,
                        produtoestoque,
                        lojaproduto,
                        produtocategoria,
                        produtosubcategoria,
                        produtocontrolaestoque).then(resolve()).catch(reject());
                }
                else {
                    switch (response.statusCode) {
                        case 200:
                            log.gravaLog(`Criacao catalogo unidade : ${unidade} : Statuscode: 200 item ${produtosku} Catalogo Criado`)
                            // console.log(`Statuscode: 200 \nCatalogo ${produtosku} Criado`);
                            resolve()
                            break;
                        case 400:
                            log.gravaLog(`Criacao catalogo unidade : ${unidade} : Statuscode: 400 item ${produtosku} Campo obrigatorio nao preenchido ${JSON.stringify(response.body)}`)
                            // console.log(`Statuscode: 400 \nCampo obrigatorio nao preenchido ${response.body}`);
                            resolve()
                            break;
                        case 401:
                            log.gravaLog(`Criacao catalogo unidade : ${unidade} : Statuscode: 401 item ${produtosku} Nao autorizado verifique a chave da api`)
                            //console.log('Statuscode: 401 \nNao autorizado verifique a chave da api');
                            resolve()
                            break;
                        case 409:
                            log.gravaLog(`Criacao catalogo unidade : ${unidade} : Statuscode: 409 item ${produtosku} Catalogo duplicado`);
                            //console.log(`Criacao catalogo : Statuscode: 409 ${produtosku} Catalogo duplicado `);
                            resolve()
                            break;
                        default:
                            resolve()
                            log.gravaLog(`Criacao catalogo unidade : ${unidade} : Erro desconhecido ${JSON.stringify(response.body)}`)
                            // console.log("Erro desconhecido")
                            // console.log(response.body);
                            // console.log(response.statusCode)
                            break;
                    }
                }

            }
            )
        })
    }


    async atualizaCatalogo(
        produtosku,
        produtopreco,
        produtoestoque,
        lojaproduto,
        produtocategoria,
        produtosubcategoria,
        produtocontrolaestoque,
        produtoativo,
        produtoquantidademinima,
        produtolocalizacao
    ) {
        return new Promise((resolve, reject) => {
            const unidade = this.unidade
            const options = {
                method: 'PUT',
                url: api.url + `/catalog/catalogs/sku/${produtosku}/storeReference/${lojaproduto}`,
                headers: {
                    accept: 'application/json',
                    'x-api-key': this.apikeyunidade,
                    'content-type': 'application/json'
                },
                body: {
                    "price": produtopreco,
                    "stock": produtoestoque,
                    "isActive": produtoativo,
                    "isAvailableWithoutStock": produtocontrolaestoque,
                    "categoriesAggregated": [{ "categoryReference": produtocategoria }, { "categoryReference": produtosubcategoria }],
                    "minQty": produtoquantidademinima,
                    "location": produtolocalizacao
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    log.gravaLog(`Atualiza catalogo unidade : ${unidade} item ${produtosku} Retentativa`)
                    this.atualizaCatalogo(
                        produtosku,
                        produtopreco,
                        produtoestoque,
                        lojaproduto,
                        produtocategoria,
                        produtosubcategoria,
                        produtocontrolaestoque,
                        produtoativo,
                        produtoquantidademinima,
                        produtolocalizacao).then(resolve()).catch(reject())
                }
                else {
                    switch (response.statusCode) {
                        case 200:
                            log.gravaLog(`Atualiza catalogo unidade : ${unidade} : Statuscode: 200 Catalogo item ${produtosku} Atualizado`)
                            // console.log(`Statuscode: 200 \nCatalogo ${produtosku} Atualizado`);
                            resolve()
                            break;
                        case 204:
                            log.gravaLog(`Atualiza catalogo unidade : ${unidade} : Statuscode: 204 Catalogo item ${produtosku} Atualizado`)
                            //console.log(`Statuscode: 204 \nCatalogo ${produtosku} Atualizado`);
                            resolve()
                            break;
                        case 400:
                            log.gravaLog(`Atualiza catalogo unidade : ${unidade} : Statuscode: 400 Catalogo item ${produtosku} nao existe ${JSON.stringify(response.body)}`)
                            //console.log(`Statuscode: 204 \nCatalogo ${produtosku} Atualizado`);
                            resolve()
                            break;
                        case 409:
                            log.gravaLog(`Atualiza catalogo unidade : ${unidade} : Statuscode: 409 Catalogo item ${produtosku} ja esta atualizado ${JSON.stringify(response.body)}`)
                            //console.log(`Statuscode: 204 \nCatalogo ${produtosku} Atualizado`);
                            resolve()
                            break;
                        default:
                            log.gravaLog(`Atualiza catalogo unidade : ${unidade} : Erro desconhecido ${JSON.stringify(response.body)} ${response.statusCode}`)
                            // console.log("Erro desconhecido")
                            // console.log(response.body);
                            resolve()
                            break;
                    }
                }
            }
            )
        })
    }
    atualizaNumeracaoPedido(id, numeropedido) {
        const unidade = this.unidade;
        console.log(id, 'atualiza numeracaoPedido')
        console.log(this.apikeyLogisticaunidade)
        console.log(id)
        return new Promise((resolve, reject) => {
            const options = {
                method: 'PUT',
                url: api.urlLogistica + `/jobs/${id}/external_data`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'x-api-key': this.apikeyLogisticaunidade,
                },
                body: {
                    external_data: {
                        webhook: { CODIGOPDV: numeropedido.toString() },
                        backoffice: { CODIGOPDV: numeropedido.toString() },
                        shopper_app: { CODIGOPDV: numeropedido.toString() }
                    }
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    log.gravaLog(`Enviado Numero do pedido para instaleap : ${id} Pedido ${numeropedido} `)
                }
                else {
                    switch (response.statusCode) {
                        case 200:
                            log.gravaLog(`Enviado Numero do pedido para instaleap : ${id} Pedido ${numeropedido} ${response.body}`)
                            console.log(response.body)
                            resolve()
                            break;
                        case 403:
                            log.gravaLog(`Erro ao Enviar Numero do pedido para instaleap : ${id} Pedido ${numeropedido} ${response.body}`)
                            console.log(response.body)
                            resolve()
                            break;
                        default:
                            console.log(response.statusCode);
                            console.log(options['url']);
                            console.log(response.body)
                            log.gravaLog(`Erro desconhecido ao tentar enviar numero do pedido para instaleap numero do pedido: ${numeropedido}`)
                            resolve()
                            break;
                    }
                }
            }
            )
        })
    }

    criaPromocaoProgressiva(sku, tipo, descricao, fatormultiplicativo1, fatormultiplicativo2, valormultiplicativo1, valormultiplicativo2) {
        const datas = data.formataDataPromo()
        const unidade = this.unidade;
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: api.url + `/promotion/promotions`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'x-api-key': this.apikeyunidade,
                },
                body: {
                    sku: sku,
                    storeReference: 'ATC-100',
                    promotions: [
                        {
                            isActive: true,
                            type: tipo,
                            description: descricao,
                            conditions: [{ qty: fatormultiplicativo1, price: valormultiplicativo1 }, { qty: fatormultiplicativo2, price: valormultiplicativo2 }],
                            startDateTime: datas[0],
                            endDateTime: datas[1]
                        }
                    ]
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    log.gravaLog(`Erro ao Cadastrar Promocao Instaleap: ${sku} `)
                }
                else {
                    switch (response.statusCode) {
                        case 201:
                            log.gravaLog(`Enviado promocao Instaleap : ${sku} ${JSON.stringify(response.body)}`)
                            resolve()
                            break;
                        case 403:
                            log.gravaLog(`Erro ao Enviar promocao instaleap ${sku}`)
                            resolve()
                            break;
                        case 409:
                            log.gravaLog(`promocao Duplicada instaleap ${sku} ${JSON.stringify(response.body)}`)
                            resolve()
                            break;
                        default:
                            console.log(response.statusCode);
                            console.log(options['url']);
                            console.log(response.body)
                            log.gravaLog(`Erro desconhecido ao tentar enviar promocao instaleap ${sku} ${JSON.stringify(response.body)}`)
                            resolve()
                            break;
                    }
                }
            }
            )
        })
    }

}
module.exports = InstaleapAPI;



