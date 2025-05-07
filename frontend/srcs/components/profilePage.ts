import { generateLoggedPage } from "./logged.js";
import {api} from "../services/api.js";

export function initProfilePage() {
    // Clear page
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.backgroundColor = 'black';
  
    // Main container
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '15px'
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';
    container.style.textAlign = 'center';
    document.body.appendChild(container);
  
    // Title
    const title = document.createElement('h1');
    title.textContent = 'PROFILE';
    title.style.fontFamily = 'monospace';
    title.style.fontSize = '48px';
    title.style.color = '#00ff00';
    title.style.textShadow = '0 0 10px #00ff00';
    container.appendChild(title);
  
    // Profile picture preview
    const img = document.createElement('img');
    img.style.width = '150px';
    img.style.height = '150px';
    img.style.borderRadius = '50%';
    img.style.border = '3px solid #00ff00';
    img.style.objectFit = 'cover';
    img.style.margin = '20px';
    container.appendChild(img);
  
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      img.src = savedImage;
    }


    // File input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.color = '#00ff00';
    fileInput.style.marginBottom = '20px';
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) {
        img.src = URL.createObjectURL(file);
      }
    });
    container.appendChild(fileInput);
  
    fileInput.addEventListener('change', () => {
        const file = fileInput.files?.[0];
        if (!file) return;
      
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          img.src = base64;
      
          // Save to localStorage
          localStorage.setItem('profileImage', base64);
        };
        reader.readAsDataURL(file); // Converts file to base64
    });

    // Name input
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Username';
    nameInput.style.padding = '10px';
    nameInput.style.fontSize = '18px';
    nameInput.style.fontFamily = 'monospace';
    nameInput.style.backgroundColor = 'black';
    nameInput.style.color = '#00ff00';
    nameInput.style.border = '2px solid #00ff00';
    nameInput.style.borderRadius = '5px';
    nameInput.style.marginBottom = '20px';
    container.appendChild(nameInput);
  
    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.padding = '10px 20px';
    saveBtn.style.fontSize = '20px';
    saveBtn.style.backgroundColor = '#00ff00';
    saveBtn.style.color = 'white';
    saveBtn.style.border = 'none';
    saveBtn.style.borderRadius = '5px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.addEventListener('click', () => {
      const name = nameInput.value;

      console.log('Saved profile:', { name, image: img.src });

    });
        const exitButton = document.createElement('button');
        exitButton.textContent = 'Exit';
        exitButton.style.padding = '10px 20px';
        exitButton.style.fontSize = '20px';
        exitButton.style.backgroundColor = '#00ff00';
        exitButton.style.color = 'white';
        exitButton.style.border = 'none';
        exitButton.style.borderRadius = '5px';
        exitButton.style.cursor = 'pointer';
    
    
        exitButton.addEventListener('click', () => {
        document.body.innerHTML = '';
        generateLoggedPage();
       });
      
    container.appendChild(saveBtn);
    container.appendChild(exitButton);
  }