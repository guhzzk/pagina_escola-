const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 160, y: 160 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;
let gameInterval;
let touchActive = false; // Flag para controlar o toque

function generateFood() {
    let x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    let y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#4CAF50" : "#66BB6A";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
    });

    ctx.fillStyle = "#FF7043";
    ctx.shadowColor = "#FF8A65";
    ctx.shadowBlur = 15;
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    ctx.shadowBlur = 0;

    document.getElementById("score").textContent = score;
    moveSnake();
    checkCollisions();
}

function moveSnake() {
    const head = { ...snake[0] };

    if (direction === "UP") head.y -= gridSize;
    if (direction === "DOWN") head.y += gridSize;
    if (direction === "LEFT") head.x -= gridSize;
    if (direction === "RIGHT") head.x += gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }
}

function checkCollisions() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    document.getElementById("finalScore").textContent = score;
    document.getElementById("gameOver").style.display = "block";
    canvas.style.display = "none";
    clearInterval(gameInterval);
}

function restartGame() {
    snake = [{ x: 160, y: 160 }];
    direction = "RIGHT";
    score = 0;
    food = generateFood();
    document.getElementById("gameOver").style.display = "none";
    canvas.style.display = "block";
    gameLoop();
}

window.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
});

// Controla os toques na tela para evitar aceleração
let touchStartX, touchStartY;
window.addEventListener("touchstart", function(event) {
    if (touchActive) return; // Impede múltiplos toques
    touchActive = true;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

window.addEventListener("touchend", function(event) {
    if (!touchActive) return; // Impede toques adicionais se o toque não foi iniciado
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction !== "LEFT") {
            direction = "RIGHT";
        } else if (deltaX < 0 && direction !== "RIGHT") {
            direction = "LEFT";
        }
    } else {
        if (deltaY > 0 && direction !== "UP") {
            direction = "DOWN";
        } else if (deltaY < 0 && direction !== "DOWN") {
            direction = "UP";
        }
    }

    touchActive = false; // Libera o toque após processá-lo
});

// Previne o comportamento de recarregar ao puxar para baixo
window.addEventListener("touchmove", function(event) {
    event.preventDefault();
}, { passive: false });

function gameLoop() {
    draw();
    gameInterval = setInterval(gameLoop, 350); // Velocidade estável
}

gameLoop();
