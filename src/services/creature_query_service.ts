import Creature from '../models/creature';
import getRandomInteger from '../models/helpers/integer';
import { logAndIgnoreVerbose } from '../models/helpers/log';
import Context from '../models/context';

export default class CreatureQueryService {
  public static removeDeadCreatures(context: Context) {
    const idsToRemove: string[] = context.entities
      .filter((e) => (e as Creature).life <= 0)
      .map((e) => e.id);

    idsToRemove.forEach((id) => {
      const entityFound = context.entities.find((e) => e.id === id);

      if (entityFound === undefined) {
        throw Error(`Can\`t remove ${id} because it couln\`t be found`);
      }

      const index = context.entities.indexOf(entityFound);
      context.entities.splice(index, 1);
      logAndIgnoreVerbose(`${id} is dead!!!`);
    });
  }

  public static getRandomHurtCreature(context: Context): Creature | undefined {
    const allHurtEntitites = CreatureQueryService.getAllHurtCreatures(context);

    if (allHurtEntitites.length === 0) return undefined;

    return allHurtEntitites[getRandomInteger(0, allHurtEntitites.length - 1)];
  }

  public static getRandomCreature(context: Context): Creature {
    const randomIndex = getRandomInteger(0, context.entities.length - 1);

    return context.entities[randomIndex] as Creature;
  }

  public static getAllHurtCreatures(context: Context): Creature[] {
    return context.entities
      .filter((entity) => (entity as Creature).life < 100)
      .map((e) => e as Creature);
  }
}
