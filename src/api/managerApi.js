const path = require('path');
const Migrations = require(path.join(__dirname, '..', '..', 'database', 'migrations.js'))
const db = new Migrations();
class ManagerApi {
    async getMargem(req, res) {
        const resultado = [];
        const margens = await db.getMargem();
        const teste = await db.getMargemAtiva();
        teste.forEach(item => {
            if (!resultado[item.margem_nome]) {
                resultado[item.margem_nome] = [];
            }
            if (item.margem_ativa == 1) {
                resultado[item.margem_nome].push({
                    'margem': item.margem_nome,
                    'ativa': true,
                    'fator': []
                })
            }
            else {
                resultado[item.margem_nome].push({
                    'margem': item.margem_nome,
                    'ativa': false,
                    'fator': []
                })
            }
        })
        margens.forEach(item => {
            const nome = item.margem_nome;
            const multiplo = item.margem_multiplo;
            const porcentagem = item.margem_porcentagem;
            const sazonal = item.margem_sazonal;
            const margemativa = item.margem_ativa
            const datainicio = item.margem_sazonal_data_inicio;
            const datafim = item.margem_sazonal_data_fim;
            const criada = item.margem_criada;
            if (!resultado[nome]) {
                resultado[nome] = [];
            }
            resultado[nome][0]['fator'].push({
                'multiplo': multiplo.toString(),
                'porcentagem': porcentagem,
                'sazonal': sazonal,
                'margemativa': margemativa,
                'datainicio': datainicio,
                'datafim': datafim,
                'margem_criada': criada
            });
        });
        res.json(Object.values(resultado));
        console.log(resultado);
    }
    async setMargem(req, res) {
        var valor = 0;
        console.log(req.body)
        for (const chave in req.body) {
            if (req.body.hasOwnProperty(chave)) {
                const arrayDeObjetos = req.body[chave];
                for (const objeto of arrayDeObjetos) {
                    await db.setMargem(`
                    UPDATE margem_produtos 
                        set margem_porcentagem = ${objeto.porcentagem},
                        margem_sazonal = ${objeto.sazonal},
                        margem_sazonal_data_inicio = ${objeto.datainicio},
                        margem_sazonal_data_fim = ${objeto.datafim},
                        margem_ativa = ${objeto.margemativa}
                        where margem_nome = '${chave}' and margem_multiplo = ${objeto.multiplo}`).then(
                        (_) => valor += _
                    ).catch((_) => console.log(`erro ${_}`))
                }

            }
        }
        res.status(200).json({ "Valores Atualizados": valor })
    }
}
module.exports = ManagerApi;