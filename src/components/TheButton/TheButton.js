import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CircularCountdownTimer from './CircularCountdownTimer/CircularCountdownTimer';
import Loading from './Loading/Loading';
import GameColors from '../../utils/GameColors';

import './styles.css';

class TheButton extends Component {
  getRemainingBlockCount() {
    return Math.max(this.props.victoryBlockNumber - this.props.currentBlockNumber, 0);
  }

  render() {
    return (
      <div className="the-button-container">
        <CircularCountdownTimer
          onClick={this.props.onClick}
          maximumValue={this.props.requiredBlocksElapsedForVictory}
          currentValue={this.getRemainingBlockCount()}
          color={GameColors.getColor(this.getRemainingBlockCount())}
          areButtonClicksAllowed={this.props.areButtonClicksAllowed}
        />
        {this.props.showLoading && <Loading />}
      </div>
    );
  }
}

TheButton.propTypes = {
  currentBlockNumber: PropTypes.number,
  victoryBlockNumber: PropTypes.number,
  requiredBlocksElapsedForVictory: PropTypes.number,
  showLoading: PropTypes.bool,
  areButtonClicksAllowed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

TheButton.defaultProps = {
  currentBlockNumber: 0,
  victoryBlockNumber: 20,
  requiredBlocksElapsedForVictory: 20,
  areButtonClicksAllowed: true,
  showLoading: false,
};

export default TheButton;
