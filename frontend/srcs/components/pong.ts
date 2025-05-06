import { generateLoggedPage } from "./logged.js";


const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;

let leftPaddleY = 250;
let rightPaddleY = 250;

let leftScore = 0;
let rightScore = 0;

let ballX = 400;
let ballY = 300;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 3;

const keysPressed: Record<string, boolean> = {};

export function start_pong_game() {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  document.body.innerHTML = '';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Canvas not supported");

  // --- Keyboard Input ---
  window.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;
  });

  const exitButton = document.createElement('button');
  exitButton.textContent = 'Exit';
  exitButton.style.position = 'absolute';
  exitButton.style.top = '20px';
  exitButton.style.right = '20px';
  exitButton.style.padding = '10px 20px';
  exitButton.style.fontSize = '16px';
  exitButton.style.zIndex = '1';
  document.body.appendChild(exitButton);

  let gameRunning = true;

  exitButton.addEventListener('click', () => {
    gameRunning = false;
    document.body.innerHTML = '';
    generateLoggedPage();
  });
    

  window.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
  });


  
  function drawPaddles(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.fillRect(20, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(770, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
  }

  function drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }

  function updatePaddles() {
    // Left paddle (W/S)
    if (keysPressed['w'] && leftPaddleY > 0) {
      leftPaddleY -= PADDLE_SPEED;
    }
    if (keysPressed['s'] && leftPaddleY < canvas.height - PADDLE_HEIGHT) {
      leftPaddleY += PADDLE_SPEED;
    }

    // Right paddle (ArrowUp/ArrowDown)
    if (keysPressed['ArrowUp'] && rightPaddleY > 0) {
      rightPaddleY -= PADDLE_SPEED;
    }
    if (keysPressed['ArrowDown'] && rightPaddleY < canvas.height - PADDLE_HEIGHT) {
      rightPaddleY += PADDLE_SPEED;
    }
  }

  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1; // change direction
  }

  function drawScore(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.font = '32px Arial';
    ctx.fillText(`${leftScore}`, canvas.width / 4, 50);
    ctx.fillText(`${rightScore}`, 3 * canvas.width / 4, 50);
  }

  function render(ctx: CanvasRenderingContext2D) {
    // Clear screen
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update game state
    updatePaddles();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (
      ballX - ballRadius <= 20 + PADDLE_WIDTH &&
      ballY >= leftPaddleY &&
      ballY <= leftPaddleY + PADDLE_HEIGHT
    ) {
      ballSpeedX *= -1;
      const hitPoint = ballY - (leftPaddleY + PADDLE_HEIGHT / 2);
      const normalized = hitPoint / (PADDLE_HEIGHT / 2);
      ballSpeedY = normalized * 5;
      ballX = 20 + PADDLE_WIDTH + ballRadius;
    }
    
    // Collision with right paddle
    if (
      ballX + ballRadius >= 770 &&
      ballY >= rightPaddleY &&
      ballY <= rightPaddleY + PADDLE_HEIGHT
    ) {
      ballSpeedX *= -1;
      const hitPoint = ballY - (rightPaddleY + PADDLE_HEIGHT / 2);
      const normalized = hitPoint / (PADDLE_HEIGHT / 2);
      ballSpeedY = normalized * 5;
      ballX = 770 - ballRadius;
    }

    if (ballX - ballRadius < 0) {
      rightScore++;
      resetBall();
    }
    if (ballX + ballRadius > canvas.width) {
      leftScore++;
      resetBall();
    }

    // Bounce off top and bottom
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
      ballSpeedY *= -1;
    }

    drawPaddles(ctx);
    drawBall(ctx);
    drawScore(ctx);
    if (gameRunning == true)
      requestAnimationFrame(() => render(ctx));
    else
    {
      resetBall();
      drawPaddles(ctx);
      drawBall(ctx);
      leftScore = 0;
      rightScore = 0;
    }
  }

  render(ctx);
}