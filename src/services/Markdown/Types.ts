export interface MarkdownDocument {
  markdown: string;
  title?: string;
  description?: string;
  created?: Date;
  modified?: Date;
}

export interface RenderedDocument {
  metadata: MarkdownDocument;
  html: string;
}
