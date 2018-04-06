import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './styles.css'

class Stats extends Component {
    render() {
        return(
            <div>
                <h1>Stats</h1>
                <p>Game Generation: <b>{this.props.gameGeneration}</b></p>
                <p>Total Clicks: <b>{this.props.clicks}</b></p>
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