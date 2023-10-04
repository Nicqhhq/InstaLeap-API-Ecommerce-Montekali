const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const db = new sqlite3.Database(path.join(__dirname, 'database', 'localdatabase', 'localdatabase.db'));
const Migrations = require(path.join(__dirname, 'database', 'migrations.js'));
const migrations = new Migrations('002')
const { DateTime, Interval } = require("luxon");
// Objeto para armazenar os dados no formato desejado

// Objeto para armazenar os dados no formato desejado

// migrations.getHorariosMargem().then((_) => { console.log(_) })






async function inicializacao() {
    controladortempo = {}
    const dados = await migrations.getHorariosMargem();
    dados.forEach(row => {
        const { horafuncao_unidade, horafuncao_nome, hora_inicio_hour, hora_inicio_minute, hora_inicio_second, hora_inicio_millisecond, hora_fim_hour, hora_fim_minute, hora_fim_second, hora_fim_millisecond } = row;

        if (!controladortempo[horafuncao_unidade]) {
            controladortempo[horafuncao_unidade] = {};
        }

        if (!controladortempo[horafuncao_unidade][horafuncao_nome]) {
            controladortempo[horafuncao_unidade][horafuncao_nome] = [];
        }

        controladortempo[horafuncao_unidade][horafuncao_nome].push({
            hour: hora_inicio_hour,
            minute: hora_inicio_minute,
            second: hora_inicio_second,
            millisecond: hora_inicio_millisecond
        });

        controladortempo[horafuncao_unidade][horafuncao_nome].push({
            hour: hora_fim_hour,
            minute: hora_fim_minute,
            second: hora_fim_second,
            millisecond: hora_fim_millisecond
        });
    });
    return new Promise((resolve, reject) => {
        if (controladortempo.hasOwnProperty('002')) {
            console.log(`Código Raiz: ${'002'}`);
            const funcoes = controladortempo['002'];
            const funcoesParaExecutar = [];
            for (const funcao in funcoes) {
                if (funcoes.hasOwnProperty(funcao)) {
                    const tempos = funcoes[funcao];
                    const now = DateTime.local();
                    const horarioinicio = new Date(); // Obtenha a hora atual
                    horarioinicio.setHours(tempos[0].hour, tempos[0].minute, tempos[0].second, tempos[0].millisecond);
                    const horariofim = new Date();
                    horariofim.setHours(tempos[1].hour, tempos[1].minute, tempos[1].second, tempos[1].millisecond);
                    if (horarioinicio <= now && now <= horariofim) {
                        funcoesParaExecutar.push(funcao);
                    } else {
                        console.log(`Fora de horário ${funcao}`);
                    }
                }
            }
            if (funcoesParaExecutar.length > 0) {
                console.log(`Dentro do tempo ${funcoesParaExecutar.join(', ')}`);

                // Função para executar as promessas sequencialmente
                const executePromisesSequentially = async () => {
                    for (const funcaoExecutar of funcoesParaExecutar) {
                        await this.sender[funcaoExecutar](); // Aguardar a conclusão da função antes de prosseguir
                    }
                };

                executePromisesSequentially().then(() => {
                    console.log('Todas as funções foram executadas sequencialmente.');
                    resolve();
                }).catch(error => {
                    console.error('Ocorreu um erro durante a execução sequencial das funções:', error);
                    reject();
                });
            }
            else {
                console.log('Nenhuma funcao para rodar')
                resolve();
            }
        } else {
            console.log(`Código Raiz '${'002'}' não encontrado.`);
            reject(`Código Raiz '${'002'}' não encontrado.`);
        }
    })
}






inicializacao()



// const controladortempo = {
//     '002': {
//         'criaProduto': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
//         'atualizaProduto': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
//         'criaCatalogo': [{ hour: 22, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//         'atualizaCatalogo': [{ hour: 23, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 59, second: 59, millisecond: 0 }],
//         'atualizaCatalogoEstoquePreco': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//     },
//     '007': {
//         'criaProduto': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
//         'atualizaProduto': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
//         'criaCatalogo': [{ hour: 22, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//         'atualizaCatalogo': [{ hour: 23, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 59, second: 59, millisecond: 0 }],
//         'atualizaCatalogoEstoquePreco': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//         // 'criaProdutoInicial': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//         // 'criaCatalogoInicial': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//     },
//     '100': {
//         'criaProdutoAtacado': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
//         'atualizaProdutoAtacado': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
//         'criaCatalogoAtacado': [{ hour: 22, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//         'atualizaCatalogoPrecoEstoqueAtacado': [{ hour: 5, minute: 50, second: 0, millisecond: 0 }, { hour: 20, minute: 0, second: 0, millisecond: 0 }],
//         'CriaPromocaoProgressivaAtacado': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//         'criaProdutoInicial': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//         'criaCatalogoInicialAtacado': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
//     }
// }



























// // Consulta o banco de dados e processa os resultados
// db.all('SELECT horafuncao_unidade, horafuncao_nome, hora_inicio_hour, hora_inicio_minute, hora_inicio_second, hora_inicio_millisecond, hora_fim_hour, hora_fim_minute, hora_fim_second, hora_fim_millisecond FROM horarios WHERE horafuncao_ativa = 1', (err, rows) => {
//     if (err) {
//         console.error(err.message);
//         return;
//     }

//     // Loop através das linhas do resultado
// rows.forEach(row => {
//     const { horafuncao_unidade, horafuncao_nome, hora_inicio_hour, hora_inicio_minute, hora_inicio_second, hora_inicio_millisecond, hora_fim_hour, hora_fim_minute, hora_fim_second, hora_fim_millisecond } = row;

//     if (!controladortempo[horafuncao_unidade]) {
//         controladortempo[horafuncao_unidade] = {};
//     }

//     if (!controladortempo[horafuncao_unidade][horafuncao_nome]) {
//         controladortempo[horafuncao_unidade][horafuncao_nome] = [];
//     }

//     controladortempo[horafuncao_unidade][horafuncao_nome].push({
//         hour: hora_inicio_hour,
//         minute: hora_inicio_minute,
//         second: hora_inicio_second,
//         millisecond: hora_inicio_millisecond
//     });

//     controladortempo[horafuncao_unidade][horafuncao_nome].push({
//         hour: hora_fim_hour,
//         minute: hora_fim_minute,
//         second: hora_fim_second,
//         millisecond: hora_fim_millisecond
//     });
// });



//     if (controladortempo.hasOwnProperty('002')) {
//         console.log(`Código Raiz: ${'002'}`);
//         const funcoes = controladortempo['002'];
//         const funcoesParaExecutar = [];
//         for (const funcao in funcoes) {
//             if (funcoes.hasOwnProperty(funcao)) {
//                 const tempos = funcoes[funcao];
//                 const now = DateTime.local();
//                 const horarioinicio = new Date(); // Obtenha a hora atual
//                 horarioinicio.setHours(tempos[0].hour, tempos[0].minute, tempos[0].second, tempos[0].millisecond);
//                 const horariofim = new Date();
//                 horariofim.setHours(tempos[1].hour, tempos[1].minute, tempos[1].second, tempos[1].millisecond);
//                 if (horarioinicio <= now && now <= horariofim) {
//                     funcoesParaExecutar.push(funcao);
//                 } else {
//                     console.log(`Fora de horário ${funcao}`);
//                 }
//             }
//         }
//         if (funcoesParaExecutar.length > 0) {
//             console.log(`Dentro do tempo ${funcoesParaExecutar.join(', ')}`);

//             // Função para executar as promessas sequencialmente
//             // const executePromisesSequentially = async () => {
//             //     for (const funcaoExecutar of funcoesParaExecutar) {
//             //         await this.sender[funcaoExecutar](); // Aguardar a conclusão da função antes de prosseguir
//             //     }
//             // };

//             // executePromisesSequentially().then(() => {
//             //     console.log('Todas as funções foram executadas sequencialmente.');
//             //     resolve();
//             // }).catch(error => {
//             //     console.error('Ocorreu um erro durante a execução sequencial das funções:', error);
//             //     reject();
//             // });
//         }
//         else {
//             console.log('Nenhuma funcao para rodar')
//             resolve();
//         }
//     } else {
//         console.log(`Código Raiz '${'002'}' não encontrado.`);
//         reject(`Código Raiz '${'002'}' não encontrado.`);
//     }


//     // Fecha o banco de dados
//     db.close();
// });