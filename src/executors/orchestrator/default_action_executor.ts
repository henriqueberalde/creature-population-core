import Action from '../../entities/action';
import Context from '../../entities/context';
import Logger from '../../utils/logger';
import ConsoleLogger from '../../utils/console_logger';
import ActionExecutor from './action_executor';

export default class DefaultActionExecutor extends ActionExecutor {
  protected context: Context;

  protected logger: Logger;

  constructor(context: Context, logger?: Logger) {
    super();
    this.context = context;
    this.logger = logger !== undefined ? logger : new ConsoleLogger();
  }

  public execute(action: Action): void {
    this.logger.log(
      `If you are trying to use orchestrator actions implements OrchestratorAction interface and set orchestratorActionExecutor property of orchestrator object. This class can not execute ${action.name}`,
    );
  }
}
