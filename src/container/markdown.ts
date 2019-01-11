import { Container } from 'inversify';
import MarkdownIt from 'markdown-it';

export function bindMarkdown(container: Container) {
  container.bind(MarkdownIt).toSelf();
}
