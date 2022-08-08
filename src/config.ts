import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';

// eslint-disable-next-line no-console
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
  // 'SOME_ENV',
].forEach((v) => {
  if (!isSet(process.env, v)) missingEnvs.push(v);
});

if (missingEnvs && missingEnvs.length) {
  throw new Error(
    `Environment is missing variables: ${missingEnvs.join(', ')}`,
  );
}

export interface IProcessEnv {
  // SOME_ENV: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}
