import { inject, injectable } from 'inversify';
import { safeLoad as yamlParser } from 'js-yaml';
import MarkdownIt from 'markdown-it';
import { exists } from '../../utils';
import { MarkdownDocument, RenderedDocument } from './Types';

interface MarkdownWithYaml {
  markdown: string;
  yaml: any;
}

function parseYamlFromMarkdown(str: string): MarkdownWithYaml|null {
  const markdown = str.trimLeft();

  if (!markdown.startsWith('---')) {
    return null;
  }

  const match = markdown.match(/^---([^]*?)---/m);

  if (match === null) {
    return null;
  }

  let yaml: any;

  try {
    yaml = yamlParser(markdown);
  } catch {
    return null;
  }

  return {
    markdown: markdown.substr(match[0].length),
    yaml,
  };
}

@injectable()
export class Markdown {
  constructor(
    @inject(MarkdownIt) protected inner: MarkdownIt,
  ) {}

  public render(str: string): Readonly<RenderedDocument> {
    const document: MarkdownDocument = this.getMetadata(str);

    return {
      metadata: document,
      html: this.inner.render(document.markdown),
    };
  }

  protected getMetadata(str: string): Readonly<MarkdownDocument> {
    const markdownWithYaml = parseYamlFromMarkdown(str);

    if (markdownWithYaml === null) {
      return { markdown: str };
    }

    const { markdown, yaml } = markdownWithYaml;
    const markdownDocument: MarkdownDocument = {
      markdown,
    };

    if (exists(yaml, 'title')) {
      markdownDocument.title = yaml.title;
    }

    if (exists(yaml, 'description')) {
      markdownDocument.description = yaml.description;
    }

    return markdownDocument;
  }

}
