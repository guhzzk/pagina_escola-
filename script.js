let resultado = document.getElementById('resultado');
let operacao = '';
let valorAnterior = '';

function adicionar(numero) {
    resultado.value += numero;
}

function limpar() {
    resultado.value = '';
    operacao = '';
    valorAnterior = '';
}

function calcular() {
    let valorAtual = resultado.value;
    let total;

    if (valorAnterior === '' || valorAtual === '') return;

    switch (operacao) {
        case '+':
            total = parseFloat(valorAnterior) + parseFloat(valorAtual);
            break;
        case '-':
            total = parseFloat(valorAnterior) - parseFloat(valorAtual);
            break;
        case '*':
            total = parseFloat(valorAnterior) * parseFloat(valorAtual);
            break;
        case '/':
            total = parseFloat(valorAnterior) / parseFloat(valorAtual);
            break;
        default:
            return;
    }

    resultado.value = total;
    operacao = '';
    valorAnterior = '';
}