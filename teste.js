const path = require('path');
const { emitKeypressEvents } = require('readline');
const databaselocal = require(path.join(__dirname, 'database', 'localdatabase', 'controllerdatabase', 'initdatabase.js'));
const Queryspromocoes = require(path.join(__dirname, 'database', 'atacado', 'queryspromocoesatacado.js'));
const Migrations = require(path.join(__dirname, 'database', 'migrations.js'));
const querypromocoes = new Queryspromocoes;
const migrations = new Migrations('100')
const db = new databaselocal()
const Sender = require(path.join(__dirname, 'src', 'instaleapAPI', 'sender.js'));
const sender = new Sender('100')
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
    for (var classe of Object.keys(resultado)) {
        var itens = await migrations.dadosCriaPromocaoProgressiva(classe, resultado[classe][0]['datainicio'], resultado[classe][0]['datafim'], true, resultado[classe][0]['multiplo'], resultado[classe][1]['multiplo'], resultado[classe][0]['porcentagem'], resultado[classe][1]['porcentagem']).then((_) => itens = _[0])
        itens.forEach(item => {

        })
    }
}
// Teste();

sender.CriaPromocaoProgressivaAtacado()