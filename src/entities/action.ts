import { Priority, CycleAmount } from '../utils/enums';

export default class Action {
  public name: string;

  public priority: number;

  public cycleAmount: number;

  // public testWillFunction: boolean;

  constructor(name: string);
  constructor(name: string, priority: number, cycleAmount: number);
  constructor(name: string, priority?: number, cycleAmount?: number) {
    this.name = name;
    this.priority = priority !== undefined ? priority : Priority.ActionPriority;
    this.cycleAmount =
      cycleAmount !== undefined ? cycleAmount : CycleAmount.ActionCycle;
  }
}
