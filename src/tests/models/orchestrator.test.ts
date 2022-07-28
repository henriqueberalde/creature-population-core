import Entity from '../../models/entity';
import Event, { EventType } from '../../models/event';
import Orchestrator from '../../models/orchestrator';

let orchestrator: Orchestrator;

beforeEach(() => {
  orchestrator = new Orchestrator();
});

describe('Orchestrator', () => {
  describe('pushEntity', () => {
    it('WHEN called THEN adds an entity on entity`s list', () => {
      orchestrator.pushEntity(new Entity({}));
      expect(orchestrator.getEntities().length).toBe(1);
    });
  });
  describe('getEntities', () => {
    it('WHEN called THEN returns entities list', () => {
      const entity = new Entity({ id: 'E1' });
      const entities = [entity];
      orchestrator.pushEntity(entity);
      expect(orchestrator.getEntities()).toMatchObject(entities);
    });
  });
  describe('removeEntity', () => {
    it('WHEN called THEN removes entity from entities list', () => {
      orchestrator.pushEntity(new Entity({ id: 'E1' }));
      orchestrator.removeEntity('E1');
      expect(orchestrator.getEntities().length).toBe(0);
    });
  });
  describe('executeEvent', () => {
    describe('EventType Entity', () => {
      it('WHEN called THEN event name function of entity is called', () => {
        const getOldEvent = new Event(EventType.Entity, 'getOld');
        const entity = new Entity({
          events: [getOldEvent],
          fields: [{ key: 'age', value: '10' }],
        });
        orchestrator.pushEntity(entity);
        orchestrator.executeEvent(getOldEvent, entity);
        expect(entity.getField('age')?.value).toBe('11');
      });
    });
    describe('EventType Orchestrator', () => {
      it('WHEN called THEN event name function is called on Orchestrator', () => {
        const infoEvent = new Event(EventType.Orchestrator, 'info');
        const entity = new Entity({
          events: [infoEvent],
        });
        orchestrator.pushEntity(entity);
        expect(() => {
          orchestrator.executeEvent(infoEvent, entity);
        }).not.toThrowError();
      });
      it('WHEN no event with the name is found THEN Throws NoEvent found error', () => {
        expect(() => {
          const notFoundEvent = new Event(
            EventType.Orchestrator,
            'notFoundEvent',
          );
          const entity = new Entity({
            events: [notFoundEvent],
          });
          orchestrator.pushEntity(entity);
          orchestrator.executeEvent(notFoundEvent, entity);
        }).toThrowError(
          "Event 'notFoundEvent' not found on object 'Orchestrator'",
        );
      });
    });
  });
});
