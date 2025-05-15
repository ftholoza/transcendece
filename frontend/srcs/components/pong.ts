import { generateLoggedPage } from "./logged.js";
import { endGameScreen } from "./endGame.js";

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;

type GameState = {
  leftPaddleY: number;
  rightPaddleY: number;
  leftScore: number;
  rightScore: number;
  ballX: number;
  ballY: number;
  ballRadius: number;
  ballSpeedX: number;
  ballSpeedY: number;
  keysPressed: Record<string, boolean>;
  waitingForCount: boolean;
  maxPoint: number;
  gamestatus: boolean;
};

function resetGameState(gameState: GameState) {
  gameState.leftPaddleY = 250;
  gameState.rightPaddleY = 250;
  gameState.leftScore = 0;
  gameState.rightScore = 0;
  gameState.ballX = 400;
  gameState.ballY = 300;
  gameState.ballSpeedX = 4;
  gameState.ballSpeedY = 3;
  gameState.waitingForCount = false;
  gameState.gamestatus = false;

  for (const key in gameState.keysPressed) {
    gameState.keysPressed[key] = false;
  }
}

function resetPaddles(gameState: GameState) {
  gameState.leftPaddleY = 250;
  gameState.rightPaddleY = 250;
}

  
function drawPaddles(ctx: CanvasRenderingContext2D, gameState: GameState) {
  ctx.fillStyle = 'white';
  ctx.fillRect(20, gameState.leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(770, gameState.rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawBall(ctx: CanvasRenderingContext2D, gameState: GameState) {
  ctx.beginPath();
  ctx.arc(gameState.ballX, gameState.ballY, gameState.ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}


function updatePaddles(keysPressed: Record<string, boolean>, gameState: GameState, canvasHeight: number) {
  if (keysPressed['w'] && gameState.leftPaddleY > 0) {
    gameState.leftPaddleY -= PADDLE_SPEED;
  }
  if (keysPressed['s'] && gameState.leftPaddleY < canvasHeight - PADDLE_HEIGHT) {
    gameState.leftPaddleY += PADDLE_SPEED;
  }
  if (keysPressed['ArrowUp'] && gameState.rightPaddleY > 0) {
    gameState.rightPaddleY -= PADDLE_SPEED;
  }
  if (keysPressed['ArrowDown'] && gameState.rightPaddleY < canvasHeight - PADDLE_HEIGHT) {
    gameState.rightPaddleY += PADDLE_SPEED;
  }
}

function resetBall(gameState: GameState, canvasWidth: number, canvasHeight: number) {
  gameState.ballX = canvasWidth / 2;
  gameState.ballY = canvasHeight / 2;
  gameState.ballSpeedX = -4;
  gameState.ballSpeedY = 4;
}


function drawScoreAndNames(
  ctx: CanvasRenderingContext2D,
  gameState: GameState,
  leftName: string,
  rightName: string
) {
  ctx.fillStyle = 'white';
  ctx.font = '32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  ctx.fillText(`${gameState.leftScore}`, ctx.canvas.width / 4, 50);
  ctx.fillText(`${gameState.rightScore}`, 3 * ctx.canvas.width / 4, 50);

  ctx.font = '20px Arial';
  ctx.textBaseline = 'bottom';
  ctx.fillText(leftName, ctx.canvas.width / 4, 48);
  ctx.fillText(rightName, 3 * ctx.canvas.width / 4, 48);
}

function wait(ms: number): Promise<void> 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startNewRound(
  overlayCtx: CanvasRenderingContext2D,
  gameState: GameState,
  leftName: string,
  rightName: string,
  canvasWidth: number,
  canvasHeight: number
) {
  const countdownNumbers = ["3", "2", "1"];
  resetBall(gameState, canvasWidth, canvasHeight);
  resetPaddles(gameState);
  gameState.waitingForCount = true;

  for (const number of countdownNumbers) {
    overlayCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawPaddles(overlayCtx, gameState);
    drawScoreAndNames(overlayCtx, gameState, leftName, rightName);
    overlayCtx.fillStyle = "white";
    overlayCtx.font = "80px Arial";
    overlayCtx.textAlign = "center";
    overlayCtx.textBaseline = "middle";
    overlayCtx.fillText(number, canvasWidth / 2, canvasHeight / 2);

    await wait(500);
  }

  overlayCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  gameState.waitingForCount = false;
}

function render(
  ctx: CanvasRenderingContext2D,
  overlayCtx: CanvasRenderingContext2D,
  gameState: GameState,
  canvas: HTMLCanvasElement,
  player1: string,
  player2: string,
  maxPoint: number,
  resolve: (winner: string) => void
): void {
  if (gameState.waitingForCount) {
    requestAnimationFrame(() =>
      render(ctx, overlayCtx, gameState, canvas, player1, player2, maxPoint, resolve)
    );
    return;
  }

  if (gameState.gamestatus == false)
    return ;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  updatePaddles(gameState.keysPressed, gameState, canvas.height);

  gameState.ballX += gameState.ballSpeedX;
  gameState.ballY += gameState.ballSpeedY;

  // Paddle collisions
  if (
    gameState.ballX - gameState.ballRadius <= 20 + PADDLE_WIDTH &&
    gameState.ballY >= gameState.leftPaddleY &&
    gameState.ballY <= gameState.leftPaddleY + PADDLE_HEIGHT
  ) {
    gameState.ballSpeedX *= -1.1;
    gameState.ballSpeedY *= 1.1;
    const hitPoint = gameState.ballY - (gameState.leftPaddleY + PADDLE_HEIGHT / 2);
    gameState.ballSpeedY = (hitPoint / (PADDLE_HEIGHT / 2)) * 5;
    gameState.ballX = 20 + PADDLE_WIDTH + gameState.ballRadius;
  }

  if (
    gameState.ballX + gameState.ballRadius >= 770 &&
    gameState.ballY >= gameState.rightPaddleY &&
    gameState.ballY <= gameState.rightPaddleY + PADDLE_HEIGHT
  ) {
    gameState.ballSpeedX *= -1.1;
    gameState.ballSpeedY *= 1.1;
    const hitPoint = gameState.ballY - (gameState.rightPaddleY + PADDLE_HEIGHT / 2);
    gameState.ballSpeedY = (hitPoint / (PADDLE_HEIGHT / 2)) * 5;
    gameState.ballX = 770 - gameState.ballRadius;
  }

  // Scoring
  if (gameState.ballX - gameState.ballRadius < 0) {
    gameState.rightScore++;
    if (gameState.rightScore < maxPoint) {
      startNewRound(overlayCtx, gameState, player1, player2, canvas.width, canvas.height);
    }
  }

  if (gameState.ballX + gameState.ballRadius > canvas.width) {
    gameState.leftScore++;
    if (gameState.leftScore < maxPoint) {
      startNewRound(overlayCtx, gameState, player1, player2, canvas.width, canvas.height);
    }
  }

  // End condition
  if (gameState.leftScore === maxPoint || gameState.rightScore === maxPoint) {
    const winner = gameState.leftScore === maxPoint ? player1 : player2;
    endGameScreen(winner);
    resetGameState(gameState);
    resolve(winner);
    return;
  }

  if (
    gameState.ballY - gameState.ballRadius < 0 ||
    gameState.ballY + gameState.ballRadius > canvas.height
  ) {
    gameState.ballSpeedY *= -1;
  }

  drawPaddles(ctx, gameState);
  drawBall(ctx, gameState);
  drawScoreAndNames(ctx, gameState, player1, player2);

  requestAnimationFrame(() =>
    render(ctx, overlayCtx, gameState, canvas, player1, player2, maxPoint, resolve)
  );
}


export async function start_pong_game(
  maxPoint: number,
  player1: string,
  player2: string
): Promise<string> {
  const gameState: GameState = {
    leftPaddleY: 250,
    rightPaddleY: 250,
    leftScore: 0,
    rightScore: 0,
    ballX: 400,
    ballY: 300,
    ballRadius: 10,
    ballSpeedX: 4,
    ballSpeedY: 3,
    waitingForCount: false,
    keysPressed: {},
    maxPoint: maxPoint,
    gamestatus: false,
  };

  resetGameState(gameState);
  gameState.gamestatus = true;
  document.body.innerHTML = '';

  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.width = '820px';
  container.style.height = '620px';
  container.style.margin = '0 auto';
  container.style.display = 'block';
  container.style.zIndex = '0';
  container.style.border = '10px solid white';
  document.body.appendChild(container);

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = 'none';
  canvas.style.position = 'absolute';
  canvas.style.backgroundColor = 'black';
  canvas.style.display = 'block';
  canvas.style.zIndex = '1';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Canvas not supported");

  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.width = 800;
  overlayCanvas.height = 600;
  overlayCanvas.style.position = 'absolute';
  overlayCanvas.style.top = '0';
  overlayCanvas.style.left = '0';
  overlayCanvas.style.pointerEvents = 'none';
  overlayCanvas.style.zIndex = '2';
  overlayCanvas.style.backgroundColor = 'transparent';
  container.appendChild(overlayCanvas); 

  const overlayCtx = overlayCanvas.getContext('2d');
  if (!overlayCtx) throw new Error("Overlay canvas not supported");

  window.addEventListener('keydown', (e) => {
    gameState.keysPressed[e.key] = true;
  });

  window.addEventListener('keyup', (e) => {
    gameState.keysPressed[e.key] = false;
  });

  return new Promise<string>((resolve) => {
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.style.position = 'absolute';
    exitButton.style.top = '20px';
    exitButton.style.right = '20px';
    exitButton.style.padding = '10px 20px';
    exitButton.style.fontSize = '16px';
    exitButton.style.zIndex = '1';
    document.body.appendChild(exitButton);

    exitButton.addEventListener('click', () => {
      gameState.waitingForCount = false;
      document.body.innerHTML = '';
      generateLoggedPage();
      gameState.gamestatus = false;
      resolve("EXIT");
    });

    render(ctx, overlayCtx, gameState, canvas, player1, player2, maxPoint, resolve);
  });
}