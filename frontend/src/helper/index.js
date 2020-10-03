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
    formatCurrency,
    agruparPor
}