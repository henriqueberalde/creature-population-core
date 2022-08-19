import Action from '../../entities/action';
import Entity from '../../entities/entity';

export default abstract class ActionExecutor {
  abstract execute(entity: Entity, action: Action): void;
}
