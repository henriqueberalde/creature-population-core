import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export default function main(): void {
  yargs(hideBin(process.argv))
    .scriptName('create-population')
    .usage('Usage: $0 <command> [options]')
    .commandDir('commands', {
      extensions: ['js', 'ts'],
    })
    .demandCommand(1, 'At least 1 command must to be passed')
    .help('help')
    .alias('h', 'help')
    .epilog('copyright 2019')
    .parseSync();
}

main();
