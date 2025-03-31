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

    resultado.value = total; // Exibe o resultado
    operacao = '';
    valorAnterior = '';
}

// Função para definir a operação
function setOperacao(op) {
    if (resultado.value === '') return;
    if (valorAnterior !== '') {
        calcular();
    }
    operacao = op;
    valorAnterior = resultado.value;
    resultado.value = '';
}
