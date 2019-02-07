
import * as React from 'react';
import { classnames } from '../../utils/css';
import Sidebar from '../components/Sidebar';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const ContentWithSidebar: React.FunctionComponent<Props> = (props) => (
  <div className={classnames('onedark', 'blog', props.className)} style={props.style}>
    <Sidebar brand='Michael Bitokhov' />
    <main className='main'>
      <div className='container'>
        {props.children}
      </div>
    </main>
  </div>
);

export default ContentWithSidebar;
