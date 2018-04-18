import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccountsList from './AccountsList/AccountsList';

import './styles.css';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="#top" className="pure-menu-heading">The Ether Button</a>
          <AccountsList accounts={this.props.accounts} networkId={this.props.networkId} />
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.string),
  networkId: PropTypes.number.isRequired,
};

Header.defaultProps = {
  accounts: null,
};

export default Header;
