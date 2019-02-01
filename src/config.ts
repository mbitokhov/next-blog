import dotenv from 'dotenv';
import path from 'path';
import { env, envExists } from './utils';

dotenv.load();

export type Environment = 'production' | 'development';

export interface PathLocations {
  readonly cwd: string;

  readonly build: string;
  readonly docs: string;

  readonly pages: string;
  readonly views: string;
  readonly styles: string;

  readonly public: string;
  readonly publicCss: string;
  readonly publicJs: string;
}

export interface SettingsInterface {
  env: Environment;
  port: string|number;
  secret: Buffer;

  paths: PathLocations;
}

export const config: Readonly<SettingsInterface> = getConfigs();

export const isProd = () => config.env === 'production';
export const isDev = () => config.env === 'development';

function getConfigs(): SettingsInterface {
  const cwd = process.cwd();

  const settings = {
    env: getEnvironment(),
    port: env('PORT', '3000'),
    secret: Buffer.from(''),

    paths: {
      cwd,

      build: env('BUILD_FOLDER', path.join(cwd, '.build')),
      docs: env('DOC_FOLDER', path.join(cwd, 'docs')),

      styles: env('STYLE_FOLDER', path.join(cwd, 'styles')),
      views: env('VIEW_FOLDER', path.join(cwd, 'dist', 'view')),
      pages: env('PAGES_FOLDER', path.join(cwd, 'dist', 'view', 'pages')),

      public: env('PUBLIC_FOLDER', path.join(cwd, 'public')),
      publicCss: env('CSS_FOLDER', path.join(cwd, 'public', 'css')),
      publicJs: env('JS_FOLDER', path.join(cwd, 'public', 'js')),
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
