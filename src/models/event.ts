export default class Event {
  public id?: string;

  public name: string;

  public class: string;

  public method: string;

  constructor(event?: any) {
    this.id = event.id;
    this.name = event.name;
    this.class = event.class;
    this.method = event.method;
  }
}
