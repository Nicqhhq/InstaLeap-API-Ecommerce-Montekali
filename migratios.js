const db = require('./database');
const Querysprodutosvarejo = require('./database/varejo/querysprodutosvarejo');
const Queryscatalogosvarejos = require('./database/varejo/queryscatalogosvarejo');
const Querysprodutosatacado = require('./database/atacado/querysprodutosatacado');
const Queryscatalogosatacado = require('./database/atacado/queryscatalogosatacado');
db.bdconexao();
class Migrations {
    constructor(unidade) {
        this.unidade = unidade;
    }
    get get_dadosCriaProdutoInicial() {
        return this.dadosCriaProdutoInicial
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