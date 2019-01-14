import { Container } from 'inversify';
import MarkdownIt from 'markdown-it';

export function bindMarkdown(container: Container) {
  container.bind(MarkdownIt).toConstantValue(new MarkdownIt());
  // container.bind(MarkdownIt).toDynamicValue((context) => {
  //   return new MarkdownIt();
  // });

  // container.bind(Markdown).toDynamicValue((context) => {
  //   return new Markdown(context.container.get(MarkdownIt));
  // });
}
