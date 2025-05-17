import {api} from "../services/api.js";
import { clearPage } from "../utils/clear.js";
import { createRegisterPage } from "./register.js";
import { config, initializeConfig } from "../config/auth.js";

declare global {
    interface Window {
        handleGoogleSignIn: (response: any) => void;
        google: any;
    }
}

export const generateLoginPage = async () : Promise<void> => {
	console.log("Initializing login page...");

	// Initialize config first
	await initializeConfig();

	// Créer le conteneur de la page
	const body = document.body;
	body.classList.add('bg-black', 'text-white', 'flex', 'justify-center', 'items-center', 'h-screen', 'overflow-hidden', 'relative');

	// Créer la div de login
	const loginContainer = document.createElement('div');
	loginContainer.classList.add(
		'bg-[#111]',
		'p-12',
		'rounded-3xl',
		'shadow-xl',
		'w-[350px]',
		'flex',
		'flex-col',
		'items-center',
		'justify-center',
		'h-[600px]',
		'transition-transform', 'transform', 'hover:scale-105'
	);

	// Créer le titre avec effet néon
	const title = document.createElement('h2');;
	title.classList.add('text-2xl', 'mb-5', 'text-green-400', 'uppercase', 'tracking-widest', 'neon-glow');
	title.textContent = 'Login';
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

	// Add divider
	const divider = document.createElement('div');
	divider.classList.add('flex', 'items-center', 'my-4', 'w-full');

	const line1 = document.createElement('div');
	line1.classList.add('flex-1', 'h-px', 'bg-green-500');

	const orText = document.createElement('div');
	orText.classList.add('mx-4', 'text-green-500', 'text-sm');
	orText.textContent = 'OR';

	const line2 = document.createElement('div');
	line2.classList.add('flex-1', 'h-px', 'bg-green-500');

	divider.appendChild(line1);
	divider.appendChild(orText);
	divider.appendChild(line2);

	// Add Google Sign-In container
	const googleContainer = document.createElement('div');
	googleContainer.classList.add('w-full', 'flex', 'justify-center', 'mt-4');

	// Create a wrapper for Google Sign-In
	const googleWrapper = document.createElement('div');
	googleWrapper.classList.add('google-signin-wrapper');
	googleWrapper.style.width = '100%';
	googleWrapper.style.display = 'flex';
	googleWrapper.style.justifyContent = 'center';
	googleWrapper.style.marginTop = '20px';

	// Add Google Sign-In button div
	const googleDiv = document.createElement('div');
	googleDiv.id = 'g_id_onload';
	googleDiv.setAttribute('data-client_id', config.GOOGLE_CLIENT_ID);
	googleDiv.setAttribute('data-callback', 'handleGoogleSignIn');
	googleDiv.setAttribute('data-auto_prompt', 'false');

	const googleSignInDiv = document.createElement('div');
	googleSignInDiv.classList.add('g_id_signin');
	googleSignInDiv.setAttribute('data-type', 'standard');
	googleSignInDiv.setAttribute('data-size', 'large');
	googleSignInDiv.setAttribute('data-theme', 'outline');
	googleSignInDiv.setAttribute('data-text', 'sign_in_with');
	googleSignInDiv.setAttribute('data-shape', 'rectangular');
	googleSignInDiv.setAttribute('data-logo_alignment', 'left');
	googleSignInDiv.setAttribute('data-width', '280');

	googleWrapper.appendChild(googleDiv);
	googleWrapper.appendChild(googleSignInDiv);
	googleContainer.appendChild(googleWrapper);

	// Créer le lien pour l'inscription
	const registerButton = document.createElement('button');
	registerButton.textContent = "Don't have an account? Register here";
	registerButton.classList.add(
	  'text-green-500',
	  'text-sm',
	  'mt-6',
	  'hover:underline',
	  'transition-all',
	  'duration-300',
	  'hover:text-green-400',
	  'cursor-pointer',
	  'bg-transparent',
	  'border-none'
	);

	registerButton.addEventListener('click', (e) => {
	  e.preventDefault();
	  clearPage();
	  createRegisterPage();
	});

  const errorField = document.createElement('p');
	errorField.id = 'error-field';
	errorField.textContent = '';

	// Update the order of elements
	loginContainer.appendChild(errorField);
	loginContainer.appendChild(form);
	loginContainer.appendChild(divider);
	loginContainer.appendChild(googleContainer);
	loginContainer.appendChild(registerButton);

	// Ajouter le conteneur au body
	body.appendChild(loginContainer);

	// Add form submit handler
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const username = document.getElementById('username') as HTMLInputElement;
		const password = document.getElementById('password') as HTMLInputElement;
		localStorage.setItem('username', username.value);
		api.login(username.value, password.value);
	});

	// Set up Google Sign-In handler
	window.handleGoogleSignIn = (response: any) => {
		console.log("Google Sign-In response received:", response);
		api.googleLogin(response);
	};

	// Load Google Sign-In script
	console.log("Loading Google Sign-In script with Client ID:", config.GOOGLE_CLIENT_ID);
	const script = document.createElement('script');
	script.src = 'https://accounts.google.com/gsi/client';
	script.async = true;
	script.defer = true;
	script.onload = () => {
		console.log("Google Sign-In script loaded successfully");
	};
	script.onerror = (error) => {
		console.error("Error loading Google Sign-In script:", error);
	};
	document.head.appendChild(script);
}
