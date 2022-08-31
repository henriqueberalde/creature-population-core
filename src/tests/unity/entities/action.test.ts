import { Action } from '../../../entities';
import { CycleAmount, Priority } from '../../../utils/enums';

let action: Action;

describe('Action', () => {
  describe('constructor', () => {
    beforeEach(() => {
      action = new Action('Action1');
    });
    describe('When called passing name', () => {
      it('name is set', () => {
        expect(action.name).toBe('Action1');
      });
      it('fixed priority is set', () => {
        expect(action.priority).toBe(Priority.ActionPriority);
      });
      it('fixed cycleAmount is set', () => {
        expect(action.cycleAmount).toBe(CycleAmount.ActionCycle);
      });
    });
    describe('When called passing priority and cycleAmount', () => {
      beforeEach(() => {
        action = new Action(
          'Action1',
          Priority.PosActionPriority,
          CycleAmount.MoveCycle,
        );
      });
      it('priority is set', () => {
        expect(action.priority).toBe(Priority.PosActionPriority);
      });
      it('cycleAmount is set', () => {
        expect(action.cycleAmount).toBe(CycleAmount.MoveCycle);
      });
    });
  });
});
