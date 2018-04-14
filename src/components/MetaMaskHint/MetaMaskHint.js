import React, { Component } from 'react';

import './styles.css';

class MetaMaskHint extends Component {
  render() {
    return (
      <div className="tooltip error">
        <p>Your browser does not support Ethereum. <a target="_blank" href="https://metamask.io/" style={{ color: '#ffffff' }} >Install MetaMask to Play.</a></p>
      </div>
    );
  }
}

export default MetaMaskHint;
