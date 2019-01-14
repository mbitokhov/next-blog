import dotenv from 'dotenv';
import path from 'path';
import { env, envExists } from './utils';

dotenv.load();

export type Environment = 'production' | 'development';

export interface SettingsInterface {
  env: string;
  port: string|number;
  secret: Buffer;

  paths: {
    cwd: string;
    build: string;
    docs: string;
    views: string;
    styles: string;
  };
}

export const config: Readonly<SettingsInterface> = getConfigs();

function getConfigs(): SettingsInterface {
  const settings = {
    env: getEnvironment(),
    port: env('PORT', '3000'),
    secret: Buffer.from(''),

    paths: {
      cwd: process.cwd(),
      build: env('BUILD_FOLDER', path.join(process.cwd(), '.build')),
      docs: env('DOC_FOLDER', path.join(process.cwd(), 'docs')),
      views: env('VIEW_FOLDER', path.join(process.cwd(), 'dist', 'view')),
      styles: env('STYLE_FOLDER', path.join(process.cwd(), 'styles')),
    },
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
