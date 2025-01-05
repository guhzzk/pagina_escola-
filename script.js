const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const gridSize = 20; // Tamanho de cada célula do grid
const canvasSize = 400; // Tamanho do canvas
const snakeSpeed = 100; // Velocidade da cobrinha
let snake;
let direction;
let food;
let gameInterval;
let gameRunning = false;

// Referência ao botão de iniciar
const startButton = document.getElementById("startButton");

// Função para reiniciar o jogo
function resetGame() {
    snake = [{ x: 160, y: 160 }]; // Cobrinha começa no meio
    direction = 'RIGHT'; // Direção inicial da cobrinha
    food = spawnFood(); // Coloca a comida
    gameRunning = true;
    startButton.classList.remove('visible');  // Esconde o botão de start
    gameInterval = setInterval(gameLoop, snakeSpeed); // Inicia o loop do jogo
}

// Função para iniciar o jogo
function startGame() {
    resetGame();
}

// Função principal de atualização do jogo
function gameLoop() {
    updateSnake();
    if (checkCollision()) {
        return endGame();
    }
    if (eatFood()) {
        food = spawnFood(); // Recria a comida após a cobra comer
        growSnake(); // Faz a cobra crescer
    }
    draw();
}

// Atualiza a posição da cobrinha
function updateSnake() {
    let head = { ...snake[0] };

    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    snake.unshift(head); // Adiciona o novo segmento na frente da cobrinha

    // Se a cobrinha não comer a comida, remove o último segmento
    if (!eatFood()) {
        snake.pop();
    }
}

// Verifica colisões com a parede ou com o próprio corpo
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Verifica se a cobrinha comeu a comida
function eatFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

// Função para fazer a cobra crescer
function growSnake() {
    // Não remove o último segmento para que a cobra cresça
    snake.push({}); // Adiciona um novo segmento vazio, será atualizado na próxima iteração
}

// Desenha o jogo na tela
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize); // Limpa o canvas
    drawSnake(); // Desenha a cobrinha
    drawFood(); // Desenha a comida
}

// Desenha a cobrinha
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'lime' : 'green'; // Cor diferente para a cabeça
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize); // Desenha cada segmento
    });
}

// Desenha a comida
function drawFood() {
    ctx.fillStyle = 'red'; // Cor da comida
    ctx.fillRect(food.x, food.y, gridSize, gridSize); // Desenha a comida
}

// Gera uma nova posição aleatória para a comida
function spawnFood() {
    let x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    let y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

// Função que encerra o jogo
function endGame() {
    clearInterval(gameInterval);
    alert("Fim de jogo!");
    showStartButton();  // Exibe o botão de start novamente
    gameRunning = false;
}

// Exibe o botão de início de forma suave
function showStartButton() {
    startButton.classList.add('visible');
}

// Eventos de controle (teclado e tela sensível)
let lastDirection = 'RIGHT'; // Direção inicial
document.addEventListener('keydown', (event) => {
    if (!gameRunning) return;

    // Verifica a direção da cobrinha e impede virar para a direção oposta
    if (event.key === 'ArrowUp' && lastDirection !== 'DOWN') {
        direction = 'UP';
    }
    if (event.key === 'ArrowDown' && lastDirection !== 'UP') {
        direction = 'DOWN';
    }
    if (event.key === 'ArrowLeft' && lastDirection !== 'RIGHT') {
        direction = 'LEFT';
    }
    if (event.key === 'ArrowRight' && lastDirection !== 'LEFT') {
        direction = 'RIGHT';
    }

    lastDirection = direction; // Salva a última direção pressionada
});

// Controles para dispositivos móveis (usando toques)
let touchStartX, touchStartY;
document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
        let deltaX = e.touches[0].clientX - touchStartX;
        let deltaY = e.touches[0].clientY - touchStartY;

        // Verifica a direção do movimento no toque
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0 && lastDirection !== 'LEFT') {
                direction = 'RIGHT';
            } else if (deltaX < 0 && lastDirection !== 'RIGHT') {
                direction = 'LEFT';
            }
        } else {
            if (deltaY > 0 && lastDirection !== 'UP') {
                direction = 'DOWN';
            } else if (deltaY < 0 && lastDirection !== 'DOWN') {
                direction = 'UP';
            }
        }

        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
});

// Iniciar o jogo ao clicar no botão
startButton.addEventListener("click", () => {
    // Verifica se o jogo está parado e inicia
    if (!gameRunning) {
        startGame();
    }
});
