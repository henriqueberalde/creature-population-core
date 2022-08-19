import { Priority, CycleAmount } from '../utils/enums';

export default class Action {
  public name: string;

  public priority: number;

  public cicleAmount: number;

  // public testWillFunction: boolean;

  constructor(name: string);
  constructor(name: string, priority: number, cycleAmount: number);
  constructor(name: string, priority?: number, cycleAmount?: number) {
    this.name = name;
    this.priority = priority !== undefined ? priority : Priority.ActionPriority;
    this.cicleAmount =
      cycleAmount !== undefined ? cycleAmount : CycleAmount.ActionCycle;
  }
}
