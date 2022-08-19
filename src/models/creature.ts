import { Vector } from 'ts-matrix';
import Entity from './entity';
import getRandomInteger from './helpers/integer';

export default class Creature extends Entity {
  public life: number;

  public position: Vector;

  public velocity: Vector;

  public acceleration: Vector;

  public target: Vector;

  public desireToKill: number;

  public desireToHeal: number;

  constructor(id: string, x: number, y: number) {
    super(id);

    this.position = new Vector([x, y]);
    this.velocity = new Vector([0, 0]);
    this.acceleration = new Vector([0, 0]);
    this.target = new Vector([
      getRandomInteger(100, 900),
      getRandomInteger(100, 900),
    ]);

    this.life = 100;
    this.desireToKill = 0;
    this.desireToHeal = 0;
  }

  public x() {
    return this.position.values[0];
  }

  public y() {
    return this.position.values[1];
  }
}
