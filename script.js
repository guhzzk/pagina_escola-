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

    if (valorAnterior === '' || resultado.value === '') return;

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
            if (valorAtual === 0) {
                resultado.value = 'Erro'; // Evitar divisão por zero
                return;
            }
            total = parseFloat(valorAnterior) / valorAtual;
            break;
        default:
            return;
    }

    // Atualiza o visor com o resultado
    resultado.value = total;
    operacao = '';  // Limpa a operação após o cálculo
    valorAnterior = '';  // Limpa o valor anterior após o cálculo
}

function setOperacao(op) {
    if (resultado.value === '') return; // Não faz nada se o campo de entrada estiver vazio

    if (valorAnterior !== '') {
        calcular();  // Faz o cálculo anterior antes de aplicar nova operação
    }

    // Armazena a operação (somente o operador como 'x' ou '÷')
    operacao = op === '*' ? 'x' : op === '/' ? '÷' : op;
    valorAnterior = resultado.value;  // Guarda o número atual como valor anterior
    resultado.value = '';  // Limpa o visor para o próximo número
}
