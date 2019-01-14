import glob from 'fast-glob';
import { inject, injectable } from 'inversify';
import { safeLoad as yamlParser } from 'js-yaml';
import MarkdownIt from 'markdown-it';
import path from 'path';
import { exists } from '../../utils';
import { readFile } from '../../utils/fsHelpers';
import { MarkdownDocument, MarkdownWithYaml, RenderedDocument, RenderedFile } from './Types';

function parseYamlFromMarkdown(markdown: string): MarkdownWithYaml|null {
  const match = markdown.match(/^---([^]*?)---/m);

  // if not found or not at beginning of the string
  if (match === null || markdown.indexOf(match[0]) !== 0) {
    return null;
  }

  let yaml: any;
  try {
    yaml = yamlParser(match[1]);
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

  /**
   * Render an entire directory
   */
  public async renderDirectory(dir: string): Promise<Array<Readonly<RenderedFile>>> {
    const files = await glob('./**/*.md', {
      cwd: dir,
    });

    const promises = files.map(async (file): Promise<RenderedFile> => {
      const fileLocation = path.join(dir, file.toString());
      const contents = await readFile(fileLocation);

      return {
        file: file.toString(),
        rendered: await this.render(contents.toString()),
      };
    });

    return Promise.all(promises);
  }

  /**
   * Render a yaml+markdown document to html with metadata.
   */
  public async render(str: string): Promise<Readonly<RenderedDocument>> {
    const document: MarkdownDocument = this.getMetadata(str);

    return {
      metadata: document,
      html: this.inner.render(document.markdown),
    };
  }

  /**
   * Extract yaml from markdown and return the metadata.
   */
  public getMetadata(str: string): Readonly<MarkdownDocument> {
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

    if (exists(yaml, 'subtitle')) {
      markdownDocument.subtitle = yaml.subtitle;
    }

    if (exists(yaml, 'description')) {
      markdownDocument.description = yaml.description;
    }

    if (exists(yaml, 'created')) {
      markdownDocument.created = new Date(yaml.created);
    }

    if (exists(yaml, 'modified')) {
      markdownDocument.modified = new Date(yaml.modified);
    }

    return markdownDocument;
  }
}
