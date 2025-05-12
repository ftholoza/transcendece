import { generateLoggedPage } from "./logged.js";
import {api} from "../services/api.js";
import { clearPage } from "../utils/clear.js";

export function createProfilePage(user = { username: 'Player1', email: 'player@example.com', avatar: '' }) {
	const body = document.body;
	if (!body) return;
	body.innerHTML = ''; // Clear page

	const container = document.createElement('div');
	container.classList.add('flex', 'flex-col', 'items-center', 'p-8', 'text-white');

	// Profile picture
	const img = document.createElement('img');
	img.src = user.avatar || 'https://via.placeholder.com/150';
	img.classList.add('w-36', 'h-36', 'rounded-full', 'border-4', 'border-green-500', 'object-cover', 'mb-4');

	// File input
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.accept = 'image/*';
	fileInput.classList.add('mb-6');
	fileInput.addEventListener('change', () => {
		const file = fileInput.files?.[0];
		if (file) {
			img.src = URL.createObjectURL(file);
			// Save image to backend if needed here
		}
	});

	// Username
	const usernameLabel = document.createElement('label');
	usernameLabel.textContent = 'Username:';
	const usernameInput = document.createElement('input');
	usernameInput.value = user.username;
	usernameInput.classList.add('mb-4', 'p-2', 'text-black');

	// Email
	const emailLabel = document.createElement('label');
	emailLabel.textContent = 'Email:';
	const emailInput = document.createElement('input');
	emailInput.value = user.email;
	emailInput.classList.add('mb-4', 'p-2', 'text-black');

	// Update button
	const updateBtn = document.createElement('button');
	updateBtn.textContent = 'Update Profile';
	updateBtn.classList.add('bg-green-500', 'hover:bg-green-600', 'text-white', 'px-4', 'py-2', 'rounded');
	updateBtn.addEventListener('click', () => {
		console.log('Updated info:', {
			username: usernameInput.value,
			email: emailInput.value
		});

  const exitBtn = document.createElement('button');
	exitBtn.textContent = 'Exit';
	exitBtn.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white', 'px-4', 'py-2', 'rounded');
	exitBtn.addEventListener('click', () => {
		clearPage();
		generateLoggedPage(); // Or navigate wherever needed
	});
		// Send updated data to backend here
	});

	[img, fileInput, usernameLabel, usernameInput, emailLabel, emailInput, updateBtn].forEach(el => container.appendChild(el));
	body.appendChild(container);
}