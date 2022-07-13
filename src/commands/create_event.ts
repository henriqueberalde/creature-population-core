import { Arguments, Argv } from 'yargs';
import Event from '../models/event';

export const command = 'create-event';

export const describe = 'Creates an event';

export function builder(yargs: Arguments<Argv>) {
  return yargs
    .options({
      name: {
        alias: 'n',
        default: 'Generic Event',
        describe: 'The name of the event',
        type: 'string',
      },
      class: {
        alias: 'c',
        describe: 'The class which one the method will be executed',
        demandOption: 'The class must be specified',
        type: 'string',
      },
      method: {
        alias: 'm',
        describe: 'The method to be executed',
        demandOption: 'The method must be specified',
        type: 'string',
      },
    })
    .version(false);
}

export function handler(argv: Arguments<Argv>) {
  const name = <string>argv.name;
  const method = <string>argv.method;
  const argClass = <string>argv.class;

  const event = new Event(name, method, argClass);
  event.create();
}
