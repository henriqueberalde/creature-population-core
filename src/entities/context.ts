import Entity from './entity';

export default class Context {
  public entities: Entity[];

  public currentCycle: number;

  constructor(entities: Entity[]) {
    this.entities = entities;
    this.currentCycle = 1;
  }
}
