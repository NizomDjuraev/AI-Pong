
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 10;
const paddleWidth = 100;
const ballSize = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

let score = 0;
let aiEnabled = false;

function drawPaddle() {
    ctx.fillStyle = 'black';
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.fillStyle = 'black';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function drawScore() {
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, canvas.width - 120, 30);
}

function drawBorders() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#333';
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0 || ballX + ballSize > canvas.width) {
    ballSpeedX = -ballSpeedX;
    }

    if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
    }

    if (ballY + ballSize > canvas.height - paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth) {
    ballSpeedY = -ballSpeedY;
    score++;
    }

    if (ballY > canvas.height) {
    score = 0;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    }
}

function movePaddle() {
    const speed = 20;
    if (aiEnabled) {
    if (ballX < paddleX + paddleWidth / 2 && paddleX > 0) {
        paddleX -= speed;
    } else if (ballX > paddleX + paddleWidth / 2 && paddleX + paddleWidth < canvas.width) {
        paddleX += speed;
    }
    }
}

function handleKeyPress(e) {
    const speed = 20;
    if (!aiEnabled) {
    if (e.keyCode === 37 && paddleX > 0) {
        paddleX -= speed;
    } else if (e.keyCode === 39 && paddleX + paddleWidth < canvas.width) {
        paddleX += speed;
    }
    }
}
function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();
    drawScore();
    drawBorders();

    moveBall();
    movePaddle();
}

function toggleAI() {
    aiEnabled = !aiEnabled;
}

document.getElementById('toggleAI').addEventListener('click', toggleAI);
document.addEventListener('keydown', handleKeyPress);
setInterval(draw, 1000 / 60);
