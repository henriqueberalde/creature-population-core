import { Vector } from 'ts-matrix';
import EntityService from './entity_service';
import Creature from '../models/creature';
import getRandomInteger from '../models/helpers/integer';
import { log, logAndIgnoreVerbose } from '../models/helpers/log';
import CreatureQueryService from './creature_query_service';
import MathHelper from '../models/helpers/math_helper';
import VectorHelper from '../models/helpers/vector_helper';

export default class CreatureService extends EntityService {
  public override calculateWills() {
    super.calculateWills();

    this.calculateCreatureWills();
  }

  public override doActions() {
    if (this.context.currentCycle % 3 === 0) {
      super.doActions();
    }

    this.doCreatureActions();
  }

  public override doPostActions() {
    CreatureQueryService.removeDeadCreatures(this.context);
  }

  public calculateCreatureWills() {
    const creature = this.entity as Creature;
    const desireToKillOld = creature.desireToKill;
    const desireToHealOld = creature.desireToHeal;

    creature.desireToKill += getRandomInteger(-10, 10);
    creature.desireToHeal += getRandomInteger(-10, 10);

    log('Wills');
    log(
      `${creature.id} DesireToKill ${desireToKillOld} => ${creature.desireToKill}`,
    );
    log(
      `${creature.id} DesireToHeal ${desireToHealOld} => ${creature.desireToHeal}`,
    );
  }

  public doCreatureActions() {
    this.moveCreature();

    if (this.context.currentCycle % 3 === 0) {
      this.hurtRandomCreatureBasedOnCreatureWill();
      this.healRandomHurtCreatureBasedOnCreatureWill();
    }
  }

  public moveCreature() {
    const creature = this.entity as Creature;
    const distToTarget = creature.position.substract(creature.target).length();

    // Decide Target

    if (getRandomInteger(0, 14) === 2) {
      const x = getRandomInteger(100, 900);
      const y = getRandomInteger(100, 900);
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

    log(`${creature.id} has moved to (${creature.x()}, ${creature.y()})`);
  }

  public hurtRandomCreatureBasedOnCreatureWill() {
    if ((this.entity as Creature).desireToKill <= 20) return;

    this.hurt(CreatureQueryService.getRandomCreature(this.context));
  }

  public hurt(targetCreature: Creature) {
    const hurtAmount = getRandomInteger(1, 10);
    const stringHurtAmount = Array(hurtAmount + 1).join('#');

    // eslint-disable-next-line no-param-reassign
    targetCreature.life -= hurtAmount;
    logAndIgnoreVerbose(
      `${stringHurtAmount} ${this.entity.id} is hurting ${targetCreature.id}; Target\`s life is now: ${targetCreature.life} ${stringHurtAmount}`,
    );
  }

  public healRandomHurtCreatureBasedOnCreatureWill() {
    const randomHurtCreature = CreatureQueryService.getRandomHurtCreature(
      this.context,
    );

    if (
      (this.entity as Creature).desireToHeal <= 20 ||
      randomHurtCreature === undefined
    ) {
      return;
    }

    this.heal(randomHurtCreature);
  }

  public heal(healed: Creature) {
    const healer = this.entity as Creature;
    const healingAmount = getRandomInteger(1, 10);
    const stringHealingAmount = Array(healingAmount + 1).join('@');
    // eslint-disable-next-line no-param-reassign
    healed.life += healingAmount;

    // eslint-disable-next-line no-param-reassign
    if (healed.life > 100) healed.life = 100;

    logAndIgnoreVerbose(
      `${stringHealingAmount} ${healer.id} is healing ${healed.id}; Healed\`s life is now: ${healed.life} ${stringHealingAmount}`,
    );
  }
}
