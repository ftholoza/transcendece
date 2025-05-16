import { start_pong_game } from "./pong.js";
import { showStartMenu } from "./startMenu.js";
import { createProfilePage } from "./profilePage.js";
import { clearPage } from "../utils/clear.js";
import { generateLoginPage } from "./loggin.js";
import { generateTournament } from "./tournament.js";
import { api } from "../services/api.js";

export function generateLoggedPage(): void {
	document.body.innerHTML = ''; // clear everything
	document.body.className = ''; // reset all classes
	document.body.removeAttribute('style');
	console.log("generateLoggedPage called");
	const body = document.body;
	body.classList.add('bg-black', 'text-white', 'font-mono', 'flex', 'justify-center', 'items-center', 'h-screen', 'relative');

	const background = document.createElement('div');
	background.classList.add(
		'absolute', 'top-0', 'left-0', 'w-full', 'h-full',
		'bg-[url("https://www.transparenttextures.com/patterns/black-linen.png")]',
		'bg-cover', 'opacity-15',
		'animate-[shimmer_8s_infinite_linear]', 'z-[-1]'
	);	body.appendChild(background);

	const navbar = document.createElement('div');
	navbar.classList.add('absolute', 'top-10', 'left-1/2', 'transform', '-translate-x-1/2', 'flex', 'space-x-8', 'bg-black', 'bg-opacity-60', 'p-4', 'rounded-lg', 'shadow-lg');
	body.appendChild(navbar);

	['Home', 'Game', 'Profile', 'Settings', 'Disconnect'].forEach((text) => {
		const link = document.createElement('a');
		link.classList.add('text-lg', 'text-green-500', 'hover:text-red-500');
		link.textContent = text;
			link.addEventListener('click', () => {
		switch (text) {
			case 'Disconnect':
				api.disconnect();
				break;
		}
	});
		navbar.appendChild(link);
	});

	// Titre principal
	const container = document.createElement('div');
	container.style.display = 'flex';
	container.style.flexDirection = 'column';
	container.style.alignItems = 'center';
	container.style.justifyContent = 'center';
	container.style.height = '100vh';
	container.style.textAlign = 'center';
	document.body.appendChild(container);
  
	// Title
	const title = document.createElement('h1');
	title.textContent = 'TRANSCENDENCE';
	title.style.fontFamily = '"Press Start 2P", monospace';
	title.style.fontSize = '32px'; // smaller is better for pixel font
	title.style.color = '#00ff00';
	title.style.textShadow = '0 0 10px #00ff00';
	title.style.marginBottom = '20px';
	container.appendChild(title);
  
	// Game menu buttons
	const gameMenu = document.createElement('div');
	gameMenu.style.display = 'flex';
	gameMenu.style.flexDirection = 'column';
	gameMenu.style.marginTop = '30px';
	gameMenu.style.gap = '15px';
	container.appendChild(gameMenu);
  
	['Start Game', 'Tournament', 'Profile', 'Settings'].forEach((text) => {
	  const button = document.createElement('button');
	  button.classList.add(
		'bg-green-500',
		'text-black',
		'py-4',
		'px-10',
		'text-2xl',
		'rounded-lg',
		'transform',
		'transition',
		'duration-300',
		'ease-in-out',
		'hover:scale-110',
		'focus:outline-none',
		'focus:ring-4',
		'focus:ring-green-300'
	  );
	  button.textContent = text;
	  gameMenu.appendChild(button);
  
	  if (text === 'Start Game') {
		button.addEventListener('click', () => {
		  console.log('Start Game clicked');
		  showStartMenu();
		});
	  }
	  if (text === 'Profile') {
		button.addEventListener('click', () => {
		  createProfilePage();
		});
	  }
	  if (text === 'Settings') {
		button.addEventListener('click', () => {
		  console.log('Settings clicked');
		  // Add action
		});
	  }
	  if (text === 'Tournament') {
		button.addEventListener('click', () => {
		  console.log('Settings clicked');
		  clearPage();
		  generateTournament();
		});
		}
	});

	// Footer
	const footer = document.createElement('div');
	footer.classList.add('absolute', 'bottom-10', 'text-green-500', 'text-sm');
	footer.textContent = '© 2025 Transcendence. All rights reserved.';
	body.appendChild(footer);

}
