export default class NotFoundEventError extends Error {
  constructor(event: string, object: object) {
    const message = `Event '${event}' not found on object '${object.constructor.name}'`;
    super(message);
  }
}
