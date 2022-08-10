import Context from '../models/context';
import Entity from '../models/entity';
import { log } from '../models/helpers/log';

export default class EntityService {
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
  }

  private getEntityOld() {
    this.entity.age += 1;
    log(`${this.entity.id} has got old, now it is ${this.entity.age}`);
  }
}
