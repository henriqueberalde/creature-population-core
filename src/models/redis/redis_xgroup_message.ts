export default class RedisXGroupMessage {
  public id: string = '';

  public fields: string[] = [];

  public static fromAny(messageNoType: [string, string[]]): RedisXGroupMessage {
    const message = new RedisXGroupMessage();

    if (messageNoType && messageNoType.length === 2) {
      const id = messageNoType[0];
      const fields = messageNoType[1];

      message.id = id;

      fields.forEach((field: string) => {
        message.fields.push(field);
      });
    }

    return message;
  }
}
