export interface MarkdownWithYaml {
  markdown: string;
  yaml: any;
}

export interface MarkdownDocument {
  markdown: string;
  title?: string;
  subtitle?: string;
  description?: string;
  created?: Date;
  modified?: Date;
}

export interface RenderedDocument {
  metadata: MarkdownDocument;
  html: string;
}

export interface RenderedFile {
  file: string;
  rendered: RenderedDocument;
}
