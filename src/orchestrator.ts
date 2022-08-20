import Context from './entities/context';
import Entity from './entities/entity';
import pauseTime from './utils/pause_time';
import isContextEntitiesEmpty from './utils/is_context_entities_empty';
import Action from './entities/action';
import EDefaultActionExecutor from './executors/entity/default_action_executor';
import EntityActionExecutor from './executors/entity/action_executor';
import ODefaultActionExecutor from './executors/orchestrator/default_action_executor';
import OrchestratorActionExecutor from './executors/orchestrator/action_executor';
import { Logger, LogMessageContext, LogMessageLevel } from './utils/logger';
import ConsoleLogger from './utils/console_logger';

export default class Orchestrator {
  private stop = false;

  private context;

  private isEndOfGame: { (context: Context): boolean };

  private actions: Action[] = [];

  private entityActionExecutor: EntityActionExecutor;

  private orchestratorActionExecutor: OrchestratorActionExecutor;

  private logger: Logger;

  constructor(entities: Entity[]);
  constructor(entities: Entity[], actions: Action[]);
  constructor(
    entities: Entity[],
    actions?: Action[],
    context?: Context,
    entityActionExecutor?: EntityActionExecutor,
    orchestratorActionExecutor?: OrchestratorActionExecutor,
    logger?: Logger,
    isEndOfGame?: { (context: Context): boolean },
  );
  constructor(
    entities: Entity[],
    actions?: Action[],
    context?: Context,
    entityActionExecutor?: EntityActionExecutor,
    orchestratorActionExecutor?: OrchestratorActionExecutor,
    logger?: Logger,
    isEndOfGame?: { (context: Context): boolean },
  ) {
    this.context = context !== undefined ? context : new Context(entities);
    this.isEndOfGame =
      isEndOfGame !== undefined ? isEndOfGame : isContextEntitiesEmpty;
    this.entityActionExecutor =
      entityActionExecutor !== undefined
        ? entityActionExecutor
        : new EDefaultActionExecutor();

    this.orchestratorActionExecutor =
      orchestratorActionExecutor !== undefined
        ? orchestratorActionExecutor
        : new ODefaultActionExecutor(this.context);

    this.logger = logger !== undefined ? logger : new ConsoleLogger();

    if (actions) this.actions = actions;

    this.logger.log(
      LogMessageLevel.Trace,
      LogMessageContext.Orchestrator,
      `[OrchestratorContructor] Entities.length:${
        entities.length
      }, actions:(${this.actions?.map((a) => a.name).join(', ')}), context:${
        this.context.constructor.name
      }, entityActionExecutor:${
        this.entityActionExecutor.constructor.name
      }, orchestratorActionExecutor:${
        this.orchestratorActionExecutor.constructor.name
      }, logger:${this.logger.constructor.name}`,
    );
  }

  public executeTurnRecursive(delay: number) {
    pauseTime(delay);
    this.executeTurn();

    if (!this.stop) {
      this.executeTurnRecursive(delay);
    }
  }

  public executeTurn() {
    const sortedUniquePriorities = this.sortedUniquePriorities();

    this.logger.log(
      LogMessageLevel.Trace,
      LogMessageContext.Orchestrator,
      `[executeTurn] Executing Turn; Cycle:${
        this.context.currentCycle
      }, Priorities:(${sortedUniquePriorities.join(', ')})`,
    );

    sortedUniquePriorities.forEach((priority) => {
      this.logger.log(
        LogMessageLevel.Trace,
        LogMessageContext.Orchestrator,
        `[executeTurn] Executing Priority:${priority}`,
      );
      this.executeOrchestratorActionsByPriorityAndCycle(priority);
      this.executeEntitiesActionsByPriorityAndCycle(priority);
    });

    if (this.isEndOfGame(this.context)) this.stop = true;

    this.context.currentCycle += 1;
  }

  public executeOrchestratorActionsByPriorityAndCycle(priority: number) {
    const actionsToExecute = this.actions.filter(
      (a) => a.priority === priority && this.isValidCycle(a.cicleAmount),
    );

    if (actionsToExecute.length > 0) {
      this.logger.log(
        LogMessageLevel.Trace,
        LogMessageContext.Orchestrator,
        `[executeOrchestratorActionsByPriorityAndCycle] Orchestrator Actions to execute:(${actionsToExecute
          .map((a) => a.name)
          .join(', ')}), priority:${priority}, cycle:${
          this.context.currentCycle
        }, all actions:(${this.actions.map((a) => a.name).join(', ')})`,
      );
    }

    // eslint-disable-next-line arrow-body-style
    actionsToExecute.forEach((action) => {
      this.logger.log(
        LogMessageLevel.Trace,
        LogMessageContext.Orchestrator,
        `[executeOrchestrationActions] Executing action; Action:${action.name}`,
      );
      return this.orchestratorActionExecutor.execute(action);
    });
  }

  public executeEntitiesActionsByPriorityAndCycle(priority: number): void {
    this.context.entities.forEach((entity) => {
      const actionsToExecute = entity.actions.filter(
        (a) => a.priority === priority && this.isValidCycle(a.cicleAmount),
      );

      this.logger.log(
        LogMessageLevel.Trace,
        LogMessageContext.Orchestrator,
        `[executeEntitiesActionsByPriorityAndCycle] Entity Actions to execute:(${actionsToExecute
          .map((a) => a.name)
          .join(', ')}), entity:${entity.id}, priority:${priority}, cycle:${
          this.context.currentCycle
        }, all actions:(${entity.actions.map((a) => a.name).join(', ')})`,
      );

      this.executeEntityActions(entity, actionsToExecute);
    });
  }

  public executeEntityActions(entity: Entity, actions: Action[]): void {
    // eslint-disable-next-line arrow-body-style
    actions.forEach((action) => {
      this.logger.log(
        LogMessageLevel.Trace,
        LogMessageContext.Orchestrator,
        `[executeEntityActions] Executing entity action; Entity:${entity.id}, action:${action.name}`,
      );
      return this.entityActionExecutor.execute(entity, action);
    });
  }

  public isValidCycle(cycleAmount: number) {
    return this.context.currentCycle % cycleAmount === 0;
  }

  private sortedUniquePriorities(): number[] {
    const allPriorities: number[] = [];

    this.context.entities.forEach((e) => {
      e.actions.forEach((a) => {
        allPriorities.push(a.priority);
      });
    });

    this.actions.forEach((a) => {
      allPriorities.push(a.priority);
    });

    const uniquePriorities = [...new Set(allPriorities)];
    return uniquePriorities.sort();
  }
}
