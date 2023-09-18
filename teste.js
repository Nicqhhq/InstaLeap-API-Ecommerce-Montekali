const path = require('path');
const databaselocal = require(path.join(__dirname, 'database', 'localdatabase', 'controllerdatabase', 'initdatabase.js'));
const Migrations = require(path.join(__dirname, 'database', 'migrations.js'));

const db = new databaselocal()
async function Teste() {
    const margens = await db.getMargemAtivaLocalDB();
    const resultado = {};
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
    for (const classeMargem of Object.keys(resultado)) {
        for (const fator in resultado[classeMargem]) {
            if (resultado[classeMargem].hasOwnProperty.call(resultado[classeMargem], fator)) {
                const element = resultado[classeMargem][fator];
                // console.log(`
                // -- Classe ${classeMargem} Multiplo ${element['multiplo']} 
                // select prod_codigo as sku,
                // 'stepped' as type_promo,
                // 'Compre mais, pague menos' as Description,
                // ${element['datainicio']} as data_inicio,
                // ${element['datafim']} as data_fim,
                // ${element['margemativa']} as status,
                // ${element['multiplo']} * prod_fatoremb as qtd,
                // coalesce(prun_prvenda3,0) - (coalesce(prun_prvenda3,0) * ${element['porcentagem']}/100) as preco
                //     from produtos
                //     inner join produn on prun_prod_codigo = prod_codigo and prun_unid_codigo = '100'
                //         where prun_ativo = 'S'
                //         and prun_unid_codigo in ('100')
                //         and prod_status = 'N'
                //         and prod_descricao not like ('%C.P%')
                //         and prod_balanca = 'N'
                //         and prod_dpto_codigo not in ('122','016','020','021','022','025','123','124','125','129')
                //         and prod_extra2 in ('A1','A2','A3')`)
            }
        }
    }
}

Teste();