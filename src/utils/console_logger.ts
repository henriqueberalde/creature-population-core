import Logger from './logger';

export default class ConsoleLogger implements Logger {
  // eslint-disable-next-line class-methods-use-this
  private isVerbose(): boolean {
    const envVerbose = process.env.VERBOSE;

    return !(envVerbose === 'false');
  }

  private privateLog(ignoreVerbose: boolean, ...args: any[]) {
    if (ignoreVerbose || this.isVerbose()) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }

  private privateLogTable(
    ignoreVerbose: boolean,
    tabularData: any,
    properties?: readonly string[] | undefined,
  ) {
    if (ignoreVerbose || this.isVerbose()) {
      // eslint-disable-next-line no-console
      console.table(tabularData, properties);
    }
  }

  public log(...args: any[]) {
    this.privateLog(false, ...args);
  }

  public logAndIgnoreVerbose(...args: any[]) {
    this.privateLog(true, ...args);
  }

  public logTable(
    tabularData: any,
    properties?: readonly string[] | undefined,
  ) {
    this.privateLogTable(false, tabularData, properties);
  }

  public logTableAndIgnoreVerbose(
    tabularData: any,
    properties?: readonly string[] | undefined,
  ) {
    this.privateLogTable(true, tabularData, properties);
  }
}
