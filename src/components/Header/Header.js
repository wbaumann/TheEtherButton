import React, { Component } from 'react';
import AccountsList from './AccountsList/AccountsList';

import '../../css/oswald.css';
import '../../css/open-sans.css';
import '../../css/pure-min.css';

import './styles.css';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="#" className="pure-menu-heading">The Ether Button</a>
          <AccountsList accounts={this.props.accounts} networkId={this.props.networkId} />
        </nav>
      </div>
    );
  }
}

export default Header;
