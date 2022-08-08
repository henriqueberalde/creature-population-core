export default class Entity {
  public id: string;

  public age: number;

  public x: number;

  public y: number;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.age = 0;
    this.x = x;
    this.y = y;
  }
}
