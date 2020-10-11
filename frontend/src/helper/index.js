/**
 * Converte a data do sistema para a data do padrão DD/MM/AAAA
 * 
 * @param {Date} date data no padrão do sistema
 * 
 * @return {string} Traz a string do tipo DD/MM/AAAA
 */
const formatDate = (date) => {
    const d = date.getDate() < 10 ? `0${date.getDate()*1}`: date.getDate()*1
    const m = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`: date.getMonth()+1
    const y = date.getFullYear()
    
    return `${d}/${m}/${y}`
}

const formatCurrency = (value) => value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

const agruparPor = (objetoArray, propriedade) => {
    return objetoArray.reduce(function (acc, obj) {
        let key = obj[propriedade];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, []);
}

export {
    formatDate,
    formatCurrency,
    agruparPor
}