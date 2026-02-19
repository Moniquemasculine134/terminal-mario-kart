import { rollDice, getRandomBlock, getRandomItem } from '../utils/random.js';
import { logRoll } from '../utils/logger.js';


function tryTurbo(player) {
  if (Math.random() < 0.5) {
    console.log(`${player.NOME} ganhou TURBO ⚡ (+1 ponto)`);
    player.PONTOS++;
  }
}

export async function playRace(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);

    const block = getRandomBlock();
    console.log(`Modo: ${block}`);

    const dice1 = rollDice();
    const dice2 = rollDice();

    if (block === 'CONFRONTO') {
      const power1 = dice1 + player1.PODER;
      const power2 = dice2 + player2.PODER;

      console.log(`${player1.NOME} 🥊 VS 🥊 ${player2.NOME}`);

      logRoll(player1, 'PODER', dice1, player1.PODER);
      logRoll(player2, 'PODER', dice2, player2.PODER);

      if (power1 !== power2) {
        const winner = power1 > power2 ? player1 : player2;
        const loser = power1 > power2 ? player2 : player1;

        const item = getRandomItem();

        console.log(
          `${winner.NOME} venceu e lançou ${item.nome} em ${loser.NOME}!`,
        );

        loser.PONTOS = Math.max(0, loser.PONTOS - item.dano);

        tryTurbo(winner);
      } else {
        console.log('Empate!');
      }

      continue;
    }

    const attr = block === 'RETA' ? 'VELOCIDADE' : 'MANOBRABILIDADE';

    const total1 = dice1 + player1[attr];
    const total2 = dice2 + player2[attr];

    logRoll(player1, attr, dice1, player1[attr]);
    logRoll(player2, attr, dice2, player2[attr]);

    if (total1 > total2) player1.PONTOS++;
    else if (total2 > total1) player2.PONTOS++;
  }
}

export function declareWinner(p1, p2) {
  console.log('\nResultado Final');
  console.log(`${p1.NOME}: ${p1.PONTOS}`);
  console.log(`${p2.NOME}: ${p2.PONTOS}`);

  if (p1.PONTOS > p2.PONTOS) console.log(`🏆 ${p1.NOME} venceu`);
  else if (p2.PONTOS > p1.PONTOS) console.log(`🏆 ${p2.NOME} venceu`);
  else console.log('Empate');
}
