import Action from '../../entities/action';
import Entity from '../../entities/entity';
import ActionExecutor from './action_executor';

export default class DefaultActionExecutor extends ActionExecutor {
  // eslint-disable-next-line class-methods-use-this
  public execute(entity: Entity, action: Action): void {
    switch (action.name) {
      case 'getOld':
        // eslint-disable-next-line no-param-reassign
        entity.age += 1;
        break;
      default:
        break;
    }
  }
}
