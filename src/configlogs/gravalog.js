const path = require('path');
const fs = require('graceful-fs');
const timer = require('./time')
const tempo = new timer
const caminholog = path.join(__dirname, '..', '..', 'log/')
function gravaLog(log) {
    const datalog = tempo.get_data_atual_formatada()
    const horariolog = tempo.get_hora_atual()
    const datahora = tempo.get_datahora_atual()
    // console.log(datahora)
    var infolog = `\n${datahora} - ${log}`
    fs.appendFileSync(`${caminholog}Log_${datalog}.txt`, infolog);
}



exports.gravaLog = gravaLog