/* eslint-disable no-console */
import { Logger, LogMessageContext, LogMessageLevel } from './logger';

export default class ConsoleLogger implements Logger {
  private level: LogMessageLevel | undefined;

  private contexts: LogMessageContext[];

  constructor(level?: LogMessageLevel, contexts?: LogMessageContext[]) {
    const defaultContexts = [
      LogMessageContext.Action,
      LogMessageContext.EntityExecutor,
      LogMessageContext.Orchestrator,
      LogMessageContext.OrchestratorExecutor,
    ];
    const shouldSetDefault = contexts !== undefined && contexts.length > 0;

    this.contexts = shouldSetDefault ? contexts : defaultContexts;

    this.level = level;
  }

  // eslint-disable-next-line class-methods-use-this
  private getLevelValue(): number {
    let resultLevel: string | undefined;
    const envLevel = process.env.LOGGER_LEVEL;

    const levels: string[] = [
      'Trace',
      'Debug',
      'Info',
      'Warn',
      'Error',
      'Fatal',
    ];

    if (envLevel) {
      resultLevel = envLevel;
    }

    if (this.level !== undefined) {
      resultLevel = LogMessageLevel[this.level];
    } else if (envLevel !== undefined) {
      resultLevel = envLevel;
    } else {
      resultLevel = LogMessageLevel[LogMessageLevel.Warn];
    }

    return levels.indexOf(resultLevel);
  }

  private shouldLog(
    level: LogMessageLevel,
    context: LogMessageContext,
  ): boolean {
    const systemLevel = this.getLevelValue();
    const hasValidLevel = systemLevel <= level;
    const hasValidContext = this.contexts.includes(context);

    return hasValidLevel && hasValidContext;
  }

  public log(
    level: LogMessageLevel,
    context: LogMessageContext,
    ...args: any[]
  ) {
    if (this.shouldLog(level, context)) {
      console.log(LogMessageLevel[level], LogMessageContext[context], ...args);
    }
  }

  public logTable(
    level: LogMessageLevel,
    context: LogMessageContext,
    tabularData: any,
    properties?: readonly string[] | undefined,
  ) {
    if (this.shouldLog(level, context)) {
      console.table(tabularData, properties);
    }
  }
}
