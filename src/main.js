import { players } from './data/players.js';
import { playRace, declareWinner } from './engine/raceEngine.js';

function getRandomPlayers() {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

export async function start() {
  const [p1, p2] = getRandomPlayers();

  console.log(`🏁 Corrida entre ${p1.NOME} e ${p2.NOME}\n`);

  await playRace(p1, p2);
  declareWinner(p1, p2);
}