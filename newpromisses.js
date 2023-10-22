const path = require('path');
const Sender = require(path.join(__dirname, 'src', 'instaleapAPI', 'sender.js'));
const Server = require(path.join(__dirname, 'src', 'api', 'express.js'));
const Tempo = require(path.join(__dirname, 'src', 'configlogs', 'time.js'));
const Migrations = require(path.join(__dirname, 'database', 'migrations.js'));
const { DateTime, Interval } = require("luxon");

var primeiraabertura = true;
class Promisses {
    constructor(unidade, primeiraabertura) {
        this.unidade = unidade;
        this.primeiraabertura = primeiraabertura;
        this.arraypromisse = [];
        this.sender = new Sender(this.unidade)
    }
    async inicializacao() {
        const tempo = new Tempo();
        const migrations = new Migrations(this.unidade)
        var controladortempo = {}
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
            if (controladortempo.hasOwnProperty(this.unidade)) {
                console.log(`Código Raiz: ${this.unidade}`);
                const funcoes = controladortempo[this.unidade];
                const funcoesParaExecutar = [];
                for (const funcao in funcoes) {
                    if (funcoes.hasOwnProperty(funcao)) {
                        const tempos = funcoes[funcao];
                        const now = DateTime.local();
                        const horarioinicio = new Date();
                        horarioinicio.setHours(tempos[0].hour, tempos[0].minute, tempos[0].second, tempos[0].millisecond);
                        const horariofim = new Date();
                        horariofim.setHours(tempos[1].hour, tempos[1].minute, tempos[1].second, tempos[1].millisecond);
                        if (horarioinicio <= now && now <= horariofim) {
                            funcoesParaExecutar.push(funcao);
                        } else {
                            console.log(`${tempo.get_hora_atual()} - Unidade ${this.unidade} Fora de horário ${funcao}`);
                        }
                    }
                }
                if (funcoesParaExecutar.length > 0) {
                    console.log(`${tempo.get_hora_atual()} - Unidade ${this.unidade} Dentro do tempo Unidade ${funcoesParaExecutar.join(', ')}`);
                    const executePromisesSequentially = async () => {
                        for (const funcaoExecutar of funcoesParaExecutar) {
                            await this.sender[funcaoExecutar]();
                        }
                    };

                    executePromisesSequentially().then(() => {
                        console.log(`${tempo.get_hora_atual()} - Todas as funções foram executadas sequencialmente.`);
                        resolve();
                    }).catch(error => {
                        console.error(`${tempo.get_hora_atual()} - Ocorreu um erro durante a execução sequencial das funções:`, error);
                        reject();
                    });
                }
                else {
                    console.log(`${tempo.get_hora_atual()} - Nenhuma funcao para rodar`)
                    resolve();
                }
            } else {
                console.log(`${tempo.get_hora_atual()} - Código Raiz '${this.unidade}' não encontrado.`);
                reject(`Código Raiz '${this.unidade}' não encontrado.`);
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
    const tempo = new Tempo();
    if (primeiraabertura == true) {
        // await monteserrat.inicializacao().then(() => console.log("Finalizada Monte Serrat"));
        await kalimera.inicializacao().then(() => console.log(`${tempo.get_hora_atual()} - Finalizada Kalimera`));
        // await atacadocerto.inicializacao().then(() => console.log("Finalizada Atacado certo"));
        primeiraabertura = false;
        iniciar();
    }
    else {
        setInterval(async () => {
            // await monteserrat.inicializacao().then(() => console.log("Finalizada Monte Serrat"));
            await kalimera.inicializacao().then(() => console.log(`${tempo.get_hora_atual()} - Finalizada Kalimera`));
        }, 1800000);
        setInterval(async () => {
            // await atacadocerto.inicializacao().then(() => console.log("Finalizada Atacado certo"));
        }, 3600000);
        primeiraabertura = false;
    }
}


iniciar();
