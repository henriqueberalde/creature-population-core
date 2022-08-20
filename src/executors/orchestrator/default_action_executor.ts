import Action from '../../entities/action';
import Context from '../../entities/context';
import { Logger, LogMessageContext, LogMessageLevel } from '../../utils/logger';
import ConsoleLogger from '../../utils/console_logger';
import ActionExecutor from './action_executor';

export default class DefaultActionExecutor extends ActionExecutor {
  protected context: Context;

  protected logger: Logger;

  constructor(context: Context, logger?: Logger) {
    super();
    this.context = context;
    this.logger = logger !== undefined ? logger : new ConsoleLogger();

    this.logger.log(
      LogMessageLevel.Trace,
      LogMessageContext.OrchestratorExecutor,
      `[DefaultOrchestratorActionExecutorContructor] Logger: ${this.logger.constructor.name}`,
    );
  }

  public execute(action: Action): void {
    this.logger.log(
      LogMessageLevel.Warn,
      LogMessageContext.OrchestratorExecutor,
      `[DefaultActionExecutor] If you are trying to use orchestrator actions implements OrchestratorAction interface and set orchestratorActionExecutor property of orchestrator object. The action ${action.name} was not handle at this instance`,
    );
  }
}
