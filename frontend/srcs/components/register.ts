import {api} from "../services/api.js";
import { clearPage } from "../utils/clear.js";
import { generateLoginPage } from "./loggin.js";

export const createRegisterPage = () => {
	console.log("---create register called---")
	// Créer le body
	const body = document.body;
	body.classList.add('font-[Press_Start_2P]', 'bg-black', 'text-white', 'h-screen', 'flex', 'justify-center', 'items-center', 'overflow-hidden');

	// Créer le container
	const container = document.createElement('div');
	container.classList.add('bg-black', 'bg-opacity-80', 'p-8', 'rounded-lg', 'shadow-lg', 'max-w-sm', 'w-full', 'text-center');

	// Créer le titre
	const h2 = document.createElement('h2');
	h2.classList.add('text-2xl', 'mb-5', 'text-green-400', 'uppercase', 'tracking-widest', 'neon-glow');
	h2.textContent = 'Register';

	// Créer le formulaire
	const form = document.createElement('form');
	form.id = 'registerForm';

	// Créer les champs de saisie
	const usernameInput = document.createElement('input');
	usernameInput.type = 'text';
	usernameInput.id = 'username';
	usernameInput.placeholder = 'Username';
	usernameInput.required = true;
	usernameInput.classList.add('w-full', 'p-3', 'mb-4', 'rounded-lg', 'border-2', 'border-green-400', 'bg-gray-800', 'text-white', 'text-sm', 'uppercase', 'shadow-md', 'focus:border-pink-500', 'focus:shadow-pink-500', 'focus:outline-none');

	const emailInput = document.createElement('input');
	emailInput.type = 'email';
	emailInput.id = 'email';
	emailInput.placeholder = 'Email';
	emailInput.required = true;
	emailInput.classList.add('w-full', 'p-3', 'mb-4', 'rounded-lg', 'border-2', 'border-green-400', 'bg-gray-800', 'text-white', 'text-sm', 'uppercase', 'shadow-md', 'focus:border-pink-500', 'focus:shadow-pink-500', 'focus:outline-none');

	const passwordInput = document.createElement('input');
	passwordInput.type = 'password';
	passwordInput.id = 'password';
	passwordInput.placeholder = 'Password';
	passwordInput.required = true;
	passwordInput.classList.add('w-full', 'p-3', 'mb-4', 'rounded-lg', 'border-2', 'border-green-400', 'bg-gray-800', 'text-white', 'text-sm', 'uppercase', 'shadow-md', 'focus:border-pink-500', 'focus:shadow-pink-500', 'focus:outline-none');

	// Créer le bouton de soumission
	const submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.classList.add('w-full', 'p-3', 'bg-green-400', 'text-black', 'rounded-lg', 'text-lg', 'font-bold', 'uppercase', 'tracking-wider', 'mt-4', 'hover:bg-pink-500', 'hover:text-white', 'hover:shadow-pink-500', 'transition-all', 'ease-in-out');
	submitButton.textContent = 'Register';

	// Ajouter les champs au formulaire
	form.appendChild(usernameInput);
	form.appendChild(emailInput);
	form.appendChild(passwordInput);
	form.appendChild(submitButton);

	// Créer le footer
	const footer = document.createElement('div');
	footer.classList.add('mt-6', 'text-sm', 'text-green-400');
	const footerText = document.createElement('p');
	footerText.textContent = 'Already have an account? ';
	const footerLink = document.createElement('a');
	footerLink.href = 'login.html';
	footerLink.classList.add('text-pink-500', 'hover:underline');
	footerLink.textContent = 'Login here';
	footer.appendChild(footerText);
	footer.appendChild(footerLink);

	// Ajouter le titre, le formulaire, et le footer au container
	container.appendChild(h2);
	container.appendChild(form);
	container.appendChild(footer);

	// Ajouter le container au body
	body.appendChild(container);

	// Ajouter le body au document
	document.documentElement.appendChild(body);

	// Script de gestion de la soumission du formulaire
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const username = (document.getElementById('username') as HTMLInputElement).value;
		const email = (document.getElementById('email') as HTMLInputElement).value;
		const password = (document.getElementById('password') as HTMLInputElement).value;

		console.log(`Registering user: ${username}, Email: ${email}, Password: ${password}`);
		api.register(username, email, password);
	});

	footerLink.addEventListener('click', async (e) => {
  	e.preventDefault();
	clearPage();
  	await generateLoginPage();
});

}
