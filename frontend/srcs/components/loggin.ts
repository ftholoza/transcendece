import {api} from "../services/api.js";

export const generateLoginPage = () : void => {
	// Créer le conteneur de la page
	const body = document.body;
	body.classList.add('bg-black', 'text-white', 'flex', 'justify-center', 'items-center', 'h-screen', 'overflow-hidden', 'relative');

	// Créer la div de login
	const loginContainer = document.createElement('div');
	loginContainer.classList.add(
		'bg-[#111]',
		'p-12',
		'rounded-3xl',  // Coins arrondis plus marqués
		'shadow-xl',
		'w-[350px]',  // Ajustement de la largeur pour plus de fluidité
		'flex',
		'flex-col',
		'items-center',
		'justify-center',
		'h-[500px]',  // Hauteur ajustée pour plus d'espace
		'transition-transform', 'transform', 'hover:scale-105' // Animation de zoom au survol
	);

	// Créer le titre avec effet néon
	const title = document.createElement('h2');
	title.classList.add(
		'text-4xl',  // Augmentation de la taille
		'text-green-500',
		'font-[PressStart2P]',
		'text-shadow-[0_0_10px_#00ff00,_0_0_20px_#00ff00,_0_0_30px_#00ff00]',
		'text-center',
		'mb-6'  // Espacement sous le titre
	);
	title.textContent = 'Login to Transcendence';
	loginContainer.appendChild(title);

	// Créer le formulaire
	const form = document.createElement('form');
	form.id = 'login-form';
	form.classList.add('w-full');  // Assurer que le formulaire prend toute la largeur du conteneur

	// Créer les champs username et password
	const usernameInput = document.createElement('input');
	usernameInput.type = 'text';
	usernameInput.id = 'username';
	usernameInput.placeholder = 'Username';
	usernameInput.classList.add(
		'w-full',
		'p-4',  // Plus de padding pour l'espace autour du texte
		'mb-5',  // Plus d'espace entre les champs
		'border',
		'border-green-500',
		'bg-transparent',
		'text-white',
		'font-medium',
		'rounded-lg', // Coins arrondis
		'focus:outline-none',
		'focus:ring-2',
		'focus:ring-green-500', // Effet de focus vert
		'transition-all',
		'duration-300'
	);

	const passwordInput = document.createElement('input');
	passwordInput.type = 'password';
	passwordInput.id = 'password';
	passwordInput.placeholder = 'Password';
	passwordInput.classList.add(
		'w-full',
		'p-4',
		'mb-5',
		'border',
		'border-green-500',
		'bg-transparent',
		'text-white',
		'font-medium',
		'rounded-lg',
		'focus:outline-none',
		'focus:ring-2',
		'focus:ring-green-500',
		'transition-all',
		'duration-300'
	);

	const submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.textContent = 'Login';
	submitButton.classList.add(
		'w-full',
		'p-4',
		'bg-green-500',
		'text-white',
		'font-medium',
		'rounded-lg',
		'cursor-pointer',
		'transition-all',
		'duration-300',
		'hover:bg-green-400',  // Couleur plus claire au survol
		'focus:outline-none',
		'focus:ring-4',
		'focus:ring-green-500',
		'focus:ring-opacity-50'
	);

	// Ajouter les champs et le bouton au formulaire
	form.appendChild(usernameInput);
	form.appendChild(passwordInput);
	form.appendChild(submitButton);

	// Créer le lien pour l'inscription
	const registerLink = document.createElement('a');
	registerLink.href = 'register.html';
	registerLink.textContent = "Don't have an account? Register here";
	registerLink.classList.add(
		'text-green-500',
		'text-sm',
		'mt-6',
		'inline-block',
		'hover:underline',
		'transition-all',
		'duration-300',
		'hover:text-green-400'
	);

	const errorField = document.createElement('p');
	errorField.id = 'error-field';
	errorField.textContent = '';

	// Ajouter le formulaire et le lien au conteneur
	loginContainer.appendChild(errorField);
	loginContainer.appendChild(form);
	loginContainer.appendChild(registerLink);

	// Ajouter le conteneur au body
	body.appendChild(loginContainer);

	// Gestion de l'envoi du formulaire
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const username = document.getElementById('username') as HTMLInputElement;
		const password = document.getElementById('password') as HTMLInputElement;

		api.login(username.value, password.value);
	});
}
