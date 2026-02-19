export function logRoll(player, atributo, dice, valor) {
  console.log(
    `${player.NOME} 🎲 ${atributo}: ${dice} + ${valor} = ${dice + valor}`,
  );
}
