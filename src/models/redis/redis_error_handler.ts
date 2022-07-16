export default class RedisErrorHandler {
  public static isNoGroupError(error: Error | any | unknown) {
    return error.name === 'ReplyError' && error.message.includes('NOGROUP');
  }
}
