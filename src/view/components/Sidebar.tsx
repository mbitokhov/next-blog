import * as React from 'react';
import QuoteGenerator, { Quote } from '../../services/Quotes';
import { classnames } from '../../utils/css';

interface SidebarProps {
  brand: string;
}

interface SidebarState {
  active: boolean;
  quote: Quote;
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);

    this.state = {
      active: true,
      quote: QuoteGenerator.make(),
    };
  }

  public componentDidMount() {
    this.setState({
      active: false,
    });
  }

  public toggler() {
    this.setState((previous) => {
      return {
        active: !previous.active,
      };
    });
  }

  public newQuote() {
    this.setState({
      quote: QuoteGenerator.make(),
    });
  }

  public render() {
    return (
      <div className='sidebar'>
        <div className='sidebar-main'>
          <a className='brand item' href='/'>{this.props.brand}</a>
          <div className='burger' onClick={() => this.toggler()}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={classnames('sidebar-content', {
            'is-active': this.state.active,
          })}>
          <div className='items'>
            <a className='item' href='/blogs'>Blogs</a>
            <a className='item' href='/projects'>Future Projects</a>
            <a className='item' href='https://github.com/mbkv'>Github</a>
          </div>
          <div className='quote'>
            <div className='block'>
              {this.state.quote.quote}
            </div>
            <div className='from'>
              -- {this.state.quote.by}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
