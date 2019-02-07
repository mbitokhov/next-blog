import glob from 'fast-glob';
import { inject, injectable } from 'inversify';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Entry, Plugin } from 'webpack';
import { config, isProd } from '../../config';
import { Paths } from '../../utils/Paths';
import { Webpacker } from './Webpacker';

function buildEntriesFor(path: string): () => Promise<Entry> {
  return async () => {
    const globbed = await glob('**', {
      cwd: path,
      absolute: true,
    });

    const entries: Entry = {};

    for (const file of globbed as string[]) {
      const localizedFile = file.substr(path.length + 1);
      const withoutExtension = localizedFile.replace(/(.*)\.\w+?$/, '$1');

      entries[withoutExtension] = file;
    }

    return entries;
  };
}

@injectable()
export class Webpack {
  constructor(
    @inject(Paths) protected paths: Paths,
  ) {}

  public getServerConfig(): Webpacker {
    return this.getBaseConfig()
      .name('server')
      .dist(this.paths.build('server'))
      .target('node')
      .libraryTarget('commonjs2');
  }

  public getClientConfig(): Webpacker {
    return this.getBaseConfig()
      .name('client')
      .dist(this.paths.public('static'))
      .target('web')
      .library('_pageLoad')
      .libraryTarget('jsonp');
  }

  public getAppConfig(): Webpacker {
    return this.getBaseConfig()
      .dist(this.paths.public('static'))
      .clearEntry()
      .name('app')
      .addEntry({
        app: this.paths.views('app.js'),
      });
  }

  public getBaseConfig(): Webpacker {
    const wp = new Webpacker();

    wp.basePath(this.paths.cwd())
      .mode(config.env)
      .bail(true)
      .addEntry(buildEntriesFor(this.paths.views('pages')))
      .plugins(
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }) as unknown as Plugin,
      )
      .addRules({
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      });

    return wp;
  }
}
