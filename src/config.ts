import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

console.log(`Environment: ${process.env.NODE_ENV}`);

switch (process.env.NODE_ENV) {
  case 'development':
    configDotenv({
      path: resolve(__dirname, '../.env.development'),
    });
    break;
  case 'test':
    configDotenv({
      path: resolve(__dirname, '../.env.test'),
    });
    break;
  case 'production':
    configDotenv({
      path: resolve(__dirname, '../.env'),
    });
    break;
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`);
}

const isSet = <T, K extends keyof T>(obj: Partial<T>, prop: K): boolean => {
  if (obj[prop] === undefined || obj[prop] === null) {
    return false;
  }
  return true;
};

const missingEnvs: string[] = [];

[
  'REDIS_EVENT_STREAM_NAME',
  'REDIS_EVENT_CONSUMER_NAME',
  'REDIS_EVENT_CONSUMER_GROUP_NAME',
].forEach((v) => {
  if (!isSet(process.env, v)) missingEnvs.push(v);
});

if (missingEnvs && missingEnvs.length) {
  throw new Error(
    `Environment is missing variables: ${missingEnvs.join(', ')}`,
  );
}

export interface IProcessEnv {
  REDIS_EVENT_STREAM_NAME: string;
  REDIS_EVENT_CONSUMER_NAME: string;
  REDIS_EVENT_CONSUMER_GROUP_NAME: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}
