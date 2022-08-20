enum LogMessageLevel {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
}

enum LogMessageContext {
  EntityExecutor,
  OrchestratorExecutor,
  Action,
  Orchestrator,
}

interface Logger {
  log(level: LogMessageLevel, context: LogMessageContext, ...args: any[]): void;
  logTable(
    level: LogMessageLevel,
    tabularData: any,
    properties?: readonly string[] | undefined,
  ): void;
}

export { Logger, LogMessageLevel, LogMessageContext };
