// Definição das variáveis
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

// Variáveis de controle da dificuldade
let difficulty = "medium"; // Valor inicial, padrão: médio

// Configuração da paleta do jogador e da IA
let player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

let ai = {
    x: canvas.width - 20,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

// Configuração da bola
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 4,
    dx: 4,
    dy: 4
};

// Evento para mudar a dificuldade
document.getElementById("difficulty").addEventListener("change", (e) => {
    difficulty = e.target.value;
    resetBall();  // Reseta a bola ao mudar a dificuldade
});

// Função para desenhar a paleta
function drawPaddle(x, y, width, height) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, width, height);
}

// Função para desenhar a bola
function drawBall(x, y, radius) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// Função para detectar colisão com as paletas
function collisionDetection() {
    // Colisão com a paleta do jogador
    if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.dx = -ball.dx;
        ball.speed += 0.2; // Aumenta a velocidade da bola a cada colisão
    }

    // Colisão com a paleta da IA
    if (ball.x + ball.radius > ai.x && ball.y > ai.y && ball.y < ai.y + ai.height) {
        ball.dx = -ball.dx;
        ball.speed += 0.2; // Aumenta a velocidade da bola a cada colisão
    }
}

// Função para mover as paletas
function movePaddles() {
    // Movimento da paleta do jogador
    player.y += player.dy;

    // Movimento da paleta da IA com base na dificuldade
    if (difficulty === "easy") {
        ai.dy = (ball.y - (ai.y + ai.height / 2)) * 0.05;  // IA mais lenta
    } else if (difficulty === "medium") {
        ai.dy = (ball.y - (ai.y + ai.height / 2)) * 0.1;  // IA com média velocidade
    } else if (difficulty === "hard") {
        ai.dy = (ball.y - (ai.y + ai.height / 2)) * 0.15;  // IA mais rápida
    }

    ai.y += ai.dy;

    // Restringir o movimento das paletas dentro do canvas
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
    if (ai.y < 0) ai.y = 0;
    if (ai.y + ai.height > canvas.height) ai.y = canvas.height - ai.height;
}

// Função para mover a bola
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Colisão com as paredes superior e inferior
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }

    // Se a bola sair do campo, reseta a bola
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        resetBall();
    }
}

// Função para resetar a posição da bola
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
}

// Função para atualizar o jogo
function update() {
    movePaddles();
    moveBall();
    collisionDetection();
    draw();
}

// Função para desenhar todos os elementos do jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    drawPaddle(player.x, player.y, player.width, player.height);
    drawPaddle(ai.x, ai.y, ai.width, ai.height);
    drawBall(ball.x, ball.y, ball.radius);
}

// Função principal de renderização
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Controlar o movimento da paleta do jogador
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        player.dy = -8;
    } else if (e.key === "ArrowDown") {
        player.dy = 8;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        player.dy = 0;
    }
});

// Inicia o jogo
resetBall();
gameLoop();
