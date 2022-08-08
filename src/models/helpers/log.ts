function isVerbose(): boolean {
  const envVerbose = process.env.VERBOSE;

  return !(envVerbose === 'false');
}

function privateLog(ignoreVerbose: boolean, ...args: any[]) {
  if (ignoreVerbose || isVerbose()) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

function privateLogTable(
  ignoreVerbose: boolean,
  tabularData: any,
  properties?: readonly string[] | undefined,
) {
  if (ignoreVerbose || isVerbose()) {
    // eslint-disable-next-line no-console
    console.table(tabularData, properties);
  }
}

export function log(...args: any[]) {
  // eslint-disable-next-line no-console
  privateLog(false, ...args);
}

export function logAndIgnoreVerbose(...args: any[]) {
  // eslint-disable-next-line no-console
  privateLog(true, ...args);
}

export function logTable(
  tabularData: any,
  properties?: readonly string[] | undefined,
) {
  privateLogTable(false, tabularData, properties);
}

export function logTableAndIgnoreVerbose(
  tabularData: any,
  properties?: readonly string[] | undefined,
) {
  privateLogTable(true, tabularData, properties);
}
