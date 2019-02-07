import * as React from 'react';
import { DocumentProps } from '../types';
import { classnames } from '../utils/css';
import { CSS, JS, Links } from './utils';

const defaultTitle = 'Michael Bitokhov';
const defaultDescription = 'just another blog, probably nothing of interest. Who knows?';

const Title: React.FunctionComponent = ({ children }): JSX.Element => {
  if (children) {
    return <title>{`${children} | ${defaultTitle}`}</title>;
  }

  return <title>{defaultTitle}</title>;
};

const Description: React.FunctionComponent = ({ children }): JSX.Element => {
  if (children) {
    return <meta name='description' content={children.toString()} />;
  }

  return <meta name='description' content={defaultDescription} />;
};

const MainLayout: React.FunctionComponent<DocumentProps & {children: string}> = (props) => {
  return (
    <html>
      <head>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />

        <Links component={CSS} hrefs={props.css || []} />
        <CSS href='https://cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css' />
      </head>
      <body className={classnames('onedark', props.className)} style={props.style}>
        <div data-props={JSON.stringify(props.original)} dangerouslySetInnerHTML={{__html: props.children}}>
        </div>

        <script>{`window._pages=window._pages||[];function _pageLoad(m){window._pages.push(m)}`}</script>
        <Links component={JS} hrefs={props.js || []} />
        <JS href='/static/app.js' />
      </body>
    </html>
  );
};

export default MainLayout;
