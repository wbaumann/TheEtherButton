import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './styles.css'

class Network extends Component {
    getActiveNetwork() {
        if (this.props.networkId < 0) {
            return "Inactive"
        } else if (this.props.networkId === 0) {
            return "MainNet"
        } else {
            return "Other"
        }
    }

    render() {
        return(
            <p className="network">{this.getActiveNetwork()}</p>
        );
    }
}

Network.propTypes = {
    networkId : PropTypes.number
};

Network.defaultProps = {
    networkId: -1
};

export default Network