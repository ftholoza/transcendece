import { createHomePage } from "../components/home.js";
import {generateLoggedPage} from "../components/logged.js";
import {generateLoginPage} from "../components/loggin.js";
import {clearPage} from "../utils/clear.js";


async function getUserByUsername(username: string) {
	console.log("getUserByUsername called");
		try {
			const name = localStorage.getItem('username');
			if (!name)
				return;
			const response = await fetch(`http://localhost:3000/api/users/username/${encodeURIComponent(name)}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

		const result = await response.json();

		if (response.ok) {
			localStorage.setItem("username", username);
			localStorage.setItem("email", result.email);
			const avatarUrl = `/api/users/avatar/${encodeURIComponent(username)}`;
			localStorage.setItem("avatar", avatarUrl);
			const email = localStorage.getItem("email");
			console.log(email);
			
		} else {
			const errorField = document.getElementById('error-field');
			if (!errorField) return;

			errorField.textContent = 'Invalid Username';
			errorField.classList.add('text-red-500');
		}
	} catch (error) {
		console.error('Error:', error);
		alert('An error occurred. Please try again.');
	}
	
}

async function login(username: string, password: string) {
	try {
		const response = await fetch('http://localhost:3000/api/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const result = await response.json();

		if (response.ok) {
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

async function isAlreadyLog() {
	try {
		const response = await fetch('http://localhost:3000/api/session', {
			method: 'GET',
			headers : {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		});

		const result = await response.json();

		if (response.ok) {
			return true;
		}
		return false;
	} catch (err) {
		console.error(err);
		return false;
	}
}

async function disconnect() {
	try {
		const response = await fetch('http://localhost:3000/api/logout', {
			method: 'POST',
			credentials: 'include'
		});

		if (response.ok) {
			clearPage();
			createHomePage();
			
		} else {
			alert("Fail to disconnect");
		}
	} catch (err) {
		console.error('Error:', err);
		alert('An error occurred. Please try again.');
	}
}

export const api = {
	login,
	register,
	isAlreadyLog,
	disconnect,
	getUserByUsername
};
