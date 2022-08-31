import Action from '../../entities/action';
import Context from '../../entities/context';
import Creature from '../../entities/creature';
import { Logger, LogMessageContext, LogMessageLevel } from '../../utils/logger';
import DefaultActionExecutor from './default_action_executor';

export default class CreatureActionExecutor extends DefaultActionExecutor {
  constructor(context: Context, logger?: Logger) {
    super(context, logger);

    this.logger.log(
      LogMessageLevel.Trace,
      LogMessageContext.OrchestratorExecutor,
      `[CreatureOrchestratorActionExecutorContructor] Logger: ${this.logger.constructor.name}`,
    );
  }

  public execute(action: Action): void {
    switch (action.name) {
      case 'removeDeadCreatures':
        this.removeDeadCreatures();
        break;
      default:
        this.logger.log(
          LogMessageLevel.Trace,
          LogMessageContext.Action,
          `[Orchestrator:CreatureActionExecutor:execute] Action not executed (${action.name}) on CreatureActionExecutor level`,
        );
        break;
    }
  }

  private removeDeadCreatures(): void {
    const idsToRemove: string[] = this.context.entities
      .filter((e) => (e as Creature).isDead)
      .map((e) => e.id);

    const idsToRemoveMessage = idsToRemove.join(', ');

    if (idsToRemove.length > 0) {
      this.logger.log(
        LogMessageLevel.Info,
        LogMessageContext.Action,
        `[removeDeadCreatures] ${idsToRemove.length} creatures are being removed; Ids: (${idsToRemoveMessage})`,
      );
    }

    idsToRemove.forEach((id) => {
      const entityFound = this.context.entities.find((e) => e.id === id);

      if (entityFound === undefined) {
        throw Error(`Can\`t remove ${id} because it couln\`t be found`);
      }

      const index = this.context.entities.indexOf(entityFound);
      this.context.entities.splice(index, 1);
    });
  }
}
