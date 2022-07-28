import Entity from '../../models/entity';
import Event, { EventType } from '../../models/event';

let entityWithOneField: Entity;
let entityWithAge10: Entity;

beforeEach(() => {
  entityWithOneField = new Entity({
    id: 'E1',
    fields: [{ key: 'firstField', value: 'firstValue' }],
  });
  entityWithAge10 = new Entity({
    id: 'E2',
    fields: [{ key: 'age', value: '10' }],
  });
});

describe('Entity', () => {
  describe('executeEvent', () => {
    it('WHEN called THEN event name function is called', () => {
      entityWithAge10.executeEvent(new Event(EventType.Entity, 'getOld'));
      expect(entityWithAge10.getField('age')?.value).toBe('11');
    });
    it('WHEN no event with the name is found THEN Throws NoEvent found error', () => {
      expect(() => {
        entityWithAge10.executeEvent(
          new Event(EventType.Entity, 'notFoundEvent'),
        );
      }).toThrowError("Event 'notFoundEvent' not found on object 'Entity'");
    });
  });

  describe('setField', () => {
    it('WHEN called THEN the field with the key is set with the value', () => {
      const newValue = 'newFirstValue';
      entityWithOneField.setField('firstField', newValue);
      expect(entityWithOneField.getField('firstField')?.value).toBe(newValue);
    });
    it('WHEN no key is found THEN Throws NoField error', () => {
      expect(() => {
        entityWithOneField.setField('notFoundField', 'anyValue');
      }).toThrowError(
        "Field 'notFoundField' not found on Entity`s 'E1' fields list",
      );
    });
  });

  describe('getField', () => {
    it('WHEN called THEN returns the value of the field key', () => {
      expect(entityWithOneField.getField('firstField')?.value).toBe(
        'firstValue',
      );
    });
    it('WHEN no key is found THEN Throws NoField error', () => {
      expect(() => {
        entityWithOneField.getField('notFoundField');
      }).toThrowError(
        "Field 'notFoundField' not found on Entity`s 'E1' fields list",
      );
    });
  });
});
