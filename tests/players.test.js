import { describe, it, expect } from 'vitest';
import { players } from '../src/data/players.js';

describe('Players', () => {
  it('deve existir lista de jogadores', () => {
    expect(players.length).toBeGreaterThan(0);
  });

  it('cada jogador deve ter atributos válidos', () => {
    players.forEach((p) => {
      expect(p).toHaveProperty('NOME');
      expect(p).toHaveProperty('VELOCIDADE');
      expect(p).toHaveProperty('MANOBRABILIDADE');
      expect(p).toHaveProperty('PODER');
    });
  });
});
