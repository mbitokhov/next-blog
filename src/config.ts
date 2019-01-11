import dotenv from 'dotenv';
import { env, envExists } from './utils';

dotenv.load();

export type Environment = 'production' | 'development';

export interface SettingsInterface {
  env: string;
  port: string|number;
  secret: Buffer;
}

export const config: Readonly<SettingsInterface> = getConfigs();

function getConfigs(): SettingsInterface {
  const settings = {
    env: getEnvironment(),
    port: env('PORT', '3000'),
    secret: Buffer.from(''),
  };

  Object.defineProperty(settings, 'secret', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: getSecret(),
  });

  return settings;
}

function getEnvironment(): Environment {
  let environment: string;

  if (envExists('NODE_ENV')) {
    environment = env('NODE_ENV', 'production');
  } else {
    environment = env('ENV', 'production');
  }

  if (['dev', 'development'].includes(environment)) {
    return 'development';
  } else {
    return 'production';
  }
}

function getSecret(): Buffer {
  if (!envExists('SECRET')) {
    console.error('Secret doesn\'t exists');
  }

  return Buffer.from(env('SECRET', 'super duper secret'));
}
