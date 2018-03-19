import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './styles.css'

class Stats extends Component {
    render() {
        return(
            <div>
                <h2>Stats</h2>
                <p>Game Generation: {this.props.gameGeneration}. (Expected Value is 1. Try running truffle compile/migrate or restarting Chrome if you're seeing 0/-1.</p>
                <p>Total Clicks: {this.props.clicks}. Expected Value is 0.</p>
            </div>
        );
    }
}

Stats.propTypes = {
    gameGeneration : PropTypes.number,
    clicks : PropTypes.number,
};

Stats.defaultProps = {
    gameGeneration : -1,
    clicks : -1,
};

export default Stats