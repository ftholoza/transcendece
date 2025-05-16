import { start_pong_game } from "./pong.js";
import { generateLoggedPage } from "./logged.js";

export function showStartMenu(): void {
    // Clear and style body
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.backgroundColor = '#0a0a0a';
    document.body.style.color = '#fff';
  
    // Create container
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';
    container.style.gap = '20px';
    document.body.appendChild(container);
  
    // Title
    const title = document.createElement('h1');
    title.textContent = 'PONG GAME';
    title.style.fontSize = '48px';
    title.style.margin = '0';
    container.appendChild(title);
  
    // Label and input
    const label = document.createElement('label');
    label.textContent = 'Points to Win:';
    label.style.fontSize = '20px';
    container.appendChild(label);
  
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = '99';
    input.value = '5';
    input.style.padding = '10px';
    input.style.fontSize = '18px';
    input.style.width = '80px';
    input.style.textAlign = 'center';
    container.appendChild(input);
  

    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.style.position = 'absolute';
    exitButton.style.top = '20px';
    exitButton.style.right = '20px';
    exitButton.style.padding = '10px 20px';
    exitButton.style.fontSize = '16px';
    exitButton.style.zIndex = '1';
    document.body.appendChild(exitButton);

  
    exitButton.addEventListener('click', () => {
    document.body.innerHTML = '';
    generateLoggedPage();
    });

    // Start button
    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start Game';
    startBtn.style.padding = '10px 20px';
    startBtn.style.fontSize = '20px';
    startBtn.style.backgroundColor = '#1e90ff';
    startBtn.style.color = 'white';
    startBtn.style.border = 'none';
    startBtn.style.borderRadius = '5px';
    startBtn.style.cursor = 'pointer';
    startBtn.onmouseover = () => startBtn.style.backgroundColor = '#1c86ee';
    startBtn.onmouseout = () => startBtn.style.backgroundColor = '#1e90ff';
    container.appendChild(startBtn);
  
    // Start game when button clicked
    startBtn.addEventListener('click', () => {
      const maxPoints = parseInt(input.value, 10);
      if (isNaN(maxPoints) || maxPoints <= 0) {
        alert('Please enter a valid number of points.');
        return;
      }
      start_pong_game(maxPoints, "player1", "player2");
    });
  }