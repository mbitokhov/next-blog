import * as React from 'react';
import { exists } from '../../utils';
import { classnames } from '../../utils/css';
import { Column, Columns } from '../components/Col';
import Sidebar from '../components/Sidebar';

interface LayoutProps {
  className?: string;
  style?: React.CSSProperties;

  title?: string;
  description?: string;
}

const defaultTitle = 'Michael Bitokhov';

function getTitle(props: LayoutProps): JSX.Element {
  if (exists(props, 'title')) {
    return <title>{`${props.title} | ${defaultTitle}`}</title>;
  }

  return <title>{defaultTitle}</title>;
}

function getDescription(props: LayoutProps): JSX.Element|undefined {
  if (exists(props, 'description')) {
    return <meta name='description' content={props.description} />;
  }
}

const MainLayout: React.FunctionComponent<LayoutProps> = (props) => {
  return (
    <html>
      <head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='stylesheet' href='/static/markdown.css' />
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css' />
      </head>
      <body className={classnames('onedark', props.className)} style={props.style}>
        <Columns large wrap>
          <Column size={3}>
            <Sidebar brand='Michael Bitokhov' />
          </Column>
          <Column className='blog' size={9}>
            <main>
              <article className='content'>
                {props.children}
              </article>
            </main>
          </Column>
        </Columns>
        <script src='/static/markdown.js' async defer></script>
      </body>
    </html>
  );
};

export default MainLayout;
