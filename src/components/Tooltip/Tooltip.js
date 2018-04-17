import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { X } from 'react-feather';

import MetaMaskHint from '../MetaMaskHint/MetaMaskHint';
import UnlockHint from '../UnlockHint/UnlockHint';

import './styles.css';

class Tooltip extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  getVisibility() {
    return this.isVisible() ? 'visible' : 'hidden';
  }

  hideTooltip() {
    this.setState({
      isVisible: false,
    });
  }

  isVisible() {
    if (!this.state.isVisible) {
      return false;
    } else if (this.props.hasWeb3) {
      // If we have a valid web3 browser, let's confirm that we have an active account
      // (otherwise the user needs to unlock)
      return this.props.accounts && this.props.accounts.length === 0;
    }
    return true;
  }

  hasMetaMask() {
    return this.props.hasWeb3;
  }

  isAccountUnlocked() {
    if (this.hasMetaMask()) {
      // If we have a valid web3 browser, let's confirm that we have an active account
      // (otherwise the user needs to unlock)
      return this.props.accounts && this.props.accounts.length > 0;
    }
    return false;
  }

  render() {
    return (
      <div style={{ visibility: this.getVisibility() }} >
        {!this.hasMetaMask() && <MetaMaskHint />}
        {this.hasMetaMask() && !this.isAccountUnlocked() && <UnlockHint />}
        <X onClick={() => this.hideTooltip} color="#ffffff" />
      </div>
    );
  }
}

Tooltip.propTypes = {
  hasWeb3: PropTypes.bool,
  accounts: PropTypes.arrayOf(PropTypes.string),
};

Tooltip.defaultProps = {
  hasWeb3: false,
  accounts: null,
};

export default Tooltip;

