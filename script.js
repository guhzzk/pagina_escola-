let resultado = document.getElementById('resultado');
let operacao = '';
let valorAnterior = '';

function adicionar(numero) {
    resultado.value += numero;
}

function setOperacao(op) {
    if (resultado.value === '') return;
    if (valorAnterior !== '') {
        calcular();
    }
    operacao = op;
    valorAnterior = resultado.value;
    resultado.value = '';
}

function calcular() {
    let valorAtual = resultado.value;
    let total;
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

function limpar() {
    resultado.value = '';
    operacao = '';
    valorAnterior = '';
}
