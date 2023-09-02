const path = require('path');
const Sender = require(path.join(__dirname, 'src', 'instaleapAPI', 'sender.js'));
const { DateTime, Interval } = require("luxon");
var primeiraabertura = true;
const now = DateTime.local();
const Server = require(path.join(__dirname, 'src', 'api', 'express.js'));
class Promisses {
    constructor(unidade, primeiraabertura) {
        this.unidade = unidade;
        this.primeiraabertura = primeiraabertura;
        this.arraypromisse = [];
    }
    async inicializacao() {
        const sender = new Sender(this.unidade);
        const controladortempo = {
            '002': {
                'criaProduto': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
                'atualizaProduto': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
                'criaCatalogo': [{ hour: 22, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
                'atualizaCatalogo': [{ hour: 23, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 59, second: 59, millisecond: 0 }],
                'atualizaCatalogoEstoquePreco': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
            },
            '007': {
                'criaProduto': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
                'atualizaProduto': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
                'criaCatalogo': [{ hour: 22, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
                'atualizaCatalogo': [{ hour: 23, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 59, second: 59, millisecond: 0 }],
                'atualizaCatalogoEstoquePreco': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
                // 'criaCatalogoInicial': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
                // 'criaProdutoInicial': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
            },
            '100': {
                'criaProdutoAtacado': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
                'atualizaProdutoAtacado': [{ hour: 20, minute: 0, second: 0, millisecond: 0 }, { hour: 22, minute: 0, second: 0, millisecond: 0 }],
                'criaCatalogoAtacado': [{ hour: 22, minute: 0, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
                'atualizaCatalogoPrecoEstoqueAtacado': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
                // 'criaProdutoInicial': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
                // 'criaCatalogoInicialAtacado': [{ hour: 6, minute: 50, second: 0, millisecond: 0 }, { hour: 23, minute: 0, second: 0, millisecond: 0 }],
            }
        }

        return new Promise((resolve, reject) => {
            if (controladortempo.hasOwnProperty(this.unidade)) {
                console.log(`Código Raiz: ${this.unidade}`);
                const funcoes = controladortempo[this.unidade];
                const funcoesParaExecutar = [];

                for (const funcao in funcoes) {
                    if (funcoes.hasOwnProperty(funcao)) {
                        const tempos = funcoes[funcao];
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
                            await sender[funcaoExecutar](); // Aguardar a conclusão da função antes de prosseguir
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
            } else {
                console.log(`Código Raiz '${this.unidade}' não encontrado.`);
            }
        })
    }
}

const monteserrat = new Promisses('002');
const kalimera = new Promisses('007');
const atacadocerto = new Promisses('100');
const server = new Server()
server.start();
async function iniciar() {
    if (primeiraabertura == true) {
        // await monteserrat.inicializacao().then("Finalizada Monte Serrat");
        // await kalimera.inicializacao().then("Finalizada Kalimera");
        // await atacadocerto.inicializacao().then("Finalizada Atacado certo");
        primeiraabertura = false;
        iniciar();
    }
    else {
        setInterval(async () => {
            await monteserrat.inicializacao().then("Finalizada Monte Serrat");
            await kalimera.inicializacao().then("Finalizada Kalimera");
        }, 1800000);
        setInterval(async () => {
            await atacadocerto.inicializacao().then("Finalizada Atacado certo");
        }, 3600000);
        primeiraabertura = false;
    }
}


iniciar();
