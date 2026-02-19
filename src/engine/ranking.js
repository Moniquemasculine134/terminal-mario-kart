export function getRanking(players) {
  return [...players].sort((a, b) => b.PONTOS - a.PONTOS);
}

export function resetAllPoints(players) {
  players.forEach((p) => (p.PONTOS = 0));
}
