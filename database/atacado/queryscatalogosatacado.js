class Queryscatalogoatacado {
    constructor(unidade) {
        this.unidade = unidade;
    }
    get get_catalogos_criacao_inicial() {
        console.log("teste" + this.unidade)
        return this.catalogos_criacao_inicial
    }
    //Voltar ao normal
    catalogos_criacao_inicial() {
        var select = `
        with consulta as (
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005','100') then concat('ATC-',prun_unid_codigo)
            else concat('KAL-',prun_unid_codigo) end as cod_store,
            case when prod_dpto_codigo in ('015','016') then 'PADARIA'
            when prod_dpto_codigo  = '017' then ('BEBIDAS-NAO-ALCOOLICAS')
            when prod_dpto_codigo  = '018' then ('BEBIDAS-ALCOOLICAS')
            when prod_dpto_codigo  = '019' then ('DESCARTAVEIS')
            when prod_dpto_codigo  = '020' then ('PEIXARIA')
            when prod_dpto_codigo  = '021' then ('ACOUGUE')
            when prod_dpto_codigo  = '022' then ('FLV')
            when prod_dpto_codigo  = '023' then ('COMMODITIES')
            when prod_dpto_codigo  = '025' then ('FRIOS')
            when prod_dpto_codigo  = '026' then ('LATICINIOS')
            when prod_dpto_codigo  = '114' then ('MERCEARIA')
            when prod_dpto_codigo  = '115' then ('BAZAR')
            when prod_dpto_codigo  = '116' then ('HIGIENE-PERFUMARIA')
            when prod_dpto_codigo  = '117' then ('PET-SHOP')
            when prod_dpto_codigo  = '118' then ('LIMPEZA')
            when prod_dpto_codigo  = '119' then ('TABACARIA')
            when prod_dpto_codigo  = '120' then ('FLORICULTURA-JARDINAGEM')
            when prod_dpto_codigo  = '121' then ('SAZONAL')
            when prod_dpto_codigo  in ('126','127') then ('MATERIA-PRIMA')
            when prod_dpto_codigo  = '128' then ('EMBALAGEM')
            when prod_dpto_codigo  = '123' then ('ROTISSERIA') end as categoria,
            case when prun_extra3 in ('A1','A2','A3') then coalesce(prun_prvenda3,0)
            when prun_extra3 in ('B1','B2','B3') then coalesce(prun_prvenda4,0)
            else coalesce(prun_prvenda5,0) end as precommerce,
            case when prun_estoque1 < 0 then 0
            else prun_estoque1 end as estoque,
            case when prun_ativo = 'S' then true 
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque,
            prod_fatoremb as qtd_min,
            prun_setor as setor
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo 
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo 
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_balanca = 'N'
                    and prod_dpto_codigo not in ('122','016','020','021','022','025','123','124','125','129')
                        )
                        select sku, cod_store, categoria, precommerce, estoque, status, concat(categoria,'-',cod_subcat) as subcat, naocontrolaestoque, qtd_min, setor
                            from consulta
                                order by 1
        `
        return select;
    }
    get get_catalogos_criacao_diario() {
        return this.catalogos_criacao_diario()
    }

    catalogos_criacao_diario() {
        var select = `with consulta as (
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005','100') then concat('ATC-',prun_unid_codigo)
            else concat('KAL-',prun_unid_codigo) end as cod_store,
            case when prod_dpto_codigo in ('015','016') then 'PADARIA'
            when prod_dpto_codigo  = '017' then ('BEBIDAS-NAO-ALCOOLICAS')
            when prod_dpto_codigo  = '018' then ('BEBIDAS-ALCOOLICAS')
            when prod_dpto_codigo  = '019' then ('DESCARTAVEIS')
            when prod_dpto_codigo  = '020' then ('PEIXARIA')
            when prod_dpto_codigo  = '021' then ('ACOUGUE')
            when prod_dpto_codigo  = '022' then ('FLV')
            when prod_dpto_codigo  = '023' then ('COMMODITIES')
            when prod_dpto_codigo  = '025' then ('FRIOS')
            when prod_dpto_codigo  = '026' then ('LATICINIOS')
            when prod_dpto_codigo  = '114' then ('MERCEARIA')
            when prod_dpto_codigo  = '115' then ('BAZAR')
            when prod_dpto_codigo  = '116' then ('HIGIENE-PERFUMARIA')
            when prod_dpto_codigo  = '117' then ('PET-SHOP')
            when prod_dpto_codigo  = '118' then ('LIMPEZA')
            when prod_dpto_codigo  = '119' then ('TABACARIA')
            when prod_dpto_codigo  = '120' then ('FLORICULTURA-JARDINAGEM')
            when prod_dpto_codigo  = '121' then ('SAZONAL')
            when prod_dpto_codigo  in ('126','127') then ('MATERIA-PRIMA')
            when prod_dpto_codigo  = '128' then ('EMBALAGEM')
            when prod_dpto_codigo  = '123' then ('ROTISSERIA') end as categoria,
            case when prun_extra3 in ('A1','A2','A3') then coalesce(prun_prvenda3,0)
            when prun_extra3 in ('B1','B2','B3') then coalesce(prun_prvenda4,0)
            else coalesce(prun_prvenda5,0) end as precommerce,
            case when prun_estoque1 < 0 then 0
            else prun_estoque1 end as estoque,
            case when prun_ativo = 'S' then true 
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque,
            prod_fatoremb as qtd_min,
            prun_setor as setor
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo 
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo 
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_balanca = 'N'
                    and prod_dpto_codigo not in ('122','016','020','021','022','025','123','124','125','129')
                    and prod_datacad >= current_date -7
                        )
                        select sku, cod_store, categoria, precommerce, estoque, status, concat(categoria,'-',cod_subcat) as subcat, naocontrolaestoque,qtd_min, setor
                            from consulta
                                order by 1`
        return select;
    }
    get get_catalogos_atualizacao_preco_estoque_catalogo_diario() {
        return this.catalogos_atualizacao_preco_estoque_catalogo_diario();
    }
    catalogos_atualizacao_preco_estoque_catalogo_diario() {
        var select = `
        with consulta as (
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005','100') then concat('ATC-',prun_unid_codigo)
            else concat('KAL-',prun_unid_codigo) end as cod_store,
            case when prod_dpto_codigo in ('015','016') then 'PADARIA'
            when prod_dpto_codigo  = '017' then ('BEBIDAS-NAO-ALCOOLICAS')
            when prod_dpto_codigo  = '018' then ('BEBIDAS-ALCOOLICAS')
            when prod_dpto_codigo  = '019' then ('DESCARTAVEIS')
            when prod_dpto_codigo  = '020' then ('PEIXARIA')
            when prod_dpto_codigo  = '021' then ('ACOUGUE')
            when prod_dpto_codigo  = '022' then ('FLV')
            when prod_dpto_codigo  = '023' then ('COMMODITIES')
            when prod_dpto_codigo  = '025' then ('FRIOS')
            when prod_dpto_codigo  = '026' then ('LATICINIOS')
            when prod_dpto_codigo  = '114' then ('MERCEARIA')
            when prod_dpto_codigo  = '115' then ('BAZAR')
            when prod_dpto_codigo  = '116' then ('HIGIENE-PERFUMARIA')
            when prod_dpto_codigo  = '117' then ('PET-SHOP')
            when prod_dpto_codigo  = '118' then ('LIMPEZA')
            when prod_dpto_codigo  = '119' then ('TABACARIA')
            when prod_dpto_codigo  = '120' then ('FLORICULTURA-JARDINAGEM')
            when prod_dpto_codigo  = '121' then ('SAZONAL')
            when prod_dpto_codigo  in ('126','127') then ('MATERIA-PRIMA')
            when prod_dpto_codigo  = '128' then ('EMBALAGEM')
            when prod_dpto_codigo  = '123' then ('ROTISSERIA') end as categoria,
            case when prun_extra3 in ('A1','A2','A3') then coalesce(prun_prvenda3,0)
            when prun_extra3 in ('B1','B2','B3') then coalesce(prun_prvenda4,0)
            else coalesce(prun_prvenda5,0) end as precommerce,
            case when coalesce(prun_estoque1,0) - coalesce(qtd_pendente,0) < 0 then 0
            else coalesce(prun_estoque1,0) - coalesce(qtd_pendente,0)  end as estoque,
            case when prun_ativo = 'S' then true
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque,
            prod_fatoremb as qtd_min,
            prun_setor as setor
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo
                left join (select pest_prod_codigo, sum(pest_qtde) as qtd_pendente
                    from pendest
                    where pest_datamvto = current_date
                    and pest_cpes_codigo = '901'
                    and pest_status = 'P'
                    group by 1) as G on pest_prod_codigo = prod_codigo
                        where prun_ativo = 'S'
                        and prun_unid_codigo in ('${this.unidade}')
                        and prod_status = 'N'
                        and prod_descricao not like ('%C.P%')
                        and prod_balanca = 'N'
                        and prod_dpto_codigo not in ('122','016','020','021','022','025','123','124','125','129')
            union all
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005','100') then concat('MON-',prun_unid_codigo)
            else concat('KAL-',prun_unid_codigo) end as cod_store,
            case when prod_dpto_codigo in ('015','016') then 'PADARIA'
            when prod_dpto_codigo  = '017' then ('BEBIDAS-NAO-ALCOOLICAS')
            when prod_dpto_codigo  = '018' then ('BEBIDAS-ALCOOLICAS')
            when prod_dpto_codigo  = '019' then ('DESCARTAVEIS')
            when prod_dpto_codigo  = '020' then ('PEIXARIA')
            when prod_dpto_codigo  = '021' then ('ACOUGUE')
            when prod_dpto_codigo  = '022' then ('FLV')
            when prod_dpto_codigo  = '023' then ('COMMODITIES')
            when prod_dpto_codigo  = '025' then ('FRIOS')
            when prod_dpto_codigo  = '026' then ('LATICINIOS')
            when prod_dpto_codigo  = '114' then ('MERCEARIA')
            when prod_dpto_codigo  = '115' then ('BAZAR')
            when prod_dpto_codigo  = '116' then ('HIGIENE-PERFUMARIA')
            when prod_dpto_codigo  = '117' then ('PET-SHOP')
            when prod_dpto_codigo  = '118' then ('LIMPEZA')
            when prod_dpto_codigo  = '119' then ('TABACARIA')
            when prod_dpto_codigo  = '120' then ('FLORICULTURA-JARDINAGEM')
            when prod_dpto_codigo  = '121' then ('SAZONAL')
            when prod_dpto_codigo  in ('126','127') then ('MATERIA-PRIMA')
            when prod_dpto_codigo  = '128' then ('EMBALAGEM')
            when prod_dpto_codigo  = '123' then ('ROTISSERIA') end as categoria,
            case when prun_extra3 in ('A1','A2','A3') then coalesce(prun_prvenda3,0)
            when prun_extra3 in ('B1','B2','B3') then coalesce(prun_prvenda4,0)
            else coalesce(prun_prvenda5,0) end as precommerce,
            case when coalesce(prun_estoque1,0) - coalesce(qtd_pendente,0) < 0 then 0
            else coalesce(prun_estoque1,0) - coalesce(qtd_pendente,0)  end as estoque,
            case when prun_ativo = 'S' then true
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque,
            prod_fatoremb as qtd_min,
            prun_setor as setor
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo
                left join (select pest_prod_codigo, sum(pest_qtde) as qtd_pendente
                    from pendest
                    where pest_datamvto = current_date
                    and pest_cpes_codigo = '901'
                    and pest_status = 'P'
                    group by 1) as G on pest_prod_codigo = prod_codigo
                        where prun_ativo = 'N'
                        and prun_dataalt >= current_date -5
                        and prun_unid_codigo in ('${this.unidade}')
                        and prod_status = 'N'
                        and prod_descricao not like ('%C.P%')
                        and prod_balanca = 'N'
                        and prod_dpto_codigo not in ('122','016','020','021','022','025','123','124','125','129')
                            )
                            select sku, cod_store, categoria, precommerce, estoque, status, concat(categoria,'-',cod_subcat) as subcat, naocontrolaestoque, qtd_min, setor
                                from consulta
                                    order by 1

        `
        return select;
    }
}
module.exports = Queryscatalogoatacado;