import { Action, Entity } from '../../../../entities';
import DefaultActionExecutor from '../../../../executors/entity/default_action_executor';

const oneCycleAgeAction = new Action('getOld', 1, 1);

describe('EntityDefaultActionExecutor', () => {
  describe('execute', () => {
    describe('getOld', () => {
      it('when called then adds 1 on entity`s age', () => {
        const executor = new DefaultActionExecutor();
        const entity = new Entity('E1', [oneCycleAgeAction]);

        executor.execute(entity, oneCycleAgeAction);

        expect(entity.age).toBe(1);
      });
    });
  });
});
