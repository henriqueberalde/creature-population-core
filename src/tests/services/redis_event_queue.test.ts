import Redis from 'ioredis';
import RedisEventQueue from '../../services/redis/redis_event_queue';
import ModelEvent from '../../models/event';

const redisClient = new Redis();
const eventQueue = new RedisEventQueue(redisClient);
let expectedEvents: ModelEvent[] = [];

beforeEach(async () => {
  redisClient.del(eventQueue.streamName);

  expectedEvents = [
    {
      id: undefined,
      name: 'event0',
      class: 'class0',
      method: 'method0',
    },
    {
      id: undefined,
      name: 'event1',
      class: 'class1',
      method: 'method1',
    },
    {
      id: undefined,
      name: 'event2',
      class: 'class2',
      method: 'method2',
    },
  ];

  expectedEvents[0].id =
    (await redisClient.xadd(
      eventQueue.streamName,
      '*',
      'name',
      expectedEvents[0].name,
      'class',
      expectedEvents[0].class,
      'method',
      expectedEvents[0].method,
    )) ?? '';

  expectedEvents[1].id =
    (await redisClient.xadd(
      eventQueue.streamName,
      '*',
      'name',
      expectedEvents[1].name,
      'class',
      expectedEvents[1].class,
      'method',
      expectedEvents[1].method,
    )) ?? '';

  expectedEvents[2].id =
    (await redisClient.xadd(
      eventQueue.streamName,
      '*',
      'name',
      expectedEvents[2].name,
      'class',
      expectedEvents[2].class,
      'method',
      expectedEvents[2].method,
    )) ?? '';
});

describe('redis_event_queue', () => {
  describe('.create', () => {
    it('when called creates an event on redis queue', async () => {
      const event = new ModelEvent({
        id: '',
        name: 'name1',
        class: 'class1',
        method: 'method1',
      });

      const id = await eventQueue.create(event);

      const messages = await redisClient.xrange(eventQueue.streamName, id, id);
      const firstMessage = messages[0] as any;
      const messageId = firstMessage[0] as string;
      const messageFields = firstMessage[1] as string[];

      expect(messageId).toBe(id);
      expect(messageFields[1]).toBe('name1');
      expect(messageFields[3]).toBe('class1');
      expect(messageFields[5]).toBe('method1');
    });
  });
  describe('.getAll', () => {
    it('when called returns an array of events', async () => {
      const events = await eventQueue.getAll();

      expect(events).toMatchObject(expectedEvents);
      expect(events.length).toBe(3);
    });
    it('when called returns all messages from queue', async () => {
      const events = await eventQueue.getAll();

      expect(events.length).toBe(3);
    });
    it('when NOGROUP exception is thrown by redis then creates a consumer group', async () => {
      await redisClient.xgroup(
        'DESTROY',
        eventQueue.streamName,
        eventQueue.groupName,
      );
      const events = await eventQueue.getAll();

      expect(events).toMatchObject(expectedEvents);
    });
  });
});
