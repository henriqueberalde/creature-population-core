import { Arguments, Argv } from 'yargs';
import Factory from '../factory/factory';

export const command = 'info';

export const describe = 'Show information about all the entities of the system';

export function builder(yargs: Arguments<Argv>) {
  return yargs.version(false);
}

export function handler() {
  const orchestrator = Factory.getInstanceOfOrchestrator();
  orchestrator.info();
}
