import { generateLoggedPage } from "./logged.js";
import { endGameScreen } from "./endGame.js";

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

type Particle = {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  alpha: number;
};

const particles: Particle[] = [];

const keysPressed: Record<string, boolean> = {};

export function start_pong_game(maxPoint: number) {

  document.body.innerHTML = '';
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.width = '800px';
  container.style.height = '600px';
  container.style.margin = '0 auto'; // Center horizontally
  container.style.display = 'block';
  document.body.appendChild(container);

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = '10px solid white';
  canvas.style.backgroundColor = 'black';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Canvas not supported");

  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.width = 800;
  overlayCanvas.height = 600;
  overlayCanvas.style.position = 'absolute';
  overlayCanvas.style.top = '0';
  overlayCanvas.style.left = '0';
  overlayCanvas.style.pointerEvents = 'none'; // allow clicks to go through
  container.appendChild(overlayCanvas); 
  
  const overlayCtx = overlayCanvas.getContext('2d');
  if (!overlayCtx) throw new Error("Overlay canvas not supported");



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


  function explosionEffect(x: number, y: number, ctx: CanvasRenderingContext2D) {
    const particles: {
      x: number;
      y: number;
      dx: number;
      dy: number;
      alpha: number;
      radius: number;
    }[] = [];
  
    for (let i = 0; i < 20; i++) {
      particles.push({
        x,
        y,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        alpha: 1,
        radius: 3 + Math.random() * 2,
      });
    }
  
    function animate() {
      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.03;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 0, ${p.alpha})`;
        ctx.fill();
      });
  
      // Remove particles that are invisible
      const activeParticles = particles.filter(p => p.alpha > 0);
      if (activeParticles.length > 0) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      }
    }
  
    animate();
  }

  function resetPaddles()
  {
    leftPaddleY = 250;
    rightPaddleY = 250;
  }
  
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

  function render(ctx: CanvasRenderingContext2D, overlayCtx: CanvasRenderingContext2D) {
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
      ballSpeedX *= 1.1;
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
      ballSpeedY *= 1.1;
      ballSpeedX *= -1;
      const hitPoint = ballY - (rightPaddleY + PADDLE_HEIGHT / 2);
      const normalized = hitPoint / (PADDLE_HEIGHT / 2);
      ballSpeedY = normalized * 5;
      ballX = 770 - ballRadius;
    }

    if (ballX - ballRadius < 0) {
      explosionEffect(ballX, ballY, overlayCtx);
      rightScore++;
      resetBall();
      ballSpeedX = 4;
    }
    if (ballX + ballRadius > canvas.width) {
      explosionEffect(ballX, ballY, overlayCtx);
      leftScore++;
      resetBall();
      ballSpeedX = 4;
    }
    if (leftScore == maxPoint || rightScore == maxPoint)
    {
      gameRunning = false;
      if (leftScore == maxPoint)
        endGameScreen("left");
      else
        endGameScreen("right"); 
    }

    // Bounce off top and bottom
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
      ballSpeedY *= -1;
    }

    drawPaddles(ctx);
    drawBall(ctx);
    drawScore(ctx);
    if (gameRunning == true)
      requestAnimationFrame(() => render(ctx, overlayCtx));
    else
    {
      resetBall();
      resetPaddles();
      leftScore = 0;
      rightScore = 0;
    }
  }

  render(ctx, overlayCtx);
}