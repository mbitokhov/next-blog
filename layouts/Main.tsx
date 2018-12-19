import * as React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { Columns, Column } from '../components/Col';
import 'normalize.css/normalize.css';
import '../styles/all.scss';
import { classnames } from '../utils/css';

interface LayoutProps {
  className?: string;
  style?: React.CSSProperties;

  title: string;
  description: string;
}

const MainLayout: React.FunctionComponent<LayoutProps> = (props) => {
  return (
    <div className={classnames("onedark", props.className)} style={props.style}>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css" />
      </Head>
      <Columns large wrap>
        <Column size={3}>
          <Sidebar title="Michael Bitokhov">
            “Programs must be written for people to read, and only incidentally for machines to execute.” 
            ― Harold Abelson, Structure and Interpretation of Computer Programs
          </Sidebar>
        </Column>
        <Column className="blog" size={9}>
          <div className="is-padding-5 is-padding-2-medium" >
            <div className="content">
              {props.children}
            </div>
          </div>
        </Column>
      </Columns>
    </div>
  )
}

export default MainLayout;