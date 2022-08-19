import { Context, Creature } from '../../models';
import { CreatureService } from '../../services';

let service: CreatureService;
let creature: Creature;
let context: Context;

beforeEach(() => {
  creature = new Creature('C1', 100, 100);
  context = new Context([]);
});

describe('CreatureService', () => {
  describe('calculateWills', () => {
    it('WHEN called THEN changes properties randomicly', () => {
      const desireToHealOld = creature.desireToHeal;
      const desireToKillOld = creature.desireToKill;

      context.entities.push(creature);
      service = new CreatureService(creature, context);

      service.calculateWills();

      expect(creature.desireToKill).not.toBe(desireToKillOld);
      expect(creature.desireToHeal).not.toBe(desireToHealOld);
    });
  });

  describe('doActions', () => {
    it('WHEN called THEN age should be added 1', () => {
      context.entities.push(creature);
      service = new CreatureService(creature, context);

      service.doActions();

      expect(creature.age).toBe(1);
    });
    it('WHEN called THEN the creature should move', () => {
      context.entities.push(creature);
      service = new CreatureService(creature, context);

      const sumXY = creature.x() + creature.y();

      service.doActions();

      expect(creature.x() + creature.y()).not.toBe(sumXY);
    });
    it('WHEN desireToKill is more than 20 THEN the creature should hurt a random creature', () => {
      creature.desireToKill = 50;

      context.entities.push(creature);
      service = new CreatureService(creature, context);

      service.doActions();

      expect(creature.life).toBeLessThan(100);
    });
    it('WHEN desireToHeal is more than 20 THEN the creature should heal a random creature', () => {
      creature.desireToHeal = 50;
      creature.life = 80;

      context.entities.push(creature);
      service = new CreatureService(creature, context);

      service.doActions();

      expect(creature.life).toBeGreaterThan(80);
    });
    it('WHEN context has dead creatures THEN the dead creatures should be removed from context', () => {
      const creature2 = new Creature('C2', 100, 100);

      creature2.life = -10;
      creature.life = 0;

      context.entities.push(creature);
      context.entities.push(creature2);
      service = new CreatureService(creature, context);

      service.doActions();

      expect(context.entities.length).toBe(0);
    });
  });
});
