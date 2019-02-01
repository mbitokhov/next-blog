import { Container } from 'inversify';
import { config } from '../config';
import { Paths } from '../utils/Paths';
import { bindMarkdown } from './markdown';

// okay so this is the best way I found of doing it.

// Container is able to be used whenever you want. But classes that have to be
// initialized asynchronously (database, job processing, api) will have to be
// initialized via initializeContainer (this gets called in server.php).
// Considering this is a simple blogging app (which all it does is read from
// files), I'm just writing this in the future for any person wishing to extend
// it. feel free to replace it with anything better.

export const container = new Container({
  autoBindInjectable: true,
});

// this is here because it might be possible some containers need a the paths
// (in the case of levelup, for example)
container.bind(Paths).toConstantValue(new Paths(config.paths));

export async function initializeContainer(): Promise<void> {
  bindMarkdown(container);
}
