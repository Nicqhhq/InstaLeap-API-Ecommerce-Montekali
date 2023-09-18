class QuerysPromocoesAtacado {
    constructor(unidade) {
        this.unidade = unidade;
    }
    get get_promocoes_progressiva_classe_A() {
        return this.cria_promocao_classe_A();
    }

    cria_promocao_classe_A(data_inicio, data_fim, valida_status, multiplo_emb, percent_desconto) {
        var select = `
        select prod_codigo as sku,
        'stepped' as type_promo,
        'Compre mais, pague menos' as Description,
        ${data_inicio} as data_inicio,
        ${data_fim} as data_fim,
        ${valida_status} as status,
        ${multiplo_emb} * prod_fatoremb as qtd,
        coalesce(prun_prvenda3,0) - (coalesce(prun_prvenda3,0) * ${percent_desconto}/100) as preco
	        from produtos
                inner join produn on prun_prod_codigo = prod_codigo and prun_unid_codigo = '100'
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('100')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_balanca = 'N'
                    and prod_dpto_codigo not in ('122','016','020','021','022','025','123','124','125','129')
                    and prod_extra2 in ('A1','A2','A3')`;
        return select;
    }
    get get_promocoes_progressiva_classe_B() {
        return this.cria_promocao_classe_B();
    }

    cria_promocao_classe_B(data_inicio, data_fim, valida_status, multiplo_emb, percent_desconto) {
        var select = `
        select prod_codigo as sku,
        'stepped' as type_promo,
        'Compre mais, pague menos' as Description,
        ${data_inicio} as data_inicio,
        ${data_fim} as data_fim,
        ${valida_status} as status,
        ${multiplo_emb} * prod_fatoremb as qtd,
        coalesce(prun_prvenda4,0) - (coalesce(prun_prvenda4,0) * ${percent_desconto}/100) as preco
            from produtos
            inner join produn on prun_prod_codigo = prod_codigo and prun_unid_codigo = '100'
                where prun_ativo = 'S'
                and prun_unid_codigo in ('100')
                and prod_status = 'N'
                and prod_descricao not like ('%C.P%')
                and prod_balanca = 'N'
                and prod_dpto_codigo not in ('122','016','020','021','022','025','123','124','125','129')
                and prod_extra2 in ('B1','B2','B3')`;
        return select;
    }

    get get_promocoes_progressiva_classe_C() {
        return this.cria_promocao_classe_C();
    }

    cria_promocao_classe_C(data_inicio, data_fim, valida_status, multiplo_emb, percent_desconto) {
        var select = `
        select prod_codigo as sku,
        'stepped' as type_promo,
        'Compre mais, pague menos' as Description,
        ${data_inicio} as data_inicio,
        ${data_fim} as data_fim,
        ${valida_status} as status,
        ${multiplo_emb} * prod_fatoremb as qtd,
        coalesce(prun_prvenda5,0) - (coalesce(prun_prvenda5,0) * ${percent_desconto}/100) as preco
            from produtos
            inner join produn on prun_prod_codigo = prod_codigo and prun_unid_codigo = '100'
                where prun_ativo = 'S'
                and prun_unid_codigo in ('100')
                and prod_status = 'N'
                and prod_descricao not like ('%C.P%')
                and prod_balanca = 'N'
                and prod_dpto_codigo not in ('122','016','020','021','022','025','123','124','125','129')
                and prod_extra2 not in ('A1','A2','A3','B1','B2','B3')	`;
        return select;
    }


}

module.exports = QuerysPromocoesAtacado;