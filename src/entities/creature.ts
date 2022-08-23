import { Vector } from 'ts-matrix';
import Action from './action';
import Entity from './entity';
import getRandomIntegerOnRange from '../utils/random_integer_on_range';
import { CycleAmount, Priority } from '../utils/enums';

export default class Creature extends Entity {
  public life: number;

  public position: Vector;

  public velocity: Vector;

  public acceleration: Vector;

  public target: Vector;

  public maxSpeed: number = 15;

  public maxSteringForce: number = 2;

  public maxAcceleration: number = 2;

  public breakingRadius: number = 400;

  public desireToKillOrHeal: number;

  public isDead: boolean;

  constructor(
    id: string,
    x: number,
    y: number,
    actions?: Action[],
    maxSpeed?: number,
  ) {
    super(id, actions);

    this.position = new Vector([x, y]);
    this.velocity = new Vector([0, 0]);
    this.acceleration = new Vector([0, 0]);
    this.target = new Vector([
      getRandomIntegerOnRange(100, 900),
      getRandomIntegerOnRange(100, 900),
    ]);

    if (maxSpeed !== undefined) {
      this.maxSpeed = maxSpeed;
    }

    this.life = 100;
    this.desireToKillOrHeal = 0;
    this.isDead = this.life <= 0;

    this.actions.push(
      new Action(
        'calculateWills',
        Priority.WillPriority,
        CycleAmount.ActionCycle,
      ),
    );
    this.actions.push(
      new Action('move', Priority.ActionPriority, CycleAmount.MoveCycle),
    );
    this.actions.push(new Action('hurt'));
    this.actions.push(new Action('heal'));
  }

  public x() {
    return this.position.values[0];
  }

  public y() {
    return this.position.values[1];
  }
}
