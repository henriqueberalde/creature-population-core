import Redis from 'ioredis';
import RedisXGroupMessage from '../../models/redis/redis_xgroup_message';
import RedisXGroupStream from '../../models/redis/redis_xgroup_stream';
import ArrayParser from '../../models/array_parser';
import EventQueue from '../event_queue';
import ModelEvent from '../../models/event';
import RedisErrorHandler from '../../models/redis/redis_error_handler';

export default class RedisEventQueue implements EventQueue {
  public streamName: string;

  public groupName: string;

  public consumerName: string;

  private redisClient: Redis;

  constructor(redisClient: Redis) {
    this.streamName = process.env.REDIS_EVENT_STREAM_NAME;
    this.groupName = process.env.REDIS_EVENT_CONSUMER_GROUP_NAME;
    this.consumerName = process.env.REDIS_EVENT_CONSUMER_NAME;

    this.redisClient = redisClient;
  }

  public async create(event: ModelEvent): Promise<string> {
    const id = await this.redisClient.xadd(
      this.streamName,
      '*',
      'name',
      event.name,
      'class',
      event.class,
      'method',
      event.method,
    );

    if (!id) throw new Error('No id returned on xadd function of redis client');

    return id;
  }

  public getAll(): Promise<ModelEvent[]> {
    return this.getAndAckAll();
  }

  private async getAndAckAll(): Promise<ModelEvent[]> {
    const events = await this.getAllFromQueue();

    if (events && events.length) {
      await this.ackEvents(events.map((e) => e.id ?? ''));
    }

    return events;
  }

  private async getAllFromQueue(): Promise<ModelEvent[]> {
    try {
      const streams = (await this.redisClient.xreadgroup(
        'GROUP',
        this.groupName,
        this.consumerName,
        'STREAMS',
        this.streamName,
        '>',
      )) as any;

      const streamsTyped = RedisXGroupStream.fromArrayAny(streams);

      if (!streamsTyped.length) return [];

      return RedisEventQueue.parseStreamsToEvents(streamsTyped);
    } catch (error) {
      if (RedisErrorHandler.isNoGroupError(error)) {
        await this.createConsumerGroup();
        return this.getAllFromQueue();
      }

      throw error;
    }
  }

  private async createConsumerGroup(): Promise<void> {
    console.log(
      `Creating consumer group: ${this.groupName} on stream: ${this.streamName}`,
    );
    const result = await this.redisClient.xgroup(
      'CREATE',
      this.streamName,
      this.groupName,
      '0',
    );

    if (result !== 'OK') throw Error(JSON.stringify(result));
  }

  public ackEvents(ids: string[]): Promise<number> {
    return this.redisClient.xack(this.streamName, this.groupName, ...ids);
  }

  private static parseStreamsToEvents(
    streams: RedisXGroupStream[],
  ): ModelEvent[] {
    const events: ModelEvent[] = [];

    if (!streams || !streams.length) return events;

    streams.forEach((stream: RedisXGroupStream) => {
      if (stream.messages && stream.messages.length) {
        stream.messages.forEach((message: RedisXGroupMessage) => {
          const event = RedisEventQueue.parseRedisMessageToEvent(message);
          events.push(event);
        });
      }
    });

    return events;
  }

  private static parseRedisMessageToEvent(
    message: RedisXGroupMessage,
  ): ModelEvent {
    const event = ArrayParser.arrayToAny(message.fields);

    event.id = message.id;

    return new ModelEvent(event);
  }
}
