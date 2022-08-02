import { Arguments, Argv } from 'yargs';
import Factory from '../factory/factory';
import Event, { EventType } from '../models/event';

export const command = 'add-event-entity';

export const describe = 'Adds an event on an entity';

export function builder(yargs: Arguments<Argv>) {
  return yargs
    .option('entity_id', {
      alias: 'e_id',
      describe: 'The id of the entity to have the event added',
      type: 'string',
      demandOption: true,
    })
    .option('name', {
      alias: 'n',
      describe: 'The name of the event',
      type: 'string',
      demandOption: true,
    })
    .option('type', {
      alias: 't',
      describe: 'The type of the event',
      type: 'string',
      choices: ['Entity', 'Orchestrator'],
      demandOption: true,
    })
    .option('every_turn_event', {
      alias: 'e',
      describe: 'Set the event to run every turn',
      type: 'boolean',
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

  console.log(`Adding event on ${argv.entity_id}`);
  const eventType =
    argv.type === 'Entity' ? EventType.Entity : EventType.Orchestrator;

  const event = new Event(
    eventType,
    argv.name,
    argv.every_turn_event as boolean,
  );

  const entity = orchestrator.getEntity(argv.entity_id as string);

  if (entity) entity.events.push(event);
  else throw Error(`Entity ${argv.entity_id} was not found`);

  console.log('Event added to the entity successfully');

  if (argv.info) orchestrator.info();
}
