/* eslint-disable no-param-reassign */
import { Vector } from 'ts-matrix';
import { Context, Creature } from '../../entities';
import Action from '../../entities/action';
import Entity from '../../entities/entity';
import ConsoleLogger from '../../utils/console_logger';
import Logger from '../../utils/logger';
import MathHelper from '../../utils/math_helper';
import getRandomIntegerOnRange from '../../utils/random_integer_on_range';
import VectorHelper from '../../utils/vector_helper';
import DefaultActionExecutor from './default_action_executor';

export default class CreatureActionExecutor extends DefaultActionExecutor {
  protected context: Context;

  protected logger: Logger;

  constructor(context: Context, logger?: Logger) {
    super();
    this.context = context;
    this.logger = logger !== undefined ? logger : new ConsoleLogger();
  }

  // eslint-disable-next-line class-methods-use-this
  public execute(entity: Entity, action: Action): void {
    super.execute(entity, action);

    const creature = entity as Creature;

    switch (action.name) {
      case 'calculateWills':
        this.calculateWills(creature);
        break;
      case 'move':
        this.move(creature);
        break;
      case 'hurt':
        this.hurtRandomCreatureBasedOnCreatureWill(creature);
        break;
      case 'heal':
        this.healRandomHurtCreatureBasedOnCreatureWill(creature);
        break;
      default:
        break;
    }
  }

  private calculateWills(creature: Creature) {
    const desireToKillOld = creature.desireToKill;
    const desireToHealOld = creature.desireToHeal;

    creature.desireToKill += getRandomIntegerOnRange(-10, 10);
    creature.desireToHeal += getRandomIntegerOnRange(-10, 10);

    this.logger.log('Wills');
    this.logger.log(
      `${creature.id} DesireToKill ${desireToKillOld} => ${creature.desireToKill}`,
    );
    this.logger.log(
      `${creature.id} DesireToHeal ${desireToHealOld} => ${creature.desireToHeal}`,
    );
  }

  public move(creature: Creature) {
    const distToTarget = creature.position.substract(creature.target).length();

    // Decide Target
    if (getRandomIntegerOnRange(0, 14) === 2) {
      const x = getRandomIntegerOnRange(100, 900);
      const y = getRandomIntegerOnRange(100, 900);
      creature.target = new Vector([x, y]);
    }

    // Calc acceleration
    const maxSpeed = 15;
    const maxSteringForce = 2;
    const maxAcceleration = 2;
    const breakingRadius = 400;

    let speed = maxSpeed;
    const steringForce = maxSteringForce;
    const acceleration = maxAcceleration;

    if (distToTarget < breakingRadius * creature.velocity.length()) {
      speed = MathHelper.proportion(distToTarget, 0, 100, 0, maxSpeed);
    }

    // Seek
    let desired = creature.target.substract(creature.position);
    desired = VectorHelper.setMag(desired, speed);

    let stering = desired.substract(creature.velocity);
    stering = VectorHelper.limit(stering, steringForce);

    creature.acceleration = VectorHelper.mult(creature.acceleration, 0);
    creature.acceleration = creature.acceleration.add(stering);
    creature.acceleration = VectorHelper.setMag(
      creature.acceleration,
      acceleration,
    );

    // Apply Forces
    creature.position = creature.position.add(creature.velocity);
    creature.velocity = creature.velocity.add(creature.acceleration);

    this.logger.log(
      `${creature.id} has moved to (${creature.x()}, ${creature.y()})`,
    );
  }

  public hurtRandomCreatureBasedOnCreatureWill(creature: Creature) {
    if (creature.desireToKill <= 20) return;

    this.hurt(creature, this.getRandomCreature());
  }

  public hurt(creature: Creature, targetCreature: Creature) {
    const hurtAmount = getRandomIntegerOnRange(1, 10);
    const stringHurtAmount = Array(hurtAmount + 1).join('#');

    targetCreature.life -= hurtAmount;

    this.setCreatureAsDeadIfSo(creature as Creature);

    this.logger.logAndIgnoreVerbose(
      `${stringHurtAmount} ${creature.id} is hurting ${targetCreature.id}; Target\`s life is now: ${targetCreature.life} ${stringHurtAmount}`,
    );
  }

  public healRandomHurtCreatureBasedOnCreatureWill(creature: Creature) {
    const randomHurtCreature = this.getRandomHurtCreature();

    if (creature.desireToHeal <= 20 || randomHurtCreature === undefined) {
      return;
    }

    this.heal(creature, randomHurtCreature);
  }

  public heal(creature: Creature, healed: Creature) {
    const healer = creature as Creature;
    const healingAmount = getRandomIntegerOnRange(1, 10);
    const stringHealingAmount = Array(healingAmount + 1).join('@');

    healed.life += healingAmount;

    if (healed.life > 100) healed.life = 100;

    this.logger.logAndIgnoreVerbose(
      `${stringHealingAmount} ${healer.id} is healing ${healed.id}; Healed\`s life is now: ${healed.life} ${stringHealingAmount}`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public setCreatureAsDeadIfSo(creature: Creature) {
    // eslint-disable-next-line no-param-reassign
    creature.isDead = creature.life <= 0;
  }

  public getRandomCreature(): Creature {
    const randomIndex = getRandomIntegerOnRange(
      0,
      this.context.entities.length - 1,
    );

    return this.context.entities[randomIndex] as Creature;
  }

  public getRandomHurtCreature(): Creature | undefined {
    const allHurtEntitites = this.getAllHurtCreatures();

    if (allHurtEntitites.length === 0) return undefined;

    return allHurtEntitites[
      getRandomIntegerOnRange(0, allHurtEntitites.length - 1)
    ];
  }

  public getAllHurtCreatures(): Creature[] {
    return this.context.entities
      .filter((entity) => (entity as Creature).life < 100)
      .map((e) => e as Creature);
  }
}
