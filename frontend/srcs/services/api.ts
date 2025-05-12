import {generateLoggedPage} from "../components/logged.js";
import {generateLoginPage} from "../components/loggin.js";
import {setUser} from "../states/state.js";
import {clearPage} from "../utils/clear.js";

async function login(username: string, password: string) {
	try {
		const response = await fetch('http://localhost:3000/api/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const result = await response.json();

		if (response.ok) {
			localStorage.setItem("username", username);
			setUser(username);
			clearPage();
			generateLoggedPage();
		} else {
			const errorField = document.getElementById('error-field');
			if (!errorField) return;

			errorField.textContent = 'Invalid Login or Password';
			errorField.classList.add('text-red-500');
		}
	} catch (error) {
		console.error('Error:', error);
		alert('An error occurred. Please try again.');
	}
}

async function register(username: string, email: string, password: string) {
	try {
		const response = await fetch('http://localhost:3000/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password })
		});

		const result = await response.json();

		if (response.ok) {
			localStorage.setItem('username', username);
			clearPage();
			generateLoginPage();
		} else {
			alert(result.error || 'Registration failed');
		}
	} catch (error) {
		console.error('Error:', error);
		alert('An error occurred. Please try again.');
	}
}

export const api = {
	login,
	register
};
