import Action from '../../entities/action';
import Entity from '../../entities/entity';
import ConsoleLogger from '../../utils/console_logger';
import { Logger, LogMessageContext, LogMessageLevel } from '../../utils/logger';
import ActionExecutor from './action_executor';

export default class DefaultActionExecutor extends ActionExecutor {
  protected logger: Logger;

  constructor(logger?: Logger) {
    super();
    this.logger = logger !== undefined ? logger : new ConsoleLogger();

    this.logger.log(
      LogMessageLevel.Trace,
      LogMessageContext.EntityExecutor,
      `[DefaultEntityActionExecutorConstructor] Logger: ${this.logger.constructor.name}`,
    );
  }

  public execute(entity: Entity, action: Action): void {
    switch (action.name) {
      case 'getOld':
        // eslint-disable-next-line no-param-reassign
        entity.age += 1;

        this.logger.log(
          LogMessageLevel.Info,
          LogMessageContext.Action,
          `[getOld] ${entity.id} got old. Now it is ${entity.age}`,
        );
        break;
      default:
        break;
    }
  }
}
