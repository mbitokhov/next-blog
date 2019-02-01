import { Configuration, Entry, EntryFunc, Plugin } from 'webpack';
import { id } from '../../utils';

export type WebpackEntry = string |
                    string[] |
                    Entry |
                    Promise<string|string[]|Entry> |
                    EntryFunc;

/**
 * Merge configs from two different Webpack Configuration.
 *
 * In no way is the final config 100% identical. This merely works off of a
 * "good enough" basis
 */
export function mergeConfigs(from: Configuration, to: Configuration) {
  const config: Configuration = {};

  const primitives: Array<keyof Configuration> = [
    'bail',
    'context',
    'name',
    'target',
  ];

  for (const primitive of primitives) {
    if (to[primitive] !== undefined) {
      config[primitive] = to[primitive];
    } else if (from[primitive] !== undefined) {
      config[primitive] = from[primitive];
    }
  }

  // plugins
  config.plugins = mergePlugins(from.plugins || [], to.plugins || []);

  // make sure to keep the reference in case it gets reassigned
  // might need to clone this too
  const fromEntry = from.entry;
  const toEntry = to.entry;
  config.entry = makeEntryFunc(fromEntry || [], toEntry || []);

  // TODO: Merge more stuff together...

  return config;
}

/**
 * Merge multiple entries by closure.
 */
export function makeEntryFunc(...entries: WebpackEntry[]): () => Promise<Entry> {
  return () => mergeEntries(...entries);
}

/**
 * Merge multiple entries into a single object.
 */
export async function mergeEntries(...entries: WebpackEntry[]): Promise<Entry> {
  const resolvedEntries = await Promise.all(entries.map(normalizeEntry));

  return Object.assign({}, ...resolvedEntries);
}

/**
 * Combine plugin arrays.
 */
export function mergePlugins(...plugins: Plugin[][]): Plugin[] {
  return ([] as Plugin[]).concat(...plugins);
}

/**
 * Normalize entries to accept a wide range of inputs into a single Promise.
 */
async function normalizeEntry(original: WebpackEntry): Promise<Entry> {
  let entry: WebpackEntry;
  console.log({original});

  if (typeof original === 'function') {
    entry = await Promise.resolve(original());
  } else {
    entry = await Promise.resolve(original);
  }

  if (typeof entry === 'string' || Array.isArray(entry)) {
    // make sure this is a copy...
    if (Array.isArray(entry)) {
      entry = [...entry];
    }

    return {
      [id()]: entry,
    };
  }

  return { ...entry };
}
