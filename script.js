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
    if (valorAnterior === '' || resultado.value === '') return;

    let valorAtual = parseFloat(resultado.value);
    let total;

    // Substituindo os sinais antes de calcular
    let operador = operacao === 'x' ? '*' : operacao === '÷' ? '/' : operacao;

    switch (operador) {
        case '+':
            total = parseFloat(valorAnterior) + valorAtual;
            break;
        case '-':
            total = parseFloat(valorAnterior) - valorAtual;
            break;
        case '*':
            total = parseFloat(valorAnterior) * valorAtual;
            break;
        case '/':
            total = parseFloat(valorAnterior) / valorAtual;
            break;
        default:
            return;
    }

    resultado.value = total;
    valorAnterior = total; 
    operacao = '';
}

function setOperacao(op) {
    if (resultado.value === '') return;
    if (valorAnterior !== '') {
        calcular();
    }
    
    // Modifica a exibição do operador
    operacao = op === '*' ? 'x' : op === '/' ? '÷' : op;
    valorAnterior = resultado.value;
    resultado.value += op;  // Exibe a operação no visor
}
