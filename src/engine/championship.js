import { playRace } from './raceEngine.js';

export async function playChampionship(players) {
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      console.log(`\n==============================`);
      console.log(`🏁 ${players[i].NOME} VS ${players[j].NOME}`);
      console.log(`==============================\n`);

      await playRace(players[i], players[j]);
    }
  }
}
