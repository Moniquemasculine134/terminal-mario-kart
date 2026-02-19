import chalk from 'chalk';
import ora from 'ora';

export function showTitle() {
  console.clear();
  console.log(chalk.yellow.bold('🏎️  Mario Kart Terminal\n'));
}

export function showPlayers(players) {
  console.log(chalk.cyan('Personagens disponíveis:\n'));

  players.forEach((p) => {
    console.log(
      chalk.white(
        `${p.NOME} | Vel:${p.VELOCIDADE} Man:${p.MANOBRABILIDADE} Pod:${p.PODER}`,
      ),
    );
  });

  console.log('');
}

export async function raceAnimation(text = 'Correndo...') {
  const spinner = ora(text).start();

  await new Promise((resolve) => setTimeout(resolve, 1500));

  spinner.succeed('🏁!');
}

export function logRound(round) {
  console.log(chalk.magenta(`\n🏁 Rodada ${round}`));
}

export function logEvent(text) {
  console.log(chalk.gray(text));
}

export function logWinner(name) {
  console.log(chalk.green.bold(`\n🏆 ${name} venceu!\n`));
}

export function logDamage(text) {
  console.log(chalk.red(text));
}

export function logTurbo(text) {
  console.log(chalk.blue(text));
}
