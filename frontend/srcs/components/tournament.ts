import { start_pong_game } from "./pong.js";
import { endTournamentScreen } from "./endTournament.js";

type Matchup = [string, string][];


export function generateTournament() {
    document.body.innerHTML = ''; // clear current page
  
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.fontFamily = 'Arial';
    container.style.color = 'white';
    container.style.textAlign = 'center';
    container.style.background = 'black';
    document.body.appendChild(container);
  
    const title = document.createElement('h1');
    title.textContent = 'Créer un Tournoi';
    container.appendChild(title);
  
    const playerCountLabel = document.createElement('label');
    playerCountLabel.textContent = 'Nombre de joueurs : ';
    container.appendChild(playerCountLabel);
  
    const playerCountInput = document.createElement('input');
    playerCountInput.type = 'number';
    playerCountInput.min = '2';
    playerCountInput.max = '8';
    playerCountInput.value = '2';
    playerCountInput.style.margin = '10px';
    container.appendChild(playerCountInput);
  
    const maxPointLabel = document.createElement('label');
    maxPointLabel.textContent = 'Points pour gagner un match : ';
    container.appendChild(maxPointLabel);
  
    const maxPointInput = document.createElement('input');
    maxPointInput.type = 'number';
    maxPointInput.min = '1';
    maxPointInput.value = '5';
    maxPointInput.style.margin = '10px';
    container.appendChild(maxPointInput);
  
    container.appendChild(document.createElement('br'));

    const generateButton = document.createElement('button');
    generateButton.textContent = 'Valider';
    generateButton.style.margin = '10px';
    generateButton.onclick = () => {
      const count = parseInt(playerCountInput.value);
      const MaxPoint = parseInt(maxPointInput.value);
      //createPlayerRegistrationForm(container, count, MaxPoint);
    };
    container.appendChild(generateButton);
}

function generateMatchups(playerList: string[]): [string, string][] {
    const shuffled = [...playerList].sort(() => Math.random() - 0.5);
  
    const matches: [string, string][] = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      const player1 = shuffled[i];
      const player2 = shuffled[i + 1];
      matches.push([player1, player2]);
    }
    return matches;
  }

  async function runTournament(matchups: [string, string][], maxPoints: number): Promise<string[]> {
    const results: string[] = [];
  
    for (const [player1, player2] of matchups) {
      console.log(`Starting game: ${player1} vs ${player2}`);
  
      //const winner = await start_pong_game(maxPoints, player1, player2);
  
      //console.log(`Winner: ${winner}`);
      //results.push(winner);
    }
  
    return results;
  }

function createPlayerRegistrationForm(container: HTMLElement, count: number) {
    container.innerHTML = '';

    const form = document.createElement('form');
  
    for (let i = 1; i <= count; i++) {
      const label = document.createElement('label');
      label.textContent = `Joueur ${i} : `;
      label.style.display = 'block';
  
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `player${i}`;
      input.required = true;
      input.placeholder = 'Alias...';
      input.style.marginBottom = '10px';
  
      form.appendChild(label);
      form.appendChild(input);
    }
  
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Démarrer le tournoi';
    submitButton.style.display = 'block';
    submitButton.style.marginTop = '20px';
    form.appendChild(submitButton);
  
    form.onsubmit = (e) => {
      e.preventDefault();
      const aliases = Array.from(form.elements)
        .filter(el => el instanceof HTMLInputElement)
        .map((el: any) => el.value.trim())
        .filter(Boolean);
      console.log('Joueurs inscrits :', aliases);
      const matchup = generateMatchups(aliases);
      
    };

    container.appendChild(form);
}

