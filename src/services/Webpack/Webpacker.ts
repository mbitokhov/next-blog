import webpack, { ICompiler } from 'webpack';
import * as utils from './utils';

type Target = 'web' | 'webworker' | 'node' | 'async-node' | 'node-webkit' |
              'atom' | 'electron' | 'electron-renderer' | 'electron-main' |
              ((compiler?: any) => void);

export class Webpacker {
  protected config: webpack.Configuration = {};

  /**
   * Get the config.
   */
  public getConfig(): webpack.Configuration {
    return this.config;
  }

  /**
   * Get an instance of webpack.
   */
  public get(): webpack.Compiler {
    return webpack(this.config);
  }

  /**
   * Run webpack.
   */
  public run(): Promise<webpack.Stats> {
    return new Promise((resolve, reject) => {
      this.get().run((err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });
  }

  /**
   * Run webpack while watching.
   *
   * This couldn't be turned into a promise because there is two return values
   * for it. webpack.Compiler.Watching and webpack.Stats. Both might be
   * necessary.
   */
  public watch(options: webpack.WatchOptions, handler: ICompiler.Handler): webpack.Compiler.Watching {
    return this.get().watch(options, handler);
  }

  /**
   * Set the base path/cwd of webpack.
   */
  public basePath(path: string): this {
    this.config.context = path;

    return this;
  }

  /**
   * Set the publically available path.
   *
   * EG: https://cdn.example.com/user/[name].js
   */
  public publicPath(path: string): this {
    this.config.output = this.config.output || {};
    this.config.output.publicPath = path;

    return this;
  }

  /**
   * Set the dist folder of all build files.
   */
  public dist(path: string): this {
    this.config.output = this.config.output || {};
    this.config.output.path = path;

    return this;
  }

  /**
   * Set the name of a webpack configuration.
   */
  public name(name: string): this {
    this.config.name = name;

    return this;
  }

  /**
   * Set if we should use the cache.
   */
  public cache(cache: boolean): this {
    this.config.cache = cache;

    return this;
  }

  /**
   * Add in the settings for watching files.
   */
  public setWatch(watch: boolean, watchOptions: webpack.WatchOptions = {}): this {
    this.config.watch = watch;
    this.config.watchOptions = watch ? watchOptions : {};

    return this;
  }

  /**
   * Set the compilation target.
   *
   * Typically web|node.
   */
  public target(name: Target): this {
    this.config.target = name;

    return this;
  }

  public library(lib: string|string[]): this {
    this.config.output = this.config.output || {};
    this.config.output.library = lib;

    return this;
  }

  public libraryTarget(target: webpack.LibraryTarget): this {
    this.config.output = this.config.output || {};
    this.config.output.libraryTarget = target;

    return this;
  }

  /**
   * Set the current environment.
   */
  public mode(mode: 'development' | 'production' | 'none'): this {
    this.config.mode = mode;

    return this;
  }

  /**
   * Bail on error.
   */
  public bail(bail: boolean): this {
    this.config.bail = bail;

    return this;
  }

  /**
   * Add the module rules.
   * @param rule
   */
  public addRules(...rule: webpack.RuleSetRule[]): this {
    this.config.module = this.config.module || ({} as webpack.Module);
    this.config.module.rules = this.config.module.rules || [];
    this.config.module.rules.push(...rule);

    return this;
  }

  /**
   * Clear all module rules.
   */
  public clearRules(): this {
    this.config.module = this.config.module || ({} as webpack.Module);
    this.config.module.rules = [];

    return this;
  }

  /**
   * Add in a new entry.
   */
  public addEntry(...entry: utils.WebpackEntry[]) {
    // Hmmm... this will create a new function for every single add...
    // Maybe refactor this to use a property of type WebpackEntry[] and only
    // call it once we run webpack
    this.config.entry = utils.makeEntryFunc(this.config.entry || {}, ...entry);

    return this;
  }

  /**
   * Clear all entries.
   */
  public clearEntry(): this {
    this.config.entry = {};

    return this;
  }

  /**
   * Set the filename to save as.
   */
  public saveAs(file: string): this {
    this.config.output = this.config.output || {};
    this.config.output.filename = file;

    return this;
  }

  /**
   * Add in plugins to webpack.
   */
  public plugins(...plugins: webpack.Plugin[]): this {
    this.config.plugins = this.config.plugins || [];
    this.config.plugins.push(...plugins);

    return this;
  }

  /**
   * Clear all plugins.
   */
  public clearPlugins(): this {
    this.config.plugins = [];

    return this;
  }

  /**
   * Merge this and another webpack instance into a new instance.
   */
  public merge(other: Webpacker): Webpacker {
    const webpacker = new Webpacker();
    webpacker.config = utils.mergeConfigs(this.config, other.config);

    return webpacker;
  }
}
