import * as React from 'react';

export interface HrefProp {
  href?: string;
}

export const JS: React.FunctionComponent<HrefProp> = ({ href }) => (
  <script src={href} async defer />
);

export const CSS: React.FunctionComponent<HrefProp> = ({ href }) => (
  <link rel='stylesheet' href={href} />
);

interface LinksProps {
  component: React.ComponentType<HrefProp>;
  hrefs: string[];
}

export const Links: React.FunctionComponent<LinksProps> = (props) => (
  <React.Fragment>
    { props.hrefs.map((src) => <props.component href={src} />) }
  </React.Fragment>
);
