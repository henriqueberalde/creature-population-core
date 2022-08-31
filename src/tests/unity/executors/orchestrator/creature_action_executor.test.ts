import { Action, Context, Creature } from '../../../../entities';
import CreatureActionExecutor from '../../../../executors/orchestrator/creature_action_executor';

let context: Context;

describe('OrchestratorCreatureActionExecutor', () => {
  describe('execute', () => {
    describe('removeDeadCreatures', () => {
      it('when called then removes all dead entities', () => {
        const c1 = new Creature('C1', 1, 1);
        const c2 = new Creature('C2', 1, 1);
        const c3 = new Creature('C3', 1, 1);
        const c4 = new Creature('C4', 1, 1);
        const c5 = new Creature('C5', 1, 1);

        c2.isDead = true;
        c3.isDead = true;
        c4.isDead = true;

        const entities = [c1, c2, c3, c4, c5];
        context = new Context(entities);
        const executor = new CreatureActionExecutor(context);

        executor.execute(new Action('removeDeadCreatures', 3, 1));

        expect(context.entities).toMatchObject([c1, c5]);
      });
    });
  });
});
