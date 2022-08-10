export default class Entity {
  public id: string;

  public age: number;

  constructor(id: string) {
    this.id = id;
    this.age = 0;
  }
}
