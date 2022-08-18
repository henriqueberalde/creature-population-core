import EntityService from './entity_service';
import Creature from '../models/creature';
import getRandomInteger from '../models/helpers/integer';
import { log, logAndIgnoreVerbose } from '../models/helpers/log';
import limitCartesianValue, {
  maxCartesianValue,
} from '../models/helpers/catesian';
import CreatureQueryService from './creature_query_service';

export default class CreatureService extends EntityService {
  public override calculateWills() {
    super.calculateWills();

    this.calculateCreatureWills();
  }

  public override doActions() {
    super.doActions();

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
    this.hurtRandomCreatureBasedOnCreatureWill();
    this.healRandomHurtCreatureBasedOnCreatureWill();
  }

  public moveCreature() {
    const creature = this.entity as Creature;
    const directions = ['N', 'L', 'S', 'W'];
    const chosenDirection = directions[getRandomInteger(0, 3)];

    switch (chosenDirection) {
      case 'N':
        creature.y = limitCartesianValue(creature.y, 5, maxCartesianValue);
        break;
      case 'L':
        creature.x = limitCartesianValue(creature.x, 5, maxCartesianValue);
        break;
      case 'S':
        creature.y = limitCartesianValue(creature.y, -5, maxCartesianValue);
        break;
      case 'W':
        creature.x = limitCartesianValue(creature.x, -5, maxCartesianValue);
        break;
      default:
        break;
    }
    log(
      `${creature.id} has moved to ${chosenDirection}, now it is at (${creature.x}, ${creature.y})`,
    );
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
