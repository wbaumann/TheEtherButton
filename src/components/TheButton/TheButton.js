import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularCountdownTimer from './CircularCountdownTimer/CircularCountdownTimer';
import GameColors from '../../utils/GameColors'

import './styles.css'

class TheButton extends Component {

    getRemainingBlockCount() {
        return Math.max(this.props.victoryBlockNumber - this.props.currentBlockNumber, 0);
    }

    render() {
        return(
            <div className="the-button-container">
                <CircularCountdownTimer
                    onClick={this.props.onClick}
                    maximumValue={this.props.requiredBlocksElapsedForVictory} 
                    currentValue={this.getRemainingBlockCount()}
                    color={GameColors.getColor(this.getRemainingBlockCount())} />
            </div>
        );
    }
}

TheButton.propTypes = {
    currentBlockNumber: PropTypes.number,
    victoryBlockNumer: PropTypes.number,
    requiredBlocksElapsedForVictory: PropTypes.number,
    onClick: PropTypes.func
};

TheButton.defaultProps = {
    currentBlockNumber: 0,
    victoryBlockNumber: 20,
    requiredBlocksElapsedForVictory: 20
};

export default TheButton