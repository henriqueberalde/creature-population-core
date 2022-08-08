import Context from '../models/context';
import Entity from '../models/entity';
import { log } from '../models/helpers/log';
import getRandomInteger from '../models/helpers/integer';
import limitCartesianValue, {
  maxCartesianValue,
} from '../models/helpers/catesian';

export default class EntityService {
  protected verbose = false;

  protected entity: Entity;

  protected context: Context;

  public static isEndOfGame(context: Context) {
    return context.entities.length <= 0;
  }

  constructor(entity: Entity, context: Context) {
    this.entity = entity;
    this.context = context;
  }

  public calculateWills() {
    log(`${this.entity.id} doen\`t need will calculation on entity level`);
  }

  public doActions() {
    this.getEntityOld();
    this.moveEntity();
  }

  private getEntityOld() {
    this.entity.age += 1;
    log(`${this.entity.id} has got old, now it is ${this.entity.age}`);
  }

  private moveEntity() {
    const directions = ['N', 'L', 'S', 'W'];
    const chosenDirection = directions[getRandomInteger(0, 3)];

    switch (chosenDirection) {
      case 'N':
        this.entity.y = limitCartesianValue(
          this.entity.y,
          5,
          maxCartesianValue,
        );
        break;
      case 'L':
        this.entity.x = limitCartesianValue(
          this.entity.x,
          5,
          maxCartesianValue,
        );
        break;
      case 'S':
        this.entity.y = limitCartesianValue(
          this.entity.y,
          -5,
          maxCartesianValue,
        );
        break;
      case 'W':
        this.entity.x = limitCartesianValue(
          this.entity.x,
          -5,
          maxCartesianValue,
        );
        break;
      default:
        break;
    }
    log(
      `${this.entity.id} has moved to ${chosenDirection}, now it is at (${this.entity.x}, ${this.entity.y})`,
    );
  }
}
