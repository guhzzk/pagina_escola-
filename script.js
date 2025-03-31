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
    let valorAtual = parseFloat(resultado.value);
    let total;

    if (valorAnterior === '' || resultado.value === '') return;

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
            if (valorAtual === 0) {
                resultado.value = 'Erro'; // Evitar divisão por zero
                return;
            }
            total = parseFloat(valorAnterior) / valorAtual;
            break;
        default:
            return;
    }

    resultado.value = total;  // Exibe o resultado
    operacao = '';  // Apaga a operação para começar uma nova
    valorAnterior = '';  // Reseta o valor anterior
}

function setOperacao(op) {
    if (resultado.value === '') return;  // Impede a operação caso o visor esteja vazio
    if (valorAnterior !== '') {
        calcular();  // Faz o cálculo se já houver um valor anterior
    }

    // Modifica a exibição do operador
    operacao = op === '*' ? 'x' : op === '/' ? '÷' : op;
    valorAnterior = resultado.value;  // Guarda o valor atual como o anterior
    resultado.value = '';  // Limpa o visor para o próximo número
}
