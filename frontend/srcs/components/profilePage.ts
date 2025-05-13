import { generateLoggedPage } from "./logged.js";
import {api} from "../services/api.js";
import { clearPage } from "../utils/clear.js";

export function createProfilePage() {
	// Clear existing page
	document.body.innerHTML = '';
	document.body.className = 'bg-gray-900 text-white min-h-screen m-0';
	const name = localStorage.getItem('username');
	if (name)
		api.getUserByUsername(name);
	else {
  		console.error("No username found in localStorage.");
	}
	const container = document.createElement('div');
	container.classList.add(
	  'flex', 'flex-col', 'items-center', 'justify-center', 'min-h-screen', 'bg-gray-900', 'text-white'
	)	
	const profileCard = document.createElement('div');
	profileCard.classList.add(
	  'bg-gray-800', 'p-8', 'rounded-2xl', 'shadow-lg', 'text-center', 'w-96'
	)	
	// Avatar
	const avatar = document.createElement('img');
	avatar.src = localStorage.getItem('avatar') || '/default-avatar.png';
	avatar.classList.add('w-32', 'h-32', 'mx-auto', 'rounded-full', 'border-4', 'border-green-500', 'object-cover');
	profileCard.appendChild(avatar)	
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.accept = 'image/*';
	fileInput.style.display = 'none';

	fileInput.addEventListener('change', async () => {
	const file = fileInput.files?.[0];
	if (!file) return;

	const username = localStorage.getItem('username');
	if (!username) return;

	const formData = new FormData();
	formData.append('avatar', file);

	const res = await fetch(`http://localhost:3000/api/users/avatar/${encodeURIComponent(username)}`, {
		method: 'PUT',
		body: formData
	});

	if (res.ok) {
		// Update avatar preview immediately
		const objectUrl = URL.createObjectURL(file);
		avatar.src = objectUrl;
		localStorage.setItem('avatar', objectUrl); // optional
	} else {

		alert('Failed to update avatar.');
	}
});

// Trigger file input when avatar is clicked
avatar.style.cursor = 'pointer';
avatar.title = 'Click to update avatar';
avatar.addEventListener('click', () => {
	fileInput.click();
});
	// Username
	const username = document.createElement('h2');
	username.textContent = localStorage.getItem('username') || 'Unknown User';
	username.classList.add('text-2xl', 'font-bold', 'mt-4');
	profileCard.appendChild(username)	
	// Email
	const email = document.createElement('p');
	email.textContent = localStorage.getItem('email') || 'No Email';
	email.classList.add('text-gray-400', 'mt-2');
	profileCard.appendChild(email)	
	// Exit button
	const exitBtn = document.createElement('button');
	exitBtn.textContent = 'Exit';
	exitBtn.classList.add('mt-6', 'px-4', 'py-2', 'bg-red-600', 'hover:bg-red-700', 'rounded-xl', 'transition-all');
	exitBtn.addEventListener('click', () => {
		clearPage();
		generateLoggedPage();
	});
	profileCard.appendChild(exitBtn)	
	container.appendChild(profileCard);
	document.body.appendChild(container);
}