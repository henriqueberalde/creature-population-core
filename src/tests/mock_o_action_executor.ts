import { Action } from '../entities';
import ActionExecutor from '../executors/orchestrator/action_executor';

export default class MockOrchestratorActionExecutor extends ActionExecutor {
  public orderCalled: string[] = [];

  // eslint-disable-next-line class-methods-use-this
  public override execute(action: Action): void {
    this.orderCalled.push(action.name);
  }
}
