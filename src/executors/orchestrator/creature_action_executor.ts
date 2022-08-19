import Action from '../../entities/action';
import Creature from '../../entities/creature';
import DefaultActionExecutor from './default_action_executor';

export default class CreatureActionExecutor extends DefaultActionExecutor {
  public execute(action: Action): void {
    switch (action.name) {
      case 'removeDeadCreatures':
        this.removeDeadCreatures();
        break;
      default:
        break;
    }
  }

  private removeDeadCreatures(): void {
    const idsToRemove: string[] = this.context.entities
      .filter((e) => (e as Creature).life <= 0)
      .map((e) => e.id);

    idsToRemove.forEach((id) => {
      const entityFound = this.context.entities.find((e) => e.id === id);

      if (entityFound === undefined) {
        throw Error(`Can\`t remove ${id} because it couln\`t be found`);
      }

      const index = this.context.entities.indexOf(entityFound);
      this.context.entities.splice(index, 1);
      this.logger.logAndIgnoreVerbose(`${id} is dead!!!`);
    });
  }
}
