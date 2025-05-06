import { start_pong_game } from "./pong.js";

export function generateLoggedPage(): void {
	// Création du body
	console.log("generateLoggedPage called");
	const body = document.body;
	body.classList.add('bg-black', 'text-white', 'font-mono', 'flex', 'justify-center', 'items-center', 'h-screen', 'relative');

	// Ajout d'un fond d'écran avec animation
	const background = document.createElement('div');
	background.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-[url("https://www.transparenttextures.com/patterns/black-linen.png")]', 'bg-cover', 'opacity-15', 'animate-[shimmer_8s_infinite_linear]', 'z-[-1]');
	body.appendChild(background);

	// Création de la navbar
	const navbar = document.createElement('div');
	navbar.classList.add('absolute', 'top-10', 'left-1/2', 'transform', '-translate-x-1/2', 'flex', 'space-x-8', 'bg-black', 'bg-opacity-60', 'p-4', 'rounded-lg', 'shadow-lg');
	body.appendChild(navbar);

	// Ajout des éléments de la navbar
	['Home', 'Game', 'Profile', 'Settings'].forEach((text) => {
		const link = document.createElement('a');
		link.classList.add('text-lg', 'text-green-500', 'hover:text-red-500');
		link.textContent = text;
		navbar.appendChild(link);
	});

	// Titre principal
	const title = document.createElement('h1');
	title.classList.add('text-6xl', 'text-green-500', 'text-shadow-glow', 'mb-12', 'uppercase', 'font-extrabold', 'animate-[glow_1.5s_infinite_alternate]');
	title.textContent = 'Transcendence';
	body.appendChild(title);

	// Menu du jeu
	const gameMenu = document.createElement('div');
	gameMenu.classList.add('flex', 'flex-col', 'items-center', 'gap-6');
	body.appendChild(gameMenu);

	['Start Game', 'Profile', 'Settings'].forEach((text) => {
		const button = document.createElement('button');
		button.classList.add('bg-green-500', 'text-black', 'py-4', 'px-10', 'text-2xl', 'rounded-lg', 'transform', 'transition', 'duration-300', 'ease-in-out', 'hover:scale-110', 'focus:outline-none', 'focus:ring-4', 'focus:ring-green-300');
		button.textContent = text;
		gameMenu.appendChild(button);

		if (text == 'Start Game') {
			console.log('Button created');
			button.addEventListener('click', () => {
				console.log('Start Game button clicked');
				start_pong_game();
			});
		}
	});

	// Footer
	const footer = document.createElement('div');
	footer.classList.add('absolute', 'bottom-10', 'text-green-500', 'text-sm');
	footer.textContent = '© 2025 Transcendence. All rights reserved.';
	body.appendChild(footer);

	// Canvas pour le jeu Pong
	const canvas = document.createElement('canvas');
	canvas.id = 'pongCanvas';
	canvas.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'z-[-2]');
	body.appendChild(canvas);

	// Initialisation du jeu Pong
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.classList.add('pointer-events-none');


	const paddleWidth = 10;
	const paddleHeight = 100;
	let paddleY = canvas.height / 2 - paddleHeight / 2;
	let paddleSpeed = 0;
	const paddle = { x: 30, y: paddleY, width: paddleWidth, height: paddleHeight, color: '#39FF14' };
	const opponentPaddle = { x: canvas.width - 40, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: '#FF5733' };
	const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, speedX: 4, speedY: 4, color: '#39FF14' };

	function drawPaddle(x: number, y: number, width: number, height: number, color: string): void {
		if (!ctx) return;
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}

	function drawBall(x: number, y: number, radius: number, color: string): void {
		if (!ctx) return;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	}

	function movePaddle(): void {
		paddle.y += paddleSpeed;
		if (paddle.y < 0) paddle.y = 0;
		if (paddle.y + paddle.height > canvas.height) paddle.y = canvas.height - paddle.height;
	}

	function moveOpponentPaddle(): void {
		if (ball.y < opponentPaddle.y + opponentPaddle.height / 2) {
			opponentPaddle.y -= 4;
		} else {
			opponentPaddle.y += 4;
		}

		if (opponentPaddle.y < 0) opponentPaddle.y = 0;
		if (opponentPaddle.y + opponentPaddle.height > canvas.height) opponentPaddle.y = canvas.height - opponentPaddle.height;
	}

	function moveBall(): void {
		ball.x += ball.speedX;
		ball.y += ball.speedY;

		if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
			ball.speedY = -ball.speedY;
		}

		if (ball.x - ball.radius < paddle.x + paddle.width && ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
			ball.speedX = -ball.speedX;
		}

		if (ball.x + ball.radius > opponentPaddle.x && ball.y > opponentPaddle.y && ball.y < opponentPaddle.y + opponentPaddle.height) {
			ball.speedX = -ball.speedX;
		}

		if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
			ball.x = canvas.width / 2;
			ball.y = canvas.height / 2;
			ball.speedX = -ball.speedX;
			ball.speedY = 4;
		}
	}

	function draw(): void {
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawPaddle(paddle.x, paddle.y, paddle.width, paddle.height, paddle.color);
		drawPaddle(opponentPaddle.x, opponentPaddle.y, opponentPaddle.width, opponentPaddle.height, opponentPaddle.color);
		drawBall(ball.x, ball.y, ball.radius, ball.color);
		movePaddle();
		moveOpponentPaddle();
		moveBall();
	}

	window.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowUp') paddleSpeed = -8;
		if (event.key === 'ArrowDown') paddleSpeed = 8;
	});

	window.addEventListener('keyup', () => {
		paddleSpeed = 0;
	});

	function gameLoop(): void {
		draw();
		requestAnimationFrame(gameLoop);
	}

	gameLoop();
}
