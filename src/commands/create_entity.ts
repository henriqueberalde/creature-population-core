import { Arguments, Argv } from 'yargs';
import Factory from '../factory/factory';
import Entity from '../models/entity';

export const command = 'create-entity';

export const describe = 'Creates an entity';

export function builder(yargs: Arguments<Argv>) {
  return yargs
    .option('type', {
      alias: 't',
      describe: 'The type of entity',
      type: 'string',
      demandOption: true,
    })
    .option('info', {
      alias: 'i',
      describe: 'Show information about all the entities of the system',
      type: 'boolean',
    })
    .version(false);
}

export function handler(argv: Arguments<Argv>) {
  console.log('Creating Entity');
  const entity = new Entity({
    type: argv.type,
    events: [],
    fields: [],
  });

  const orchestrator = Factory.getInstanceOfOrchestrator();

  orchestrator.pushEntity(entity);
  console.log('Entity created successfully');

  if (argv.info) orchestrator.info();
}
