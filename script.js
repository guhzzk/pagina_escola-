const startButton = document.getElementById("startButton");

// Função para reiniciar o jogo
function resetGame() {
    snake = [{ x: 160, y: 160 }];
    direction = 'RIGHT';
    food = spawnFood();
    gameRunning = true;
    startButton.classList.remove('visible');  // Esconde o botão de start
    gameInterval = setInterval(gameLoop, snakeSpeed); // Inicia o loop do jogo
}

// Função para iniciar o jogo
function startGame() {
    resetGame();
}

// Exibe o botão de início de forma suave
function showStartButton() {
    startButton.classList.add('visible');
}

function endGame() {
    clearInterval(gameInterval);
    alert("Fim de jogo!");
    showStartButton();  // Exibe o botão de start novamente
    gameRunning = false;
}

startButton.addEventListener('click', startGame);
