import React, { Component } from 'react';
import { User } from 'react-feather';
import PropTypes from 'prop-types';

import Account from './Account/Account';
import Network from './Network/Network';

import './styles.css';

class AccountsList extends Component {
  render() {
    return (
      <div className="navbar-right account-wrapper">
        <User color="#ffffff" className="account-icon" />
        <div className="account-details" >
          <Account accounts={this.props.accounts} />
          <Network networkId={this.props.networkId} />
        </div>
      </div>
    );
  }
}

AccountsList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.string),
  networkId: PropTypes.number.isRequired,
};

AccountsList.defaultProps = {
  accounts: null,
};

export default AccountsList;
