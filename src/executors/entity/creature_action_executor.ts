/* eslint-disable no-param-reassign */
import { Vector } from 'ts-matrix';
import { Context, Creature } from '../../entities';
import Action from '../../entities/action';
import Entity from '../../entities/entity';
import ConsoleLogger from '../../utils/console_logger';
import { Logger, LogMessageLevel, LogMessageContext } from '../../utils/logger';
import MathHelper from '../../utils/math_helper';
import getRandomIntegerOnRange from '../../utils/random_integer_on_range';
import VectorHelper from '../../utils/vector_helper';
import DefaultActionExecutor from './default_action_executor';

export default class CreatureActionExecutor extends DefaultActionExecutor {
  protected context: Context;

  protected logger: Logger;

  constructor(context: Context, logger?: Logger) {
    super(logger);
    this.context = context;
    this.logger = logger !== undefined ? logger : new ConsoleLogger();

    this.logger.log(
      LogMessageLevel.Trace,
      LogMessageContext.EntityExecutor,
      `[CreatureEntityActionExecutorConstructor] Logger: ${this.logger.constructor.name}`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public execute(entity: Entity, action: Action): void {
    super.execute(entity, action);

    const creature = entity as Creature;

    switch (action.name) {
      case 'updateDesireToKillOrHeal':
        this.updateDesireToKillOrHeal(creature);
        break;
      case 'defineTarget':
        this.defineTarget(creature);
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
        this.logger.log(
          LogMessageLevel.Trace,
          LogMessageContext.Action,
          `[Entity:CreatureActionExecutor:execute] ${creature.id} Action not executed (${action.name}) on CreatureActionExecutor level`,
        );
        break;
    }
  }

  protected updateDesireToKillOrHeal(creature: Creature) {
    const desireToKillOrHeal = creature.getWill('kill_heal');
    const desireToKillOrHealValueOld = desireToKillOrHeal.getValue();

    desireToKillOrHeal.value += getRandomIntegerOnRange(-10, 10);

    this.logger.log(
      LogMessageLevel.Info,
      LogMessageContext.Action,
      `[updatreDesireToKillOrHeal] ${creature.id} desireToKillOrHeal ${desireToKillOrHealValueOld} => ${desireToKillOrHeal.value}`,
    );
  }

  protected defineTarget(creature: Creature) {
    switch (creature.getKillHealValue()) {
      case 'kill':
        this.setTargetToKill(creature);
        break;
      case 'heal':
        this.setTargetToHeal(creature);
        break;
      default:
        this.setRandomTarget(creature);
        break;
    }
  }

  protected setTargetToKill(creature: Creature) {
    const closerCreature = this.getCloserCreature(
      creature,
      this.context.entities as Creature[],
    );

    if (closerCreature === undefined) {
      this.logger.log(
        LogMessageLevel.Trace,
        LogMessageContext.Action,
        `[setTargetToKill] ${creature.id} no target was found`,
      );

      this.setRandomTarget(creature);
      return;
    }

    this.setTarget(creature, closerCreature);
  }

  protected setTargetToHeal(creature: Creature) {
    const allHurtCreatures = this.getAllHurtCreatures();
    const closerHurtCreature = this.getCloserCreature(
      creature,
      allHurtCreatures,
    );

    if (closerHurtCreature === undefined) {
      this.logger.log(
        LogMessageLevel.Trace,
        LogMessageContext.Action,
        `[setTargetToHeal] ${creature.id} no hurt target was found`,
      );

      this.setRandomTarget(creature);
      return;
    }

    this.setTarget(creature, closerHurtCreature);
  }

  protected setTarget(creature: Creature, targetCreature: Creature) {
    creature.target = new Vector([
      targetCreature.position.values[0],
      targetCreature.position.values[1],
    ]);

    if (creature.isDiferentTargetToSeek(targetCreature.id)) {
      creature.seekingCreatureId = targetCreature.id;

      this.logNewTarget(creature);
    }
  }

  protected setRandomTarget(creature: Creature) {
    creature.seekingCreatureId = undefined;
    if (getRandomIntegerOnRange(0, 14) === 2) {
      creature.target = new Vector([
        getRandomIntegerOnRange(100, 900),
        getRandomIntegerOnRange(100, 900),
      ]);

      this.logNewTarget(creature);
    }
  }

  protected logNewTarget(creature: Creature) {
    this.logger.log(
      LogMessageLevel.Trace,
      LogMessageContext.Action,
      `[defineTarget] ${creature.id} has taken a new target (${creature.target.values[0]}, ${creature.target.values[1]}); SeekingCreature: ${creature.seekingCreatureId}`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected getCloserCreature(
    creature: Creature,
    options: Creature[],
  ): Creature | undefined {
    let closerCreature: Creature | undefined;
    let closerCreatureDist: number;

    options.forEach((e) => {
      const c = e as Creature;
      const dist = VectorHelper.dist(c.position, creature.position);

      if (
        c.id !== creature.id &&
        (closerCreature === undefined || dist < closerCreatureDist)
      ) {
        closerCreature = c;
        closerCreatureDist = dist;
      }
    });

    return closerCreature;
  }

  protected move(creature: Creature) {
    const distToTarget = creature.position.substract(creature.target).length();

    creature.speed = creature.maxSpeed;
    const steringForce = creature.maxSteringForce;
    const acceleration = creature.maxAcceleration;

    if (distToTarget < creature.breakingRadius * creature.velocity.length()) {
      creature.speed = MathHelper.proportion(
        distToTarget,
        0,
        100,
        0,
        creature.maxSpeed,
      );
      this.logger.log(
        LogMessageLevel.Trace,
        LogMessageContext.Action,
        `[move] ${
          creature.id
        } started to break because of distToTarget < breakingRadius * creature.velocity.length(); distToTarget:${distToTarget}, breakingRadius:${
          creature.breakingRadius
        }, creature.velocity.length():${creature.velocity.length()}; Calculated speed: ${
          creature.speed
        }, maxSpeed: ${creature.maxSpeed}`,
      );
    }

    // Seek
    let desired = creature.target.substract(creature.position);
    desired = VectorHelper.setMag(desired, creature.speed);

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
      LogMessageLevel.Info,
      LogMessageContext.Action,
      `[move] ${creature.id} has moved to (${creature.x()}, ${creature.y()})`,
    );
  }

  protected hurtRandomCreatureBasedOnCreatureWill(creature: Creature) {
    if (creature.getKillHealValue() !== 'kill') return;

    this.hurt(creature, this.getRandomCreature());
  }

  protected hurt(creature: Creature, targetCreature: Creature) {
    const hurtAmount = getRandomIntegerOnRange(1, 10);

    targetCreature.life -= hurtAmount;
    this.logger.log(
      LogMessageLevel.Info,
      LogMessageContext.Action,
      `[hurt] ${creature.id} hurt ${targetCreature.id} this amount:${hurtAmount}; Target\`s life is now: ${targetCreature.life}`,
    );

    this.setCreatureAsDeadIfSo(creature as Creature);
  }

  protected healRandomHurtCreatureBasedOnCreatureWill(creature: Creature) {
    const randomHurtCreature = this.getRandomHurtCreature();

    if (
      creature.getKillHealValue() !== 'heal' ||
      randomHurtCreature === undefined
    ) {
      if (creature.getKillHealValue() === 'heal') {
        this.logger.log(
          LogMessageLevel.Trace,
          LogMessageContext.Action,
          `[heal] ${
            creature.id
          } wants to heal someone (desireToKillOrHeal: ${creature
            .getWill('kill_heal')
            .getValue()}) but there was no creature hurted`,
        );
      }
      return;
    }

    this.heal(creature, randomHurtCreature);
  }

  protected heal(creature: Creature, healed: Creature) {
    const healingAmount = getRandomIntegerOnRange(1, 10);

    healed.life += healingAmount;
    if (healed.life > 100) healed.life = 100;

    this.logger.log(
      LogMessageLevel.Info,
      LogMessageContext.Action,
      `[heal] ${creature.id} heals ${healed.id} this amount:${healingAmount}; Healed\`s life is now: ${healed.life}`,
    );
  }

  protected setCreatureAsDeadIfSo(creature: Creature) {
    creature.isDead = creature.life <= 0;

    if (creature.isDead) {
      this.logger.log(
        LogMessageLevel.Info,
        LogMessageContext.Action,
        `[setCreatureAsDeadIfSo] ${creature.id} was set to dead; life: ${creature.life}`,
      );
    }
  }

  protected getRandomCreature(): Creature {
    const randomIndex = getRandomIntegerOnRange(
      0,
      this.context.entities.length - 1,
    );

    return this.context.entities[randomIndex] as Creature;
  }

  protected getRandomHurtCreature(): Creature | undefined {
    const allHurtEntitites = this.getAllHurtCreatures();

    if (allHurtEntitites.length === 0) return undefined;

    return allHurtEntitites[
      getRandomIntegerOnRange(0, allHurtEntitites.length - 1)
    ];
  }

  protected getAllHurtCreatures(): Creature[] {
    return this.context.entities
      .filter((entity) => (entity as Creature).life < 100)
      .map((e) => e as Creature);
  }
}
