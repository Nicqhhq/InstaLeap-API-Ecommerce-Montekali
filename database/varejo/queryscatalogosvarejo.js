class Queryscatalogosvarejo {
    constructor(unidade) {
        this.unidade = unidade;
    }
    get get_catalogos_criacao_inicial() {
        return this.catalogos_criacao_inicial();
    }

    catalogos_criacao_inicial() {
        var select = `with consulta as (
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005') then concat('MON-',prun_unid_codigo)
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
            prun_prpdv as preco_regular,
            case when prun_estoque1 < 0 then 0
            else prun_estoque1 end as estoque,
            case when prun_ativo = 'S' then true
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_descricao not like ('%Cx C/%')
                    and prod_balanca = 'N'
                    and prun_estoque1 > 0
                    and prun_prpdv > 0
                    and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
            union all
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005') then concat('MON-',prun_unid_codigo)
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
            prun_prpdv as preco_regular,
            case when prun_estoque1 < 0 then 0
            else prun_estoque1 end as estoque,
            case when prun_ativo = 'S' then true
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            true as naocontrolaestoque
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_descricao not like ('%Cx C/%')
                    and prod_balanca <> 'N'
                    and prun_prpdv > 0
                    and prod_dpto_codigo not in ('122','124','125','126','127','128','129'))
                        select sku, cod_store, categoria, preco_regular, estoque, status, concat(categoria,'-',cod_subcat) as subcat, naocontrolaestoque
                            from consulta
                                order by 1
            `;

        return select;
    }
    get get_catalogos_criacao_diario() {
        return this.catalogos_criacao_diario();
    }

    catalogos_criacao_diario() {
        var select = `with consulta as (
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005') then concat('MON-',prun_unid_codigo)
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
            prun_prpdv as preco_regular,
            case when prun_estoque1 < 0 then 0
            else prun_estoque1 end as estoque,
            case when prun_ativo = 'S' then true
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_descricao not like ('%Cx C/%')
                    and prod_balanca = 'N'
                    and prun_prpdv > 0
                    and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
                    and prod_datacad >= current_date -5
            union all
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005') then concat('MON-',prun_unid_codigo)
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
            prun_prpdv as preco_regular,
            case when prun_estoque1 < 0 then 0
            else prun_estoque1 end as estoque,
            case when prun_ativo = 'S' then true
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            true as naocontrolaestoque
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_descricao not like ('%Cx C/%')
                    and prod_balanca <> 'N'
                    and prun_prpdv > 0
                    and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
                    and prod_datacad >= current_date -5)
                        select sku, cod_store, categoria, preco_regular, estoque, status, concat(categoria,'-',cod_subcat) as subcat, naocontrolaestoque
                            from consulta
                                order by 1
            `
        return select;
    }
    get get_catalogos_atualizacao_preco_catalogo_diario() {
        return this.catalogos_atualizacao_preco_catalogo_diario();
    }

    catalogos_atualizacao_preco_catalogo_diario() {
        var select = `with consulta as (
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005') then concat('MON-',prun_unid_codigo)
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
            prun_prpdv as preco_regular,
            case when prun_estoque1 - qtd_vd_online < 0 then 0
            else prun_estoque1 - qtd_vd_online end as estoque_online,
            case when prun_ativo = 'S' then true 
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo 
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo 
                inner join (select vopr_unid_codigo, vopr_prod_codigo , sum(vopr_qtde) as qtd_vd_online 
                                            from vdonlineprod
                                                where vopr_datamvto = current_date
                                                and vopr_status = 'N'
                                                    group by 1,2) as vd_online on vopr_unid_codigo = prun_unid_codigo and vopr_prod_codigo = prun_prod_codigo
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_descricao not like ('%Cx C/%')
                    and prod_balanca = 'N'
                    and prun_prpdv > 0
                    and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
            union all 
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005') then concat('MON-',prun_unid_codigo)
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
            prun_prpdv as preco_regular,
            case when prun_estoque1 < 0 then 0
            else prun_estoque1 end as estoque,
            case when prun_ativo = 'S' then true 
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo 
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo 
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_descricao not like ('%Cx C/%')
                    and prod_balanca = 'N'
                    and prun_prpdv > 0
                    and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
                            and prod_codigo not in (select distinct vopr_prod_codigo 
                                            from vdonlineprod
                                                where vopr_datamvto = current_date
                                                and vopr_status = 'N'
                                                and vopr_unid_codigo in ('002')
                                                    )
                    and prun_dtprvenda	>= current_date -2
            union all		
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005') then concat('MON-',prun_unid_codigo)
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
            prun_prpdv as preco_regular,
            case when prun_estoque1 < 0 then 0
            else prun_estoque1 end as estoque,
            case when prun_ativo = 'S' then true 
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            true as naocontrolaestoque
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo 
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo 
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_descricao not like ('%Cx C/%')
                    and prod_balanca <> 'N'
                    and prun_prpdv > 0
                    and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
                    and prod_codigo not in (select distinct vopr_prod_codigo 
                                            from vdonlineprod
                                                where vopr_datamvto = current_date
                                                and vopr_status = 'N'
                                                and vopr_unid_codigo in ('002')
                                                    )
                    and prun_dtprvenda	>= current_date -2									
                            )select sku, cod_store, categoria, preco_regular, estoque_online, status, concat(categoria,'-',cod_subcat) as subcat, naocontrolaestoque
                            from consulta
                                    group by 1,2,3,4,5,6,7,8
                                        order by 1`
        return select;
    };

    get get_catalogos_atualizacao_estoque_diario() {
        return this.catalogos_atualizacao_estoque_diario();
    }

    catalogos_atualizacao_estoque_diario() {
        var select = `with consulta as (
            select prun_prod_codigo as sku,
            prod_descricao,
            prod_codbarras,
            case when prun_unid_codigo in ('001','002','004','005') then concat('MON-',prun_unid_codigo)
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
            prun_prpdv as preco_regular,
            case when prun_estoque1 - qtd_vd_online < 0 then 0
            else prun_estoque1 - qtd_vd_online end as estoque_online,
            case when prun_ativo = 'S' then true 
            else false end as status,
            dpto_descricao as categoria_lv1,
            LEFT(grup_classificacao, 7) as cod_subcat,
            false as naocontrolaestoque
                from produtos
                inner join produn on prun_prod_codigo = prod_codigo 
                inner join departamentos on dpto_codigo = prod_dpto_codigo
                left join grupos on grup_codigo = prod_grup_codigo 
                inner join (select vopr_unid_codigo, vopr_prod_codigo , sum(vopr_qtde) as qtd_vd_online 
                                            from vdonlineprod
                                                where vopr_datamvto = current_date
                                                and vopr_status = 'N'
                                                    group by 1,2) as vd_online on vopr_unid_codigo = prun_unid_codigo and vopr_prod_codigo = prun_prod_codigo
                    where prun_ativo = 'S'
                    and prun_unid_codigo in ('${this.unidade}')
                    and prod_status = 'N'
                    and prod_descricao not like ('%C.P%')
                    and prod_descricao not like ('%Cx C/%')
                    and prod_balanca = 'N'
                    and prun_prpdv > 0
                    and prod_dpto_codigo not in ('122','124','125','126','127','128','129')
                            )select sku, cod_store, categoria, preco_regular, estoque_online, status, concat(categoria,'-',cod_subcat) as subcat, naocontrolaestoque
                            from consulta
                                    group by 1,2,3,4,5,6,7,8
                                        order by 1`
        return select;
    }
}
module.exports = Queryscatalogosvarejo;