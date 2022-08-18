import Context from '../models/context';
import Entity from '../models/entity';
import EntityService from './entity_service';
import pauseTime from '../models/helpers/time';
import { logTableAndIgnoreVerbose } from '../models/helpers/log';

export default class Orchestrator<T extends EntityService> {
  private stop = false;

  private context;

  private type: {
    new (entity: Entity, context: Context): T;
    isEndOfGame: Function;
  };

  constructor(
    type: { new (entity: Entity, context: Context): T; isEndOfGame: Function },
    entities: Entity[],
  ) {
    this.context = new Context(entities);
    this.type = type;
  }

  public executeTurnRecursive(delay: number) {
    pauseTime(delay);
    this.executeTurn();

    if (!this.stop) {
      this.executeTurnRecursive(delay);
    }
  }

  public executeTurn() {
    this.context.entities.forEach((entity) => {
      // eslint-disable-next-line new-cap
      const service = new this.type(entity, this.context);
      service.calculateWills();
      service.doActions();
    });

    this.context.entities.forEach((entity) => {
      // eslint-disable-next-line new-cap
      const service = new this.type(entity, this.context);
      service.doPostActions();
    });

    if (this.type.isEndOfGame(this.context)) this.stop = true;

    logTableAndIgnoreVerbose(this.context.entities);
  }
}
