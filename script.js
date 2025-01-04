const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Definindo o tamanho do canvas para ser responsivo
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;  // 90% da largura da tela
    canvas.height = window.innerWidth * 0.5;  // 50% da largura da tela
    resetBall();  // Resetar a bola ao ajustar o tamanho
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();  // Chama a função inicialmente para ajustar o tamanho

const paddleWidth = canvas.width * 0.02; // Ajustando a largura do paddle
const paddleHeight = canvas.height * 0.25; // Ajustando a altura do paddle
const ballSize = canvas.width * 0.02; // Ajustando o tamanho da bola

let player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "white",
    dy: 0
};

let ai = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "white",
    dy: 0
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    speedX: 5,
    speedY: 5,
    color: "white"
};

let playerScore = 0;
let aiScore = 0;
let difficulty = 2;

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("difficulty").addEventListener("change", (e) => {
    difficulty = parseInt(e.target.value);
});

// Função de desenhar a raquete
function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Função de desenhar a bola
function drawBall(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

// Função para atualizar a raquete do jogador
function updatePlayerPaddle() {
    player.y += player.dy;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

// Função para atualizar a raquete da IA
function updateAiPaddle() {
    if (ai.y + ai.height / 2 < ball.y) ai.y += difficulty;
    else if (ai.y + ai.height / 2 > ball.y) ai.y -= difficulty;

    if (ai.y < 0) ai.y = 0;
    if (ai.y + ai.height > canvas.height) ai.y = canvas.height - ai.height;
}

// Função para mover a bola
function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y <= 0 || ball.y >= canvas.height) ball.speedY *= -1;

    if (ball.x <= player.x + player.width && ball.y >= player.y && ball.y <= player.y + player.height) {
        ball.speedX *= -1;
    }

    if (ball.x >= ai.x - ai.width && ball.y >= ai.y && ball.y <= ai.y + ai.height) {
        ball.speedX *= -1;
    }

    if (ball.x <= 0) {
        aiScore++;
        resetBall();
    }

    if (ball.x >= canvas.width) {
        playerScore++;
        resetBall();
    }
}

// Função para resetar a bola
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 5 * (Math.random() < 0.5 ? 1 : -1);
    ball.speedY = 5 * (Math.random() < 0.5 ? 1 : -1);
}

// Função para atualizar o placar
function updateScores() {
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("ai-score").textContent = aiScore;
}

// Função do loop do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlayerPaddle();
    updateAiPaddle();
    moveBall();
    drawPaddle(player.x, player.y, player.width, player.height, player.color);
    drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawBall(ball.x, ball.y, ball.size, ball.color);
    updateScores();

    if (playerScore >= 3 || aiScore >= 3) {
        if (playerScore > aiScore) {
            alert("Você venceu!");
        } else {
            alert("Você perdeu!");
        }
        resetGame();
    }

    requestAnimationFrame(gameLoop);
}

function startGame() {
    playerScore = 0;
    aiScore = 0;
    updateScores();
    resetBall();
    gameLoop();
}

function resetGame() {
    playerScore = 0;
    aiScore = 0;
    updateScores();
    resetBall();
}

// Controlando a raquete com o teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") player.dy = -5;
    if (e.key === "ArrowDown") player.dy = 5;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") player.dy = 0;
});

// Controlando a raquete com os botões
document.getElementById("move-up").addEventListener("click", () => {
    player.dy = -5;
});

document.getElementById("move-down").addEventListener("click", () => {
    player.dy = 5;
});

// Parando o movimento da raquete quando o botão for solto
document.getElementById("move-up").addEventListener("mouseup", () => {
    player.dy = 0;
});

document.getElementById("move-down").addEventListener("mouseup", () => {
    player.dy = 0;
});
