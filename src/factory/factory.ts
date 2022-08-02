import Orchestrator from '../models/orchestrator';

export default class Factory {
  private static singletons: { [key: string]: object } = {};

  public static getInstanceOfOrchestrator(): Orchestrator {
    const singletonName = 'Orchestrator';

    if (!this.singletons[singletonName]) {
      this.singletons[singletonName] = new Orchestrator();
    }

    return this.singletons[singletonName] as Orchestrator;
  }
}
