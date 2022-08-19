import Action from '../../entities/action';

export default abstract class ActionExecutor {
  abstract execute(action: Action): void;
}
