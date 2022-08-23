import { Action, Entity } from '../entities';
import Orchestrator from '../orchestrator';
import MockOrchestratorActionExecutor from './mock_o_action_executor';

let entities: Entity[];
let actions: Action[] = [];
let mockOActionExecutor: MockOrchestratorActionExecutor;
let orchestrator: Orchestrator;
const oneCycleAgeAction = new Action('getOld', 1, 1);

beforeEach(() => {
  entities = [];
  actions = [];
  mockOActionExecutor = new MockOrchestratorActionExecutor();
});

describe('Orchestrator', () => {
  describe('executeTurnRecursive', () => {
    it('don`t know how to test it', () => {
      expect(true).toBe(true);
    });
  });
  describe('executeTurn', () => {
    describe('Orchestrator Actions', () => {
      it('When many repeated priorities then execute only one of each', () => {
        actions = [
          new Action('FirstAction', 1, 1),
          new Action('SecondAction', 1, 1),
          new Action('ThirdAction', 1, 1),
        ];
        orchestrator = new Orchestrator(
          entities,
          actions,
          undefined,
          undefined,
          mockOActionExecutor,
        );

        orchestrator.executeTurn();

        expect(mockOActionExecutor.orderCalled.length).toBe(3);
      });
      it('When many priorities then execute them on order', () => {
        actions = [
          new Action('FirstPriorityAction', 1, 1),
          new Action('SecondPriorityAction', 2, 1),
          new Action('ThirdPriorityAction', 3, 1),
        ];
        orchestrator = new Orchestrator(
          entities,
          actions,
          undefined,
          undefined,
          mockOActionExecutor,
        );

        orchestrator.executeTurn();

        // Use log to test it
        expect(mockOActionExecutor.orderCalled).toMatchObject([
          'FirstPriorityAction',
          'SecondPriorityAction',
          'ThirdPriorityAction',
        ]);
      });
      it('When called then filter actions cycle', () => {
        actions = [
          new Action('Cycle1Action', 1, 1),
          new Action('Cycle3Action', 1, 3),
        ];
        orchestrator = new Orchestrator(
          entities,
          actions,
          undefined,
          undefined,
          mockOActionExecutor,
        );

        orchestrator.executeTurn();
        orchestrator.executeTurn();
        orchestrator.executeTurn();

        expect(mockOActionExecutor.orderCalled).toMatchObject([
          'Cycle1Action',
          'Cycle1Action',
          'Cycle1Action',
          'Cycle3Action',
        ]);
      });
    });

    describe('Entity Actions', () => {
      it('When called then execute once per entity', () => {
        entities.push(
          new Entity('E1', [oneCycleAgeAction]),
          new Entity('E2', [oneCycleAgeAction]),
          new Entity('E3', [oneCycleAgeAction]),
        );
        orchestrator = new Orchestrator(entities, actions);

        orchestrator.executeTurn();

        expect(entities[0].age).toBe(1);
        expect(entities[1].age).toBe(1);
        expect(entities[2].age).toBe(1);
      });
    });
    it('When isEndOfGame returns true then stop executing turns', () => {
      entities.push(new Entity('E1', [oneCycleAgeAction]));
      orchestrator = new Orchestrator(
        entities,
        actions,
        undefined,
        undefined,
        undefined,
        undefined,
        () => true,
      );

      orchestrator.executeTurnRecursive(1);

      expect(entities[0].age).toBe(1);
    });
  });
});
