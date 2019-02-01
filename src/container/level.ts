import { Container } from 'inversify';
import leveldown from 'leveldown';
import levelup from 'levelup';
import { Paths } from '../utils/Paths';

export const LEVEL = Symbol.for('LEVEL_DB');

export function bindLevel(container: Container) {
  const basePath = container.get(Paths).build('level');
  const db = levelup(leveldown(basePath));

  container.bind(levelup).toConstantValue(db);
  container.bind(LEVEL).toConstantValue(db);
}
