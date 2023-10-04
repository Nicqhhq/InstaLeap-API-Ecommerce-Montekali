class Timer {

    get get_hora_atual() {
        return this.hora_atual
    }
    get get_data_atual() {
        return this.data_atual
    }
    get get_datahora_atual() {
        return this.datahora_atual
    }
    get get_data_atual_formatada() {
        return this.data_atual_formatada
    }
    hora_atual() {
        const now = new Date;
        const horas = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
        const minutos = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        const tempo = `${horas}:${minutos}`
        return tempo;
    }
    data_atual() {
        const now = new Date;
        const dias = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
        const mes = now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth();
        const ano = now.getFullYear()
        const data = `${dias}/${mes}/${ano}`
        return data
    }
    data_atual_formatada() {
        const now = new Date;
        const dias = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
        const mes = now.getMonth() + 1 < 10 ? `0${now.getMonth()}` : now.getMonth() + 1;
        const ano = now.getFullYear()
        const data = `${dias}${mes}${ano}`
        return data
    }
    datahora_atual() {
        const now = new Date;
        const horas = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
        const minutos = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        const segundos = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
        const tempo = `${horas}:${minutos}:${segundos}`
        const dias = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
        const mes = now.getMonth() + 1 < 10 ? `0${now.getMonth()}` : now.getMonth() + 1;
        const ano = now.getFullYear()
        const data = `${dias}/${mes}/${ano}`
        const datahora = `${data} - ${tempo}`
        return datahora
    }
    formataDataPromo() {
        const dataInicio = new Date();
        const dataFim = new Date();
        dataFim.setHours(23, 59, 0, 0);
        const formataData = (data) => {
            const ano = data.getFullYear();
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const dia = String(data.getDate()).padStart(2, '0');
            const horas = String(data.getHours()).padStart(2, '0');
            const minutos = String(data.getMinutes()).padStart(2, '0');
            const segundos = String(data.getSeconds()).padStart(2, '0');
            const fusoHorario = '-03:00'; // Fuso horário desejado
            return `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}${fusoHorario}`;
        };
        const dataInicioFormatada = formataData(dataInicio);
        const dataFimFormatada = formataData(dataFim);
        return [dataInicioFormatada, dataFimFormatada]
    }

}

module.exports = Timer;