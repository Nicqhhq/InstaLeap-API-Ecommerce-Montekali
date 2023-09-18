const path = require('path');
const db = require(path.join(__dirname, 'database.js'));
const LocalDatabase = require(path.join(__dirname, 'localdatabase', 'controllerdatabase', 'initdatabase.js'));
const Querysprodutosvarejo = require(path.join(__dirname, 'varejo', 'querysprodutosvarejo.js'));
const Queryscatalogosvarejos = require(path.join(__dirname, 'varejo', 'queryscatalogosvarejo.js'));
const Querysprodutosatacado = require(path.join(__dirname, 'atacado', 'querysprodutosatacado.js'));
const Queryscatalogosatacado = require(path.join(__dirname, 'atacado', 'queryscatalogosatacado.js'));
const Queryspromocoesatacado = require(path.join(__dirname, 'atacado', 'queryspromocoesatacado.js'));
const localdatabase = new LocalDatabase()
db.bdconexao();
class Migrations {
    constructor(unidade) {
        this.unidade = unidade;
    }
    get get_dadosCriaProdutoInicial() {
        return this.dadosCriaProdutoInicial
    }
    async getMargem() {
        return new Promise(async (resolve, reject) => {
            const margem = await localdatabase.getMargemLocalDB().then((_) => { resolve(_) }).catch((_) => { reject(_) })
        })
    }
    async getMargemAtiva() {
        return new Promise(async (resolve, reject) => {
            const margem = await localdatabase.getMargemAtivaLocalDB().then((_) => { resolve(_) }).catch((_) => { reject(_) })
        })
    }
    async setMargem(select) {
        return new Promise(async (resolve, reject) => {
            const margem = await localdatabase.setMargemLocalDB(select).then((_) => { resolve(_) }).catch((_) => { reject(_) })
        })
    }
    // TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE
    async dadosCriaPromocaoProgressiva(classe, data_inicio, data_fim, valida_status, multiplo_emb, percent_desconto) {
        console.log("unidade da migrations: ", this.unidade)
        var select;
        const queryunidade = new Queryspromocoesatacado(this.unidade);
        switch (classe) {
            case 'A':
                select = queryunidade.get_promocoes_progressiva_classe_A(data_inicio, data_fim, valida_status, multiplo_emb, percent_desconto);
                break;
            case 'B':
                select = queryunidade.get_promocoes_progressiva_classe_B(data_inicio, data_fim, valida_status, multiplo_emb, percent_desconto);
                break;
            case 'C':
                select = queryunidade.get_promocoes_progressiva_classe_C(data_inicio, data_fim, valida_status, multiplo_emb, percent_desconto);
                break
        }
        var dados = await db.pool.query(
            select
        )
        return [dados.rows, dados.rowCount];
    }


    async dadosCriaProdutoInicial() {
        console.log("unidade da migrations: ", this.unidade)
        const queryunidade = new Querysprodutosvarejo(this.unidade);
        const select = queryunidade.get_produtos_criacao_inicial;
        var dados = await db.pool.query(
            select
        )
        return [dados.rows, dados.rowCount];
    }
    get get_dadosCriaProdutoInicialAtacado() {
        return this.dadosCriaProdutoInicialAtacado
    }

    async dadosCriaProdutoInicialAtacado() {
        console.log("unidade da migrations: ", this.unidade)
        const queryunidade = new Querysprodutosatacado(this.unidade);
        const select = queryunidade.get_produtos_criacao_inicial;
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }
    get get_dadosCriaProdutoDiario() {
        return this.dadosCriaProdutoDiario
    }

    async dadosCriaProdutoDiario() {
        console.log("unidade da migrations: ", this.unidade)
        const queryunidade = new Querysprodutosvarejo(this.unidade);
        const select = queryunidade.get_produtos_criacao_diario;
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }
    get get_dadosCriaProdutoDiarioAtacado() {
        return this.dadosCriaProdutoDiarioAtacado
    }

    async dadosCriaProdutoDiarioAtacado() {
        console.log("unidade da migrations: ", this.unidade)
        const queryunidade = new Querysprodutosatacado(this.unidade);
        const select = queryunidade.get_produtos_criacao_diario;
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }
    get get_dadosAtualizaProduto() {
        return this.dadosAtualizaProduto
    }
    async dadosAtualizaProduto() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Querysprodutosvarejo(this.unidade);
        const select = queryunidade.get_produtos_atualiza_diario
        var dados = await db.pool.query(
            select
        )
        return [dados.rows, dados.rowCount]
    }
    get get_dadosAtualizaProdutoAtacado() {
        return this.dadosAtualizaProdutoAtacado
    }
    async dadosAtualizaProdutoAtacado() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Querysprodutosatacado(this.unidade);
        const select = queryunidade.get_produtos_atualiza_diario
        var dados = await db.pool.query(
            select
        )
        return dados.rows
    }
    get get_dadosCriaCatalogo_Diario() {
        return this.dadosCriaCatalogo_Diario
    }
    async dadosCriaCatalogo_Diario() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Queryscatalogosvarejos(this.unidade);
        const select = queryunidade.get_catalogos_criacao_diario;
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }

    get get_dadosCriaCatalogo_DiarioAtacado() {
        return this.dadosCriaCatalogo_DiarioAtacado
    }
    async dadosCriaCatalogo_DiarioAtacado() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Queryscatalogosatacado(this.unidade);
        const select = queryunidade.get_catalogos_criacao_diario;
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }

    get get_dadosCriaCatalogoInicial() {
        return this.dadosCriaCatalogoInicial
    }
    async dadosCriaCatalogoInicial() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Queryscatalogosvarejos(this.unidade);
        const select = queryunidade.get_catalogos_criacao_inicial
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }

    get get_dadosCriaCatalogoInicialAtacado() {
        return this.dadosCriaCatalogoInicialAtacado
    }
    async dadosCriaCatalogoInicialAtacado() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Queryscatalogosatacado(this.unidade);
        const select = queryunidade.get_catalogos_criacao_inicial();
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }
    get get_dadosAtualizaCatalogo() {
        return this.dadosAtualizaCatalogo
    }
    async dadosAtualizaCatalogo() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Queryscatalogosvarejos(this.unidade);
        const select = queryunidade.get_catalogos_atualizacao_preco_catalogo_diario
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }
    get dadosAtualizaCatalogoEstoquePreco() {
        return this.dadosAtualizaCatalogoEstoquePreco
    }
    async dadosAtualizaCatalogoEstoquePreco() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Queryscatalogosvarejos(this.unidade);
        const select = queryunidade.get_catalogos_atualizacao_estoque_diario
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }

    get get_dadosAtualizaCatalogoPrecoEstoqueAtacado() {
        return this.dadosAtualizaCatalogoPrecoEstoqueAtacado
    }
    async dadosAtualizaCatalogoPrecoEstoqueAtacado() {
        console.log("unidade da migrations: ", this.unidade);
        const queryunidade = new Queryscatalogosatacado(this.unidade);
        const select = queryunidade.get_catalogos_atualizacao_preco_estoque_catalogo_diario
        var dados = await db.pool.query(
            select
        )
        return dados.rows;
    }



}
module.exports = Migrations;