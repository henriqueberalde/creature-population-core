import { Arguments, Argv } from 'yargs';
import Factory from '../factory/factory';

export const command = 'add-field-entity';

export const describe = 'Adds a field on an entity';

export function builder(yargs: Arguments<Argv>) {
  return yargs
    .option('entity_id', {
      alias: 'e_id',
      describe: 'The id of the entity to have the field added',
      type: 'string',
      demandOption: true,
    })
    .option('key', {
      alias: 'k',
      describe: 'The key of the field',
      type: 'string',
      demandOption: true,
    })
    .option('value', {
      alias: 'v',
      describe: 'The value of the field',
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
  console.log(`Adding event on ${argv.entity_id}`);
  const key = argv.key as string;
  const value = argv.value as string;
  const orchestrator = Factory.getInstanceOfOrchestrator();
  const entity = orchestrator.getEntity(argv.entity_id as string);

  if (entity) entity.fields.push({ key, value });
  else throw Error(`Entity ${argv.entity_id} was not found`);

  console.log('Event added to the entity successfully');

  if (argv.info) orchestrator.info();
}
