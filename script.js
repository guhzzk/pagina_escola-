const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Configurações do jogo
const gridSize = 20;
const canvasSize = 400;
const snakeSpeed = 150;
let snake = [{ x: 160, y: 160 }];
let direction = 'RIGHT';
let food = spawnFood();

// Eventos de controle
let lastKeyPressed = '';
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && lastKeyPressed !== 'DOWN') {
        direction = 'UP';
    }
    if (event.key === 'ArrowDown' && lastKeyPressed !== 'UP') {
        direction = 'DOWN';
    }
    if (event.key === 'ArrowLeft' && lastKeyPressed !== 'RIGHT') {
        direction = 'LEFT';
    }
    if (event.key === 'ArrowRight' && lastKeyPressed !== 'LEFT') {
        direction = 'RIGHT';
    }
    lastKeyPressed = direction;
});

// Prevenir o comportamento padrão do gesto de rolar para baixo em dispositivos móveis
document.addEventListener('touchstart', (e) => {
    e.preventDefault();
});

// Função principal de atualização do jogo
function gameLoop() {
    updateSnake();
    if (checkCollision()) {
        return endGame();
    }
    if (eatFood()) {
        food = spawnFood();
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

    snake.unshift(head);
    snake.pop();
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

// Desenha o jogo na tela
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake();
    drawFood();
}

// Desenha a cobrinha
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'lime' : 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Desenha a comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Gera uma nova posição aleatória para a comida
function spawnFood() {
    let x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    let y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

// Função que encerra o jogo
function endGame() {
    alert("Fim de jogo!");
    snake = [{ x: 160, y: 160 }];
    direction = 'RIGHT';
    food = spawnFood();
}

// Inicia o loop do jogo
setInterval(gameLoop, snakeSpeed);
