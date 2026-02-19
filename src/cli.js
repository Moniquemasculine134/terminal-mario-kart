import inquirer from 'inquirer';
import { players } from './data/players.js';
import { playRace, declareWinner } from './engine/raceEngine.js';

function resetPoints() {
  players.forEach((p) => (p.PONTOS = 0));
}

function findPlayerByName(name) {
  return players.find(
    (p) => p.NOME.toLowerCase() === name.toLowerCase(),
  );
}

function playersListText() {
  return players
    .map(
      (p) =>
        `${p.NOME} (Vel:${p.VELOCIDADE} Man:${p.MANOBRABILIDADE} Pod:${p.PODER})`,
    )
    .join('\n');
}

export async function startCLI() {
  let again = true;

  while (again) {
    console.clear();

    console.log('🏎️  Mario Kart Terminal\n');

    console.log('Personagens disponíveis:\n');
    console.log(playersListText());
    console.log('');

    const { player1Name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'player1Name',
        message: 'Digite o nome do primeiro jogador:',
        validate: (input) => {
          if (findPlayerByName(input)) return true;
          return 'Jogador não encontrado!';
        },
      },
    ]);

    const player1 = findPlayerByName(player1Name);

    const { player2Name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'player2Name',
        message: 'Digite o nome do segundo jogador:',
        validate: (input) => {
          const p = findPlayerByName(input);

          if (!p) return 'Jogador não encontrado!';
          if (p === player1) return 'Escolha um jogador diferente!';

          return true;
        },
      },
    ]);

    const player2 = findPlayerByName(player2Name);

    resetPoints();

    console.log(
      `\n🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`,
    );

    await playRace(player1, player2);

    declareWinner(player1, player2);

    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'again',
        message: 'Deseja jogar novamente?',
      },
    ]);

    again = answer.again;
  }
}
