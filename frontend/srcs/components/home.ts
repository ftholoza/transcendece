import {clearPage} from "../utils/clear.js";
import {loadFontPressStart2P} from "./fonts.js";
import {generateLoginPage} from "./loggin.js";
import {createRegisterPage} from "./register.js";

export function createHomePage(): void {
	const body = document.body;
	// Assure-toi qu'il n'y a pas de retour à la ligne ou de whitespace indésirable ici
	body.className = 'bg-black text-white font-press-start text-center overflow-hidden';
	loadFontPressStart2P()

	// Navbar
	const navbar = document.createElement('div');
	navbar.classList.add('fixed', 'top-0', 'w-full', 'bg-[rgba(20,20,20,0.9)]', 'p-4', 'text-right');

	const leaderboardLink = document.createElement('a');
	leaderboardLink.href = '#';
	leaderboardLink.textContent = 'Leaderboard';
	leaderboardLink.classList.add('text-lime-500', 'hover:text-cyan-500', 'mx-4', 'transition-all');

	const aboutLink = document.createElement('a');
	aboutLink.href = '#';
	aboutLink.textContent = 'About';
	aboutLink.classList.add('text-lime-500', 'hover:text-cyan-500', 'mx-4', 'transition-all');

	navbar.appendChild(leaderboardLink);
	navbar.appendChild(aboutLink);
	body.appendChild(navbar);

	// Container
	const container = document.createElement('div');
	container.classList.add('absolute', 'top-1/2', 'left-1/2', 'transform', 'translate-x-[-50%]', 'translate-y-[-50%]');

	const h1 = document.createElement('h1');
	h1.textContent = 'TRANSCENDENCE';
	h1.classList.add('text-4xl', 'text-shadow-[0_0_10px_limegreen,_0_0_20px_cyan]', 'animate-pulse');

	const p = document.createElement('p');
	p.textContent = 'Enter the ultimate Pong battleground.';
	p.classList.add('text-lg', 'text-gray-400');

	const buttonContainer = document.createElement('div');
	buttonContainer.classList.add('mt-5');

	const loginBtn = document.createElement('button');
	loginBtn.id = 'loginBtn';
	loginBtn.textContent = 'Login';
	loginBtn.classList.add('bg-transparent', 'border-2', 'border-lime-500', 'px-8', 'py-4', 'text-lg', 'text-lime-500', 'rounded-xl', 'm-2', 'transition-all', 'hover:bg-lime-500', 'hover:text-black');

	const registerBtn = document.createElement('button');
	registerBtn.id = 'registerBtn';
	registerBtn.textContent = 'Register';
	registerBtn.classList.add('bg-transparent', 'border-2', 'border-lime-500', 'px-8', 'py-4', 'text-lg', 'text-lime-500', 'rounded-xl', 'm-2', 'transition-all', 'hover:bg-lime-500', 'hover:text-black');

	buttonContainer.appendChild(loginBtn);
	buttonContainer.appendChild(registerBtn);

	container.appendChild(h1);
	container.appendChild(p);
	container.appendChild(buttonContainer);
	body.appendChild(container);

	// Event listeners for buttons
	loginBtn.addEventListener('click', () => {
		clearPage();
		generateLoginPage();
	});

	registerBtn.addEventListener('click', () => {
		clearPage()
		createRegisterPage();
	});
}
