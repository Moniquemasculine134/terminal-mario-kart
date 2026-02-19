import { describe, it, expect } from 'vitest';
import { playRace } from '../src/engine/raceEngine.js';

describe('Race Engine', () => {
  it('deve executar corrida sem erros', async () => {
    const player1 = {
      NOME: 'Mario',
      VELOCIDADE: 4,
      MANOBRABILIDADE: 3,
      PODER: 3,
      PONTOS: 0,
    };

    const player2 = {
      NOME: 'Luigi',
      VELOCIDADE: 3,
      MANOBRABILIDADE: 4,
      PODER: 4,
      PONTOS: 0,
    };

    await playRace(player1, player2);

    expect(player1.PONTOS + player2.PONTOS).toBeGreaterThanOrEqual(0);
  });
});
