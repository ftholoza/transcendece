
import { showStartMenu } from "./startMenu.js";
import { generateLoggedPage } from "./logged.js";

export function endTournamentScreen(winner: string): void {

    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.backgroundColor = '#111';
    document.body.style.color = '#fff';
  

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';
    container.style.gap = '20px';
    document.body.appendChild(container);
  
    const title = document.createElement('h1');
    title.textContent = `${winner} Wins! 🏆`;
    title.style.fontSize = '48px';
    container.appendChild(title);
  
 

    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.style.padding = '10px 20px';
    exitButton.style.fontSize = '20px';
    exitButton.style.backgroundColor = '#1e90ff';
    exitButton.style.color = 'white';
    exitButton.style.border = 'none';
    exitButton.style.borderRadius = '5px';
    exitButton.style.cursor = 'pointer';


    exitButton.addEventListener('click', () => {
    document.body.innerHTML = '';
    generateLoggedPage();
   });
  
    exitButton.onmouseover = () => exitButton.style.backgroundColor = '#1c86ee';
    exitButton.onmouseout = () => exitButton.style.backgroundColor = '#1e90ff';  
  
  
    container.appendChild(exitButton);
  }