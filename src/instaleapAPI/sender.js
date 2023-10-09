const path = require('path');
const { Database } = require('sqlite3');
const Migrations = require('../../database/migrations');
const instaleapAPI = require(path.join(__dirname, 'HTTPControlers.js'));
const migrations = require(path.join(__dirname, '..', '..', 'database', 'migrations.js'))
const LocalDatabase = require(path.join(__dirname, '..', '..', 'database', 'localdatabase', 'controllerdatabase', 'initdatabase.js'))
const db = new LocalDatabase
class Sender {
    constructor(unidade) {
        this.unidade = unidade
        this.dados = new Migrations(this.unidade);
        this.instaleap = new instaleapAPI(this.unidade)
    }
    async criaProdutoInicial() {
        var delay = 0
        const dados = new migrations(this.unidade)
        // const instaleap = new instaleapAPI(this.unidade)
        const rows = await this.dados.get_dadosCriaProdutoInicial();
        const promises = [];
        for (const produto in rows[0]) {
            if (rows[0].hasOwnProperty.call(rows[0], produto)) {
                const itens = rows[0][produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.criarProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca'],
                            itens['clickmultiplier']
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
        // const dados = new migrations(this.unidade)
        // const instaleap = new instaleapAPI(this.unidade)
        const rows = await this.dados.get_dadosCriaProdutoInicialAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.criarProduto(
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
        // const dados = new migrations(this.unidade)
        // const instaleap = new instaleapAPI(this.unidade)
        const rows = await this.dados.get_dadosCriaProdutoDiario();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.criarProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca'],
                            itens['clickmultiplier']
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
        // const dados = new migrations(this.unidade)
        // const instaleap = new instaleapAPI(this.unidade)
        const rows = await this.dados.get_dadosCriaProdutoDiarioAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.criarProduto(
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.get_dadosAtualizaProduto();
        const promises = [];
        const quantidade = rows[1];
        var feitos = 0;
        for (const produto in rows[0]) {
            if (rows[0].hasOwnProperty.call(rows[0], produto)) {
                const itens = rows[0][produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.atualizaProduto(
                            itens['descricao'],
                            itens['sku'],
                            itens['unidade'],
                            itens['url_foto'],
                            itens['codbarras'],
                            itens['marca'],
                            itens['clickmultiplier']
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.get_dadosAtualizaProdutoAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.atualizaProduto(
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.get_dadosCriaCatalogoInicial();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.criaCatalogo(
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.get_dadosCriaCatalogoInicialAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.criaCatalogo(
                            itens['sku'],
                            itens['precommerce'],
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.get_dadosCriaCatalogo_Diario()
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.criaCatalogo(
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.get_dadosCriaCatalogo_DiarioAtacado()
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.criaCatalogo(
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.dadosAtualizaCatalogo();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.atualizaCatalogo(
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.dadosAtualizaCatalogoEstoquePreco();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.atualizaCatalogo(
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
        // const dados = new migrations(this.unidade);
        // const instaleap = new instaleapAPI(this.unidade);
        const rows = await this.dados.dadosAtualizaCatalogoPrecoEstoqueAtacado();
        const promises = [];
        for (const produto in rows) {
            if (rows.hasOwnProperty.call(rows, produto)) {
                const itens = rows[produto];
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.instaleap.atualizaCatalogo(
                            itens['sku'],
                            itens['precommerce'],
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
    async CriaPromocaoProgressivaAtacado() {
        var delay = 0;
        const margens = await db.getMargemAtivaLocalDB();
        const resultado = {};
        const promises = [];
        margens.forEach(item => {
            const nome = item.margem_nome;
            const multiplo = item.margem_multiplo;
            const porcentagem = item.margem_porcentagem;
            const sazonal = item.margem_sazonal;
            const margemativa = item.margem_ativa;
            const datainicio = item.margem_sazonal_data_inicio;
            const datafim = item.margem_sazonal_data_fim;
            if (!resultado[nome]) {
                resultado[nome] = [];
            }
            resultado[nome].push({
                'multiplo': multiplo.toString(),
                'porcentagem': porcentagem,
                'sazonal': sazonal,
                'margemativa': margemativa,
                'datainicio': datainicio,
                'datafim': datafim,
            });
        });
        for (var classe of Object.keys(resultado)) {
            var itens = await this.dados.dadosCriaPromocaoProgressiva(classe, resultado[classe][0]['datainicio'], resultado[classe][0]['datafim'], true, resultado[classe][0]['multiplo'], resultado[classe][1]['multiplo'], resultado[classe][0]['porcentagem'], resultado[classe][1]['porcentagem']).then((_) => itens = _[0])
            itens.forEach(item => {
                const promisse = new Promise((resolve, reject) => {
                    setTimeout(async () => {
                        await this.instaleap.criaPromocaoProgressiva(item['sku'], item['type_promo'], item['description'], item['qtd2'], item['qtd3'], item['preco2'], item['preco3'])
                        resolve();
                    }, delay);
                })
                delay += 50
                promises.push(promisse);
            })
        }
    }
}

module.exports = Sender;