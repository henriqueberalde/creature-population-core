export default interface Logger {
  log(...args: any[]): void;
  logAndIgnoreVerbose(...args: any[]): void;
  logTable(tabularData: any, properties?: readonly string[] | undefined): void;
  logTableAndIgnoreVerbose(
    tabularData: any,
    properties?: readonly string[] | undefined,
  ): void;
}
