import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css'

class Tooltip extends Component {
    getVisibility() {
        return this.props.showMetaMaskTooltip ? "visible" : "hidden";
    }

    render() {
        return(
            <div className="tooltip" style={{visibility: this.getVisibility()}}>
                <p>Placeholder for tooltip about installing MetaMask: {this.getVisibility()}.</p>
            </div>
        );
    }
}

Tooltip.propTypes = {
    showMetaMaskTooltip: PropTypes.bool
};

Tooltip.defaultProps = {
    showMetaMaskTooltip: false
};

export default Tooltip