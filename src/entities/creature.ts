import { Vector } from 'ts-matrix';
import Action from './action';
import Entity from './entity';
import getRandomIntegerOnRange from '../utils/random_integer_on_range';
import { CycleAmount, Priority } from '../utils/enums';
import Will from './will';

export default class Creature extends Entity {
  public life: number;

  public position: Vector;

  public velocity: Vector;

  public acceleration: Vector;

  public seekingCreatureId?: string;

  public target: Vector;

  public speed: number = 0;

  public maxSpeed: number = 15;

  public maxSteringForce: number = 2;

  public maxAcceleration: number = 2;

  public breakingRadius: number = 400;

  public wills: Will[];

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
    this.isDead = this.life <= 0;

    this.wills = [new Will('kill', 20, 'heal', -20, 0)];

    this.actions.push(
      new Action(
        'updateDesireToKillOrHeal',
        Priority.WillPriority,
        CycleAmount.ActionCycle,
      ),
    );
    this.actions.push(
      new Action(
        'defineTarget',
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

  public getWill(name: string): Will {
    let willFound;

    this.wills.forEach((will) => {
      if (will.getName() === name) willFound = will;
    });

    if (willFound === undefined) {
      throw new Error(`Will not found: ${name} on creature: ${this.id}`);
    }

    return willFound;
  }

  public getKillHealValue(): string | undefined {
    return this.getWill('kill_heal').getValue();
  }

  public isDiferentTargetToSeek(newSeekingCreatureId: string) {
    return this.seekingCreatureId !== newSeekingCreatureId;
  }
}
