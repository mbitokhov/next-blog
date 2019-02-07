import * as React from 'react';
import '../../../styles/all.scss';
import '../../../styles/pages/markdown.scss';
import { DocumentProps, PageHooks } from '../../types';
import ContentWithSidebar from '../layouts/ContentWithSidebar';
// import MainLayout from '../Layout';

export interface MarkdownProps {
  data: string;
  title?: string;
  subtitle?: string;
  description?: string;
  created?: Date;
  modified?: Date;
}

export const hooks: PageHooks<MarkdownProps> = {
  documentProps(props: Partial<MarkdownProps>): DocumentProps {
    const original = Object.assign({}, props);
    delete original.data;
    delete (original as any).markdown;

    return {
      original,
      title: props.title,
      description: props.description,

      js: ['/static/markdown.js'],
      css: ['/static/markdown.css'],
    };
  },
  hydrateProps(baseProps: Partial<MarkdownProps>): MarkdownProps {
    let html = baseProps.data;

    if (!html) {
      const element = document.querySelector('.markdown');

      if (element === null) {
        throw new Error('Cannot get markdown data!');
      }

      html = element.innerHTML;
    }

    return {
      ...baseProps,
      data: html,
    };
  },
};

class MarkdownPage extends React.Component<MarkdownProps> {
  public componentDidMount() {
    if (typeof window === 'undefined') {
      return;
    }
    require('code-prettify');

    const codes = document.querySelectorAll('.markdown pre > code');
    if (!codes) {
      return;
    }

    for (const code of codes as unknown as Element[]) {
      code.className += ' prettyprint';
    }

    (window as any).PR.prettyPrint();
  }

  public render() {
    return (
    <ContentWithSidebar>
      <h1>{this.props.title}</h1>
      <small>{this.props.subtitle}</small>
      <div className='content'>
        <div className='markdown' dangerouslySetInnerHTML={{__html: this.props.data}}/>
      </div>
    </ContentWithSidebar>
    );
  }
}

export default MarkdownPage;
