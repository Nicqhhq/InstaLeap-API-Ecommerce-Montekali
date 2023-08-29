const instaleapAPI = require('./HTTPControlers');
const migrations = require('./migratios');
const time = require('./time');
const tempo = new time;
class Sender {
    constructor(unidade) {
        this.unidade = unidade
    }
    async criaProdutoInicial() {
        var delay = 0
        const dados = new migrations(this.unidade)
        const instaleap = new instaleapAPI(this.unidade)
        const rows = await dados.get_dadosCriaProdutoInicial();
        const promises = [];
        for (const produto in rows[0]) {
            if (rows[0].hasOwnProperty.call(rows[0], produto)) {
                const itens = rows[0][produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.criarProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca']
                        )
                        resolve();
                    }, delay);
                })
                promises.push(promise);
                delay += 50
            }
        }
        await Promise.all(promises);
    }
    async criaProdutoInicialAtacado() {
        var delay = 0
        const dados = new migrations(this.unidade)
        const instaleap = new instaleapAPI(this.unidade)
        const rows = await dados.get_dadosCriaProdutoInicialAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.criarProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca'],
                            itens['multiplo']
                        )
                        resolve();
                    }, delay);
                })
                promises.push(promise);
                delay += 50
            }
        }
        await Promise.all(promises);
    }

    async criaProduto() {
        var delay = 0
        const dados = new migrations(this.unidade)
        const instaleap = new instaleapAPI(this.unidade)
        const rows = await dados.get_dadosCriaProdutoDiario();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.criarProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca']
                        );
                        resolve(); // Resolva a promessa após a criação do produto
                    }, delay);
                });
                promises.push(promise);
                delay += 50
            }
        }
        await Promise.all(promises);
    }
    async criaProdutoAtacado() {
        var delay = 0
        const dados = new migrations(this.unidade)
        const instaleap = new instaleapAPI(this.unidade)
        const rows = await dados.get_dadosCriaProdutoDiarioAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.criarProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca'],
                            itens['multiplo']
                        );
                        resolve(); // Resolva a promessa após a criação do produto
                    }, delay);
                });
                promises.push(promise);
                delay += 50
            }
        }
        await Promise.all(promises);
    }
    async atualizaProduto() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.get_dadosAtualizaProduto();
        const promises = [];
        const quantidade = rows[1];
        var feitos = 0;
        for (const produto in rows[0]) {
            if (rows[0].hasOwnProperty.call(rows[0], produto)) {
                const itens = rows[0][produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.atualizaProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca']
                        )
                        feitos++;
                        console.log(`${feitos}/${quantidade} Itens`);
                        resolve();
                    }, delay);
                })
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises)
    }
    async atualizaProdutoAtacado() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.get_dadosAtualizaProdutoAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.atualizaProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca'],
                            itens['multiplo']
                        )
                        resolve()
                    }, delay);
                })
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises)
    }
    async criaCatalogoInicial() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.get_dadosCriaCatalogoInicial();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.criaCatalogo(
                            itens['sku'],
                            itens['preco_regular'],
                            parseInt(itens['estoque']),
                            itens['cod_store'],
                            itens['categoria'],
                            itens['subcat'],
                            itens['naocontrolaestoque'],
                        )
                        resolve()
                    }, delay);
                })
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises)
    }
    async criaCatalogoInicialAtacado() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.get_dadosCriaCatalogoInicialAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.criaCatalogo(
                            itens['sku'],
                            10,
                            parseInt(itens['estoque']),
                            itens['cod_store'],
                            itens['categoria'],
                            itens['subcat'],
                            itens['naocontrolaestoque'],
                            itens['status'],
                            itens['qtd_min'],
                            itens['setor']
                        )
                        resolve()
                    }, delay);
                })
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises)
    }
    async criaCatalogo() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.get_dadosCriaCatalogo_Diario()
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.criaCatalogo(
                            itens['sku'],
                            itens['preco_regular'],
                            parseInt(itens['estoque']),
                            itens['cod_store'],
                            itens['categoria'],
                            itens['subcat'],
                            itens['naocontrolaestoque']
                        )
                        resolve();
                    }, delay);
                })
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises)
    }
    async criaCatalogoAtacado() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.get_dadosCriaCatalogo_DiarioAtacado()
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.criaCatalogo(
                            itens['sku'],
                            itens['preco_regular'],
                            parseInt(itens['estoque']),
                            itens['cod_store'],
                            itens['categoria'],
                            itens['subcat'],
                            itens['naocontrolaestoque'],
                            itens['status'],
                            itens['qtd_min'],
                            itens['setor']
                        )
                        resolve();
                    }, delay);
                })
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises)
    }
    async atualizaCatalogo() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.dadosAtualizaCatalogo();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.atualizaCatalogo(
                            itens['sku'],
                            itens['preco_regular'],
                            parseInt(itens['estoque']),
                            itens['cod_store'],
                            itens['categoria'],
                            itens['subcat'],
                            itens['naocontrolaestoque'],
                            itens['status']
                        )
                        resolve();
                    }, delay);

                }
                )
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises);
    }
    async atualizaCatalogoEstoquePreco() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.dadosAtualizaCatalogoEstoquePreco();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.atualizaCatalogo(
                            itens['sku'],
                            itens['preco_regular'],
                            parseInt(itens['estoque_online']),
                            itens['cod_store'],
                            itens['categoria'],
                            itens['subcat'],
                            itens['naocontrolaestoque'],
                            itens['status']
                        )
                        resolve()
                    }, delay);
                })
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises)
    }

    async atualizaCatalogoPrecoEstoqueAtacado() {
        var delay = 0;
        const dados = new migrations(this.unidade);
        const instaleap = new instaleapAPI(this.unidade);
        const rows = await dados.get_dadosAtualizaCatalogoPrecoEstoqueAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await instaleap.atualizaCatalogo(
                            itens['sku'],
                            itens['preco_regular'],
                            parseInt(itens['estoque']),
                            itens['cod_store'],
                            itens['categoria'],
                            itens['subcat'],
                            itens['naocontrolaestoque'],
                            itens['status'],
                            itens['qtd_min'],
                            itens['setor']
                        )
                        resolve();
                    }, delay);

                }
                )
                promises.push(promise);
                delay += 50;
            }
        }
        await Promise.all(promises);
    }
}

module.exports = Sender;