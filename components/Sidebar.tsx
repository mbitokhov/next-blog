import * as React from 'react';
import { classnames } from '../utils/css';

interface SidebarProps {
  title: string;
}

interface SidebarState {
  active: boolean;
}


class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);

    this.state = {
      active: true,
    }
  }

  componentDidMount() {
    this.setState({
      active: false,
    });
  }

  toggler() {
    this.setState((previous) => {
      return {
        active: !previous.active,
      };
    })
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-main">
          <a className="brand item" href="/">{this.props.title}</a>
          <div className="burger" onClick={() => this.toggler()}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={classnames('sidebar-content', {
            'is-active': this.state.active
          })}>
          <div className="items">
            <a className="item" href="/blogs">Blogs</a>
            <a className="item" href="/projects">Future Projects</a>
            <a className="item" href="https://github.com/mbitokhov">Github</a>
          </div>
          <div className="quote">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar;