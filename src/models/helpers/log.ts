export function log(verbose: boolean, ...args: any[]) {
  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(args);
  }
}

export function logTable(
  verbose: boolean,
  tabularData: any,
  properties?: readonly string[] | undefined,
) {
  if (verbose) {
    // eslint-disable-next-line no-console
    console.table(tabularData, properties);
  }
}
