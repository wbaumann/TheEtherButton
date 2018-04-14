import React, { Component } from 'react';

import './styles.css';

class UnlockHint extends Component {
  render() {
    return (
      <div className="tooltip warning">
        <p>Please unlock your MetaMask account to play this game.</p>
      </div>
    );
  }
}

export default UnlockHint;
