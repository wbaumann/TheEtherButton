import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularCountdownTimer from './CircularCountdownTimer/CircularCountdownTimer';

import './styles.css'

class TheButton extends Component {

    getRemainingBlockCount() {
        return Math.max(this.props.victoryBlockNumber - this.props.currentBlockNumber, 0);
    }

    render() {
        return(
            <div className="pure-u-1-1">
              <CircularCountdownTimer maximumValue={this.props.requiredBlocksElapsedForVictory} 
                currentValue={this.getRemainingBlockCount()} />
            </div>
        );
    }
}

TheButton.propTypes = {
    currentBlockNumber: PropTypes.number,
    victoryBlockNumer: PropTypes.number,
    requiredBlocksElapsedForVictory: PropTypes.number
};

TheButton.defaultProps = {
    currentBlockNumber: 0,
    victoryBlockNumber: 20,
    requiredBlocksElapsedForVictory: 20
};

export default TheButton