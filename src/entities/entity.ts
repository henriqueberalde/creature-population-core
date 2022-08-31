import Action from './action';
import Will from './will';

export default class Entity {
  public id: string;

  public age: number;

  public wills: Will[];

  public actions: Action[];

  constructor(id: string, actions?: Action[], wills?: Will[]) {
    this.id = id;
    this.age = 0;
    this.actions = actions !== undefined ? actions : [new Action('getOld')];
    this.wills = wills !== undefined ? wills : [];
  }

  public removeAction(name: string) {
    const actionFound = this.actions.find((a) => a.name === name);
    if (actionFound) this.actions.splice(this.actions.indexOf(actionFound), 1);
  }

  public removeActions(names: string[]) {
    names.forEach((name) => this.removeAction(name));
  }
}
