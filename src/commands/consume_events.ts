import { Arguments, Argv } from 'yargs';
import Factory from '../factory/factory';

export const command = 'consume-events';

export const describe = 'Starts executor to consume events from events queue';

export function builder(yargs: Arguments<Argv>) {
  return yargs;
}

export function handler() {
  const eventQueue = Factory.getInstanceOfEventQueueInstance();
  eventQueue
    .getAll()
    .then((events) => {
      events.forEach((event) => {
        console.log(event);
      });
    })
    .catch((error) => console.error(error))
    .finally(() => process.exit());
}
