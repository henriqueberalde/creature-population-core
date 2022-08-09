import Entity from './entity';

export default class Creature extends Entity {
  public life: number;

  public desireToKill: number;

  public desireToHeal: number;

  constructor(id: string, x: number, y: number) {
    super(id, x, y);

    this.life = 100;
    this.desireToKill = 0;
    this.desireToHeal = 0;
  }
}
