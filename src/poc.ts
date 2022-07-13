// ##### Redis repository with JSON #####
// ##### npm install redis-om #####
// import { createClient } from 'redis';
// import { Client, Schema } from 'redis-om';
// import Event from './models/event';
// import * as readline from 'readline';
// import { stdin, stdout } from 'process';

// ##### Redis Pub/Sub #####
// ##### npm install redis #####
// import { createClient } from 'redis';

// ##### Redis Streams #####
// import Redis from 'ioredis';
// import * as nrs from 'node-redis-streams';

// export default async function main(): Promise<void> {
// process.stdout.write('Begin\n');

// ##### Redis repository with JSON module #####
// ##### npm install redis-om #####
// const events: Array<Event> = [];
// console.log('CANTANDO E RODANDO');
// const redis = createClient({ url: 'redis://localhost:6379' });
// await redis.connect();
// const client = await new Client().use(redis);
// await redis.set('foo', 'bar');
// const value = await client.execute(['GET', 'foo']);
// console.log(value);
// const eventSchema = new Schema(Event, {
//   id: { type: 'number' },
//   name: { type: 'string' },
//   // action: { type: 'Action' },
//   namespace: { type: 'string' },
//   class: { type: 'string' },
//   method: { type: 'string' },
//   params: { type: 'string' },
//   instanceId: { type: 'number' },
//   created_at: { type: 'date' },
//   updated_at: { type: 'date' },
// });
// const eventRepository = client.fetchRepository(eventSchema);
// const event = await eventRepository.createAndSave({
//   id: 1,
//   name: 'Ronaldo',
//   namespace: 'namespace1',
//   class: 'class1',
//   method: 'method1',
//   params: null,
//   instanceId: 123,
//   created_at: new Date(),
//   updated_at: new Date(),
// });
// console.log(event);
// console.log('Fetch');
// const eventFetch = await eventRepository.fetch('ronaldo');
// console.log(eventFetch);
// console.log('Removing 01G645Q05R9HRZKQ2NM7YXZFZ7');
// await eventRepository.remove('01G645Q05R9HRZKQ2NM7YXZFZ7');
// console.log('Seting to expire');
// await eventRepository.expire(event.entityId, 20);
// eslint-disable-next-line no-loops/no-loops

// console.log(obj.file);

// ##### Redis Pub/Sub #####
// ##### npm install redis #####

// const client = createClient();

// client.on('error', (err) => console.error('Redis Client Error', err));

// // await client.connect();
// // await client.set('key', 'value');
// // const value = await client.get('key');

// const subscriber = client.duplicate();
// await subscriber.connect();

// let count = 0;

// await subscriber.subscribe('foo', (message) => {
//   count += 1;
//   console.log(`${message}${count}`);
// });

// ##### Redis Streams #####

// const reader = new Redis();
// reader.set('banana', 'maca');

// reader.get('banana', (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Prints "value"
//   }
// });

// const redis = new Redis();

// const processMessage = (
//   value: [id: string, fields: string[]],
//   index: number,
//   array: [id: string, fields: string[]][],
// ): void => {
//   console.log(value, index, array);
// };

// async function listenForMessage(lastId = '$') {
//   // `results` is an array, each element of which corresponds to a key.
//   // Because we only listen to one key (mystream) here, `results` only contains
//   // a single element. See more: https://redis.io/commands/xread#return-value
//   const results = await redis.xread(
//     'COUNT',
//     50,
//     'BLOCK',
//     0,
//     'STREAMS',
//     'example_stream',
//     lastId,
//   );

//   const [key, messages] = results ? results[0] : ['', []]; // `key` equals to "mystream"
//   console.log('key', key);

//   messages.forEach(processMessage);

//   // Pass the last id of the results to the next round.
//   await listenForMessage(messages[messages.length - 1][0]);
// }

// listenForMessage('>');

// ##### Redis Streams #####
// const reader = new Redis();

// const groupName = 'example_group';
// const consumerName = 'example_consumer';
// const readItems = 50;
// const blockIntervalMS = 1000;
// const streamName = 'example_stream';

// const streamConsumer = new nrs.Consumer({
//   consumerName,
//   groupName,
//   readItems,
//   recordHandler: async (record) => {
//     console.log('Got record', record);
//     if (record.reclaimed) {
//       console.log('this was a reclaimed record!');
//     }
//   },
//   errorHandler: async (record) => {
//     console.log('ERROR DETECTED FOR RECORD', record);
//   },
//   redisClient: reader,
//   streamName,
//   blockIntervalMS,
//   checkAbandonedMS: 2000,
// });

// streamConsumer.StartConsuming();

// process.stdout.write('End\n');
// }

// main();
