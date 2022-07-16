import Redis from 'ioredis';
import EventQueue from '../services/event_queue';
import RedisEventQueue from '../services/redis/redis_event_queue';

export default class Factory {
  private static singletons: { [key: string]: object } = {};

  public static getInstanceOfEventQueueInstance(): EventQueue {
    const singletonName = 'RedisEventQueue';

    if (!this.singletons[singletonName]) {
      this.singletons[singletonName] = new RedisEventQueue(
        Factory.getInstanceOfRedisClient(),
      );
    }

    return this.singletons[singletonName] as RedisEventQueue;
  }

  public static getInstanceOfRedisClient(): Redis {
    const singletonName = 'RedisClient';

    if (!this.singletons[singletonName]) {
      this.singletons[singletonName] = new Redis();
    }

    return this.singletons[singletonName] as Redis;
  }
}
