import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class Network extends Component {
  getActiveNetwork() {
    switch (this.props.networkId) {
      case 1:
        return 'MainNet';
      case 3:
        return 'Ropsten';
      case 4:
        return 'Rinkeby';
      default:
        return 'Unknown';
    }
  }

  render() {
    return (
      <p className="network">{this.getActiveNetwork()}</p>
    );
  }
}

Network.propTypes = {
  networkId: PropTypes.number.isRequired,
};

export default Network;
