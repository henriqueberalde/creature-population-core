import { Arguments, Argv } from 'yargs';
import Factory from '../factory/factory';

export const command = 'execute-turn';

export const describe = 'Executes one turn or many turns on loop';

export function builder(yargs: Arguments<Argv>) {
  return yargs
    .alias('t', 'execute_turn')
    .option('loop', {
      alias: 'l',
      describe: 'Executes turns on loop one per delay in miliseconds',
      type: 'boolean',
      implies: 'delay',
      conflicts: 'info',
      demandOption: false,
    })
    .option('delay', {
      alias: 'd',
      describe: 'Delay in miliseconds, turns interval',
      type: 'number',
      conflicts: 'info',
    })
    .option('info', {
      alias: 'i',
      describe: 'Show information about all the entities of the system',
      type: 'boolean',
    })
    .version(false);
}

export function handler(argv: Arguments<Argv>) {
  const orchestrator = Factory.getInstanceOfOrchestrator();

  if (argv.loop) {
    console.log('Starting recursive execution');
    orchestrator.executeEventsRecursivly(argv.delay as number);
  } else orchestrator.executeTurn();

  if (argv.info) orchestrator.info();
}
