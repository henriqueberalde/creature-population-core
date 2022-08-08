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
    log(
      this.verbose,
      'Nothing to do on Entity level',
      this.context.entities.length,
    );
  }

  public doActions() {
    this.getEntityOld();
    this.moveEntity();
  }

  private getEntityOld() {
    log(this.verbose, `${this.entity.id} is getting old`);
    this.entity.age += 1;
  }

  private moveEntity() {
    const directions = ['N', 'L', 'S', 'W'];
    const chosenDirection = directions[getRandomInteger(0, 3)];

    log(
      this.verbose,
      `${this.entity.id} is at (${this.entity.x}, ${this.entity.y})`,
    );
    log(this.verbose, `Moving ${this.entity.id} to ${chosenDirection}`);
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
      this.verbose,
      `${this.entity.id} is now at (${this.entity.x}, ${this.entity.y})`,
    );
  }
}
