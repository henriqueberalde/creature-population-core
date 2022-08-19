import Context from './entities/context';
import Entity from './entities/entity';
import pauseTime from './utils/pause_time';
import isContextEntitiesEmpty from './utils/is_context_entities_empty';
import Action from './entities/action';
import EDefaultActionExecutor from './executors/entity/default_action_executor';
import EntityActionExecutor from './executors/entity/action_executor';
import ODefaultActionExecutor from './executors/orchestrator/default_action_executor';
import OrchestratorActionExecutor from './executors/orchestrator/action_executor';
import Logger from './utils/logger';
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

    sortedUniquePriorities.forEach((priority) => {
      this.executeActionsByPriorityAndCycle(priority);
      this.executeEntitiesActionsByPriorityAndCycle(priority);
    });

    if (this.isEndOfGame(this.context)) this.stop = true;

    this.logger.logTableAndIgnoreVerbose(this.context.entities);
    this.context.currentCycle += 1;
  }

  public executeActionsByPriorityAndCycle(priority: number) {
    const actionsToExecute = this.actions.filter(
      (a) => a.priority === priority && this.isValidCycle(a.cicleAmount),
    );

    // eslint-disable-next-line arrow-body-style
    actionsToExecute.forEach((action) => {
      return this.orchestratorActionExecutor.execute(action);
    });
  }

  public executeEntitiesActionsByPriorityAndCycle(priority: number): void {
    this.context.entities.forEach((entity) => {
      const actionsToExecute = entity.actions.filter(
        (a) => a.priority === priority && this.isValidCycle(a.cicleAmount),
      );

      this.executeEntityActions(entity, actionsToExecute);
    });
  }

  public executeEntityActions(entity: Entity, actions: Action[]): void {
    // eslint-disable-next-line arrow-body-style
    actions.forEach((action) => {
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
