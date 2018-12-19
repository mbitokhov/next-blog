import * as React from 'react';
import { classnames } from '../utils/css';
import { exists } from '../utils/helpers';
import { BaseObject } from '../types';

interface Props {
  className?: string;
  style?: React.CSSProperties;

  javascript?: true;
  js?: true;
  typescript?: true;
  ts?: true;
}

// few times it can't be a function component (even though stateless)
// we need componentDidMount
export default class Code extends React.PureComponent<Props> {
  componentDidMount() {
    if (!exists(window as any, 'code-prettify')) {
      window['code-prettify'] = require('code-prettify');
    }
    const win = window as any;
    win.PR.prettyPrint();
  }

  render() {
    const props = this.props;
    const { className, style, children } = props;

    const typeHinted: BaseObject<boolean> = {};
    typeHinted['lang-js'] = exists(props, 'javascript') || exists(props, 'js');
    typeHinted['lang-ts'] = exists(props, 'typescript') || exists(props, 'ts');

    return (
      <pre className={classnames('prettyprint', 'linenums', typeHinted, className)} style={style}>
        { children }
      </pre>
    )
  }
}

// const Code: React.FunctionComponent<Props> = ({ className, style, children }) => (
//   <pre className={classnames('prettyprint', className)} style={style}>
//     { children }
//   </pre>
// )
// 
// export default Code;