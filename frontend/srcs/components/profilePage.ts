import { generateLoggedPage } from "./logged.js";
import {api} from "../services/api.js";
import { clearPage } from "../utils/clear.js";

export async function createProfilePage() {
	// Clear existing page
	document.body.innerHTML = '';
	document.body.className = 'bg-gray-900 text-white min-h-screen m-0';
	const name = localStorage.getItem('username');
	if (name)
		await api.getUserByUsername(name);
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

    avatar.style.cursor = 'pointer';
    avatar.title = 'Click to update avatar';
    avatar.addEventListener('click', () => {
    	fileInput.click();
    });


    //username

    const usernameContainer = document.createElement('div');
    usernameContainer.classList.add('flex', 'items-center', 'justify-center', 'gap-2', 'mt-4');

    const usernameText = document.createElement('h2');
    usernameText.textContent = localStorage.getItem('username') || 'Unknown User';
    usernameText.classList.add('text-2xl', 'font-bold');
    usernameContainer.appendChild(usernameText);

    const editUsernameBtn = document.createElement('button');
    editUsernameBtn.textContent = 'edit';
    editUsernameBtn.classList.add('text-sm');
    editUsernameBtn.addEventListener('click', () => {
    	const input = document.createElement('input');
    	input.type = 'text';
    	input.value = usernameText.textContent || '';
    	input.classList.add('bg-gray-700', 'text-white', 'rounded', 'px-2', 'py-1');
    	const saveBtn = document.createElement('button');
    	saveBtn.textContent = 'Save';
    	saveBtn.classList.add('ml-2', 'px-2', 'py-1', 'bg-green-600', 'rounded');

    	saveBtn.addEventListener('click', async () => {
    	const newUsername = input.value.trim();
    	if (newUsername) {
            console.log("update username");
    	usernameText.textContent = newUsername;
    	usernameContainer.replaceChildren(usernameText, editUsernameBtn);
        try {
            const oldUsername = localStorage.getItem('username');
            if (!oldUsername)
                return;
            const res = await fetch(`http://localhost:3000/api/users/updateUsername/${encodeURIComponent(oldUsername)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newUsername })
            });
                
            if (!res.ok) throw new Error('Failed to update username');   
            localStorage.setItem('username', newUsername);
            usernameText.textContent = newUsername;
            usernameContainer.replaceChildren(usernameText, editUsernameBtn);
        } catch (err) {
            console.error(err);
            alert('Could not update username.');
        }}});

    	usernameContainer.replaceChildren(input, saveBtn);
    });	
    usernameContainer.appendChild(editUsernameBtn);
    profileCard.appendChild(usernameContainer);
    
    
    // Email


    const EmailContainer = document.createElement('div');
    EmailContainer.classList.add('flex', 'items-center', 'justify-center', 'gap-2', 'mt-4');

    const emailText = document.createElement('h2');
    emailText.textContent = localStorage.getItem('email') || 'Unknown User';
    emailText.classList.add('text-2xl', 'font-bold');
    EmailContainer.appendChild(emailText);

    const editEmailBtn = document.createElement('button');
    editEmailBtn.textContent = 'edit';
    editEmailBtn.classList.add('text-sm');
    editEmailBtn.addEventListener('click', () => {
    	const input = document.createElement('input');
    	input.type = 'text';
    	input.value = emailText.textContent || '';
    	input.classList.add('bg-gray-700', 'text-white', 'rounded', 'px-2', 'py-1');
    	const saveBtn = document.createElement('button');
    	saveBtn.textContent = 'Save';
    	saveBtn.classList.add('ml-2', 'px-2', 'py-1', 'bg-green-600', 'rounded');

    	saveBtn.addEventListener('click', async () => {
    	const newEmail = input.value.trim();
    	if (newEmail) {
            console.log("update email");
    	emailText.textContent = newEmail;
    	EmailContainer.replaceChildren(emailText, editEmailBtn);
        try {
            const username = localStorage.getItem('username');
            if (!username)
                return;
            const res = await fetch(`http://localhost:3000/api/users/updateEmail/${encodeURIComponent(username)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newEmail })
            });
                
            if (!res.ok) throw new Error('Failed to update Email');   
            localStorage.setItem('email', newEmail);
            emailText.textContent = newEmail;
            EmailContainer.replaceChildren(emailText, editEmailBtn);
        } catch (err) {
            console.error(err);
            //alert('Could not update username.');
        }}});
        
    	EmailContainer.replaceChildren(input, saveBtn);
    });	
    EmailContainer.appendChild(editEmailBtn);
    profileCard.appendChild(EmailContainer);


    //exit
	const exitBtn = document.createElement('button');
	exitBtn.textContent = 'Exit';
	exitBtn.classList.add('mt-6', 'px-4', 'py-2', 'bg-red-600', 'hover:bg-red-700', 'rounded-xl', 'transition-all');
	exitBtn.addEventListener('click', () => {
		generateLoggedPage();
	});
	profileCard.appendChild(exitBtn)	

	container.appendChild(profileCard);
	document.body.appendChild(container);
}