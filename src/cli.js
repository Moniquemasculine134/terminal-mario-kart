import inquirer from 'inquirer';
import { players } from './data/players.js';
import { playRace, declareWinner } from './engine/raceEngine.js';
import { playChampionship } from './engine/championship.js';
import { getRanking, resetAllPoints } from './engine/ranking.js';
import { showTitle, showPlayers, raceAnimation } from './ui/terminalUI.js';

const MODES = ['Corrida 1x1', 'Campeonato', 'Ver Ranking', 'Sair'];

function normalize(text) {
  return text.trim().toLowerCase();
}

function showModes() {
  console.log('\n🎮 Modos disponíveis:\n');

  MODES.forEach((mode, index) => {
    console.log(`  ${index + 1}. ${mode}`);
  });

  console.log('');
}

async function askMode() {
  while (true) {
    showModes();

    const { modeInput } = await inquirer.prompt([
      {
        type: 'input',
        name: 'modeInput',
        message: 'Escolha o modo (nome ou número):',
      },
    ]);

    const value = normalize(modeInput);

    // número
    const index = Number(value);
    if (!isNaN(index) && index >= 1 && index <= MODES.length) {
      return MODES[index - 1];
    }

    // nome
    const found = MODES.find((m) => normalize(m) === value);

    if (found) return found;

    console.log('❌ Modo inválido. Tente novamente.\n');
  }
}

function findPlayerByName(name) {
  return players.find(
    (p) => p.NOME.toLowerCase() === name.trim().toLowerCase(),
  );
}

async function askPlayer(label, excluded = []) {
  while (true) {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: `${label}:`,
      },
    ]);

    const player = findPlayerByName(name);

    if (!player) {
      console.log(
        `❌ Personagem inválido. Opções: ${players
          .map((p) => p.NOME)
          .join(', ')}\n`,
      );
      continue;
    }

    if (excluded.includes(player)) {
      console.log('⚠️ Jogador já escolhido. Escolha outro.\n');
      continue;
    }

    return player;
  }
}

function showRanking(players) {
  const ranking = getRanking(players);

  console.log('\n📊 Ranking:\n');

  ranking.forEach((p, index) => {
    console.log(`${index + 1}º ${p.NOME} - ${p.PONTOS} pts`);
  });

  console.log('');
}

export async function startCLI() {
  let again = true;

  while (again) {
    showTitle();

    const mode = await askMode();

    switch (mode) {
      case 'Corrida 1x1': {
        showPlayers(players);

        const player1 = await askPlayer('Primeiro jogador');
        const player2 = await askPlayer('Segundo jogador', [player1]);

        resetAllPoints(players);

        await raceAnimation(`Corrida entre ${player1.NOME} e ${player2.NOME}`);

        await playRace(player1, player2);

        declareWinner(player1, player2);
        break;
      }

      case 'Campeonato': {
        resetAllPoints(players);

        await raceAnimation('Iniciando campeonato');

        await playChampionship(players);

        console.log('\n🏆 Ranking Final:');
        showRanking(players);
        break;
      }

      case 'Ver Ranking': {
        showRanking(players);
        break;
      }

      case 'Sair': {
        process.exit();
      }
    }

    const { again: answer } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'again',
        message: 'Voltar ao menu?',
      },
    ]);

    again = answer;
  }
}
