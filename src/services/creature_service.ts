import getRandomInteger from '../models/helpers/integer';
import EntityService from './entity_service';
import Creature from '../models/creature';
import { log } from '../models/helpers/log';

export default class CreatureService extends EntityService {
  public override calculateWills() {
    super.calculateWills();
    this.calculateCreatureWills();
  }

  public override doActions() {
    super.doActions();
    this.doCreatureActions();
  }

  private calculateCreatureWills() {
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

  private doCreatureActions() {
    const creature = this.entity as Creature;

    if (creature.desireToKill > 20) {
      const targetCreature = this.getRandomCreature();

      this.hurt(targetCreature);

      if (targetCreature.life < 0) {
        console.log(`${targetCreature.id} is dead!!!`);
        this.context.entities.splice(
          this.context.entities.indexOf(targetCreature),
          1,
        );
      }
    }

    const hurtEntities = this.getAllHurtEntities();
    if (hurtEntities && hurtEntities.length > 0 && creature.desireToHeal > 20) {
      this.heal(this.getRandomHurtCreature());
    }
  }

  private hurt(targetCreature: Creature) {
    const hurtAmount = getRandomInteger(1, 10);
    const stringHurtAmount = Array(hurtAmount + 1).join('#');

    // eslint-disable-next-line no-param-reassign
    targetCreature.life -= hurtAmount;
    console.log(
      `${stringHurtAmount} ${this.entity.id} is hurting ${targetCreature.id}; Target\`s life is now: ${targetCreature.life} ${stringHurtAmount}`,
    );
  }

  private heal(healed: Creature) {
    const healer = this.entity as Creature;
    const healingAmount = getRandomInteger(1, 10);
    const stringHealingAmount = Array(healingAmount + 1).join('@');
    // eslint-disable-next-line no-param-reassign
    healed.life += healingAmount;

    // eslint-disable-next-line no-param-reassign
    if (healed.life > 100) healed.life = 100;

    console.log(
      `${stringHealingAmount} ${healer.id} is healing ${healed.id}; Healed\`s life is now: ${healed.life} ${stringHealingAmount}`,
    );
  }

  private getAllHurtEntities(): Creature[] {
    const hurtOnes: Creature[] = [];

    this.context.entities.forEach((entity) => {
      if ((entity as Creature).life < 100) {
        hurtOnes.push(entity as Creature);
      }
    });
    return hurtOnes;
  }

  private getRandomHurtCreature(): Creature {
    const allHurtEntitites = this.getAllHurtEntities();
    const randomIndex = getRandomInteger(0, allHurtEntitites.length - 1);

    return allHurtEntitites[randomIndex];
  }

  private getRandomCreature(): Creature {
    const randomIndex = getRandomInteger(0, this.context.entities.length - 1);

    return this.context.entities[randomIndex] as Creature;
  }
}
