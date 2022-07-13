import Redis from 'ioredis';

export default class Event {
  public name: string;

  public class: string;

  public method: string;

  constructor(name: string, argClass: string, method: string) {
    this.name = name;
    this.class = argClass;
    this.method = method;
  }

  public create() {
    const redisClient = Redis.createClient();

    return redisClient.xadd(
      'event-stream',
      '*',
      'name',
      this.name,
      'class',
      this.class,
      'method',
      this.method,
    );
  }

  public static get(id: string) {
    const redis = new Redis();

    return redis.xrange('event-stream', id, id);
  }
}
