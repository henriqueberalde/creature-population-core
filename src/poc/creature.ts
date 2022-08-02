import Entity from '../models/entity';
import Event, { EventType } from '../models/event';
import getRandomArbitrary from './random_helper';

export default class Creature extends Entity {
  x = 'x';

  y = 'y';

  constructor(props: any) {
    const localProps = props;

    if (!localProps.events) localProps.events = [];
    if (!localProps.fields) localProps.fields = [];

    localProps.events.push(new Event(EventType.Entity, 'getOld', true));
    localProps.events.push(new Event(EventType.Entity, 'move', true));
    localProps.fields.push({
      key: 'age',
      value: '0',
    });
    localProps.fields.push({
      key: 'x',
      value: getRandomArbitrary(0, 1000).toString(),
    });
    localProps.fields.push({
      key: 'y',
      value: getRandomArbitrary(0, 1000).toString(),
    });

    super(props);
  }

  public getX(): number {
    const x = this.getField(this.x)?.value;
    if (x === undefined || Number.isNaN(x)) {
      throw Error(`Value ${x} could not be converted to number`);
    }

    return +x;
  }

  public setX(value: number): void {
    this.setField(this.x, value.toString());
  }

  public getY(): number {
    const y = this.getField(this.y)?.value;
    if (y === undefined || Number.isNaN(y)) {
      throw Error(`Value ${y} could not be converted to number`);
    }

    return +y;
  }

  public setY(value: number): void {
    this.setField(this.y, value.toString());
  }

  private move() {
    console.log(`Moving ${this.id}`);
    console.log(`Actual values ${this.getX()} ${this.getY()}`);
    const directions = ['N', 'L', 'S', 'W'];
    const chosenDirection = directions[getRandomArbitrary(0, 3)];

    console.log(`Moving ${this.id} to ${chosenDirection}`);
    switch (chosenDirection) {
      case 'N':
        this.setField(this.y, (this.getY() + 1).toString());
        break;
      case 'L':
        this.setField(this.x, (this.getX() + 1).toString());
        break;
      case 'S':
        this.setField(this.y, (this.getY() - 1).toString());
        break;
      case 'W':
        this.setField(this.x, (this.getX() - 1).toString());
        break;
      default:
        break;
    }

    console.log(`New values ${this.getX()} ${this.getY()}`);
  }
}
