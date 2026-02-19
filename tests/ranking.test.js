import { describe, it, expect } from 'vitest';
import { getRanking } from '../src/engine/ranking.js';

describe('Ranking', () => {
  it('deve ordenar jogadores por pontos', () => {
    const players = [
      { NOME: 'Mario', PONTOS: 10 },
      { NOME: 'Luigi', PONTOS: 5 },
      { NOME: 'Peach', PONTOS: 15 },
    ];

    const ranking = getRanking(players);

    expect(ranking[0].NOME).toBe('Peach');
    expect(ranking[1].NOME).toBe('Mario');
    expect(ranking[2].NOME).toBe('Luigi');
  });
});
