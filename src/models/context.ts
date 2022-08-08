import Entity from './entity';

export default class Context {
  public entities: Entity[];

  constructor(entities: Entity[]) {
    this.entities = entities;
  }
}
