// script.js

const canvas = document.getElementById("pongGame");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let playerScore = 0;
let aiScore = 0;
let gameOver = false;
let ballSpeed = 5;

// Paddles
const paddleWidth = 10;
const paddleHeight = 100;

let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDirectionX = Math.random() < 0.5 ? 1 : -1;
let ballDirectionY = Math.random() < 0.5 ? 1 : -1;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

let difficulty = 2; // Default difficulty (Medium)

const updateScoreboard = () => {
    document.getElementById("playerScore").innerText = playerScore;
    document.getElementById("aiScore").innerText = aiScore;
};

const checkWinner = () => {
    if (playerScore >= 3) {
        document.getElementById("winnerMessage").innerText = "Você venceu!";
        gameOver = true;
    } else if (aiScore >= 3) {
        document.getElementById("winnerMessage").innerText = "A IA venceu!";
        gameOver = true;
    }
};

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
};

const drawPaddles = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight); // Player paddle
    ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight); // AI paddle
};

const moveBall = () => {
    if (ballY + ballSpeedY > canvas.height || ballY + ballSpeedY < 0) {
        ballDirectionY = -ballDirectionY;
    }

    if (ballX + ballSpeedX > canvas.width - paddleWidth) {
        if (ballY > aiY && ballY < aiY + paddleHeight) {
            ballDirectionX = -ballDirectionX;
            aiScore++;
            updateScoreboard();
        } else {
            playerScore++;
            updateScoreboard();
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
        }
    }

    if (ballX + ballSpeedX < paddleWidth) {
        if (ballY > playerY && ballY < playerY + paddleHeight) {
            ballDirectionX = -ballDirectionX;
            playerScore++;
            updateScoreboard();
        } else {
            aiScore++;
            updateScoreboard();
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
        }
    }

    ballX += ballSpeedX * ballDirectionX;
    ballY += ballSpeedY * ballDirectionY;
};

const moveAI = () => {
    const aiSpeed = difficulty * 0.5;

    if (ballY < aiY + paddleHeight / 2) {
        aiY -= aiSpeed;
    } else if (ballY > aiY + paddleHeight / 2) {
        aiY += aiSpeed;
    }
};

const updateGame = () => {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    moveBall();
    moveAI();
    checkWinner();
    requestAnimationFrame(updateGame);
};

document.addEventListener("mousemove", (event) => {
    if (gameOver) return;
    playerY = event.clientY - canvas.getBoundingClientRect().top - paddleHeight / 2;
    if (playerY < 0) playerY = 0;
    if (playerY > canvas.height - paddleHeight) playerY = canvas.height - paddleHeight;
});

document.getElementById("difficultySelect").addEventListener("change", (event) => {
    difficulty = parseInt(event.target.value);
    aiY = canvas.height / 2 - paddleHeight / 2; // Reset AI position
});

updateGame();
