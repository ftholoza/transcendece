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
      createPlayerRegistrationForm(container, count, MaxPoint);
    };
    container.appendChild(generateButton);
}

const playersWithBye = new Set<string>();

function generateMatchups(players: string[]): [string, string][] {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  const matchups: [string, string][] = [];

  for (let i = 0; i < shuffled.length; i += 2) {
    const p1 = shuffled[i];
    const p2 = shuffled[i + 1];

    if (p2) {
      matchups.push([p1, p2]);
    } else {
      matchups.push([p1, "BYE"]);
    }
  }

  return matchups;
}

function showStartButton(matchLabel: string): Promise<void> {
  return new Promise((resolve) => {
    document.body.innerHTML = '';

    const container = document.createElement('div');
    container.style.color = 'white';
    container.style.fontFamily = 'Arial';
    container.style.background = 'black';
    container.style.height = '100vh';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    document.body.appendChild(container);

    const title = document.createElement('h2');
    title.textContent = `Match: ${matchLabel}`;
    title.style.marginBottom = '20px';
    container.appendChild(title);

    const startButton = document.createElement('button');
    startButton.textContent = 'Commencer le match';
    startButton.style.padding = '12px 24px';
    startButton.style.fontSize = '18px';
    startButton.style.cursor = 'pointer';

    startButton.onclick = () => {
      container.remove();
      resolve();
    };

    container.appendChild(startButton);
  });
}

async function runTournament(
  matchups: [string, string][],
  maxPoints: number
): Promise<string[] | "EXIT"> {
  const winners: string[] = [];

  for (const [player1, player2] of matchups) {
    if (player2 === "BYE") {
      console.log(`${player1} advances automatically.`);
      winners.push(player1);
      playersWithBye.add(player1);
      continue;
    }

    await showStartButton(`${player1} vs ${player2}`);

    const winner = await start_pong_game(maxPoints, player1, player2);
    if (winner === "EXIT") return "EXIT";
    winners.push(winner);
    console.log(`${player1} vs ${player2} → winner: ${winner}`);
  }

  return winners;
}

function createPlayerRegistrationForm(container: HTMLElement, count: number, MaxPoint: number) {
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

  form.onsubmit = async (e) => {
    e.preventDefault();
  
    const aliases = Array.from(form.elements)
      .filter(el => el instanceof HTMLInputElement)
      .map((el: any) => el.value.trim())
      .filter(Boolean);
  
    console.log('Joueurs inscrits :', aliases);
  
    let currentPlayers = [...aliases];
    const playersWithBye = new Set<string>(); 
  
    while (currentPlayers.length > 1) {
      let byeCandidate: string | null = null;
  
      if (currentPlayers.length % 2 !== 0) {
        const index = currentPlayers.findIndex(p => !playersWithBye.has(p));
  
        if (index !== -1) {
          byeCandidate = currentPlayers.splice(index, 1)[0];
          if (byeCandidate)
            playersWithBye.add(byeCandidate);
        } else {
          byeCandidate = currentPlayers.pop()!;
        }
      }
  
      const matchups: [string, string][] = [];
      for (let i = 0; i < currentPlayers.length; i += 2) {
        matchups.push([currentPlayers[i], currentPlayers[i + 1]]);
      }
  
      const result = await runTournament(matchups, MaxPoint);
      if (result === "EXIT") {
        console.log("Tournoi annulé.");
        return;
      }
  
      currentPlayers = result;
  
      if (byeCandidate) {
        if (currentPlayers.length > 0) {
          const opponent = currentPlayers.pop()!;
          await showStartButton(`${byeCandidate} vs ${opponent}`);
          const winner = await start_pong_game(MaxPoint, byeCandidate, opponent);
          console.log(`${byeCandidate} vs ${opponent} → winner: ${winner}`);
          if (winner === "EXIT") return;
          currentPlayers.push(winner);
        } else {
          currentPlayers.push(byeCandidate);
        }
      }
    }
  
    const finalWinner = currentPlayers[0];
    console.log("🏆 Gagnant du tournoi :", finalWinner);
    endTournamentScreen(finalWinner);
  };

  container.appendChild(form);
}
