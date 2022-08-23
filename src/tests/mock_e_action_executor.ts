import { Action, Entity } from '../entities';
import ActionExecutor from '../executors/entity/action_executor';

export default class MockOrchestratorActionExecutor extends ActionExecutor {
  public orderCalled: string[] = [];

  // eslint-disable-next-line class-methods-use-this
  public override execute(entity: Entity, action: Action): void {
    this.orderCalled.push(action.name);
  }
}
