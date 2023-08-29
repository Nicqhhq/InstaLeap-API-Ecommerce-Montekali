class Querysprodutosvarejo {
    constructor(unidade) {
        this.unidade = unidade;
    }

    get get_produtos_criacao_inicial() {
        return this.produtos_criacao_inicial();
    }

    produtos_criacao_inicial() {
        var select = `select prod_codigo as sku,
            prod_descricao as descricao,
            concat('https://www.colaboradormontekali.com/imagens_ecommerce/',prod_codbarras,'.jpg') as url_foto,
            prod_emb as unidade,
            prod_codbarras as codbarras,
            prod_marca as marca
            from produtos
            inner join produn on prod_codigo = prun_prod_codigo
            where prun_ativo = 'S'
            and prun_unid_codigo in ('${this.unidade}')
            and prod_status = 'N'
            and prod_descricao not like ('%C.P%')
            and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
            group by 1,2,3,4,5,6`;
        console.log("unidade query :", this.unidade)
        return select;
    }

    get get_produtos_criacao_diario() {
        return this.produtos_criacao_diario();
    }


    produtos_criacao_diario() {
        var select = `select prod_codigo as sku,
        prod_descricao as descricao,
        concat('https://www.colaboradormontekali.com/imagens_ecommerce/',prod_codbarras,'.jpg') as url_foto,
        prod_emb as unidade,
        prod_codbarras as codbarras,
        prod_marca as marca
            from produtos
            inner join produn on prod_codigo = prun_prod_codigo
                where prun_ativo = 'S'
                and prun_unid_codigo in ('${this.unidade}')
                and prod_status = 'N'
                and prod_descricao not like ('%C.P%')
                and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
                and prod_datacad >=current_date -5
                    group by 1,2,3,4,5,6`
        return select;
    }

    get get_produtos_atualiza_diario() {
        return this.produtos_atualiza_diario();
    }

    produtos_atualiza_diario() {
        var select = `select prod_codigo as sku,
        prod_descricao as descricao,
        concat('https://www.colaboradormontekali.com/imagens_ecommerce/',prod_codbarras,'.jpg') as url_foto,
        prod_emb as unidade,
        prod_codbarras as codbarras,
        prod_marca as marca
            from produtos
            inner join produn on prod_codigo = prun_prod_codigo
                where prun_ativo = 'S'
                and prun_unid_codigo in ('${this.unidade}')
                and prod_status = 'N'
                and prod_descricao not like ('%C.P%')
                and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
                and prod_dataalt  >= current_date -5			
                    group by 1,2,3,4,5,6`
        return select;
    }

}

module.exports = Querysprodutosvarejo;
