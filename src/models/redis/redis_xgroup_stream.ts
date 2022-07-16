import RedisXGroupMessage from './redis_xgroup_message';

export default class RedisXGroupStream {
  public streamName: string = '';

  public messages: RedisXGroupMessage[] = [];

  public static fromAny(streamNoType: [string, string[]]): RedisXGroupStream {
    const stream = new RedisXGroupStream();

    if (streamNoType && streamNoType.length === 2) {
      const name = streamNoType[0];
      const messages = streamNoType[1];

      stream.streamName = name;

      messages.forEach((message: any) => {
        stream.messages.push(RedisXGroupMessage.fromAny(message));
      });
    }

    return stream;
  }

  public static fromArrayAny(
    streamsNoType: [string, string[]][],
  ): RedisXGroupStream[] {
    const streams: RedisXGroupStream[] = [];

    if (streamsNoType && streamsNoType.length) {
      streamsNoType.forEach((streamNoType: any) => {
        streams.push(RedisXGroupStream.fromAny(streamNoType));
      });
    }

    return streams;
  }
}
