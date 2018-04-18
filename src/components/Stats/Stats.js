import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickFlairs from '../ClickFlairs/ClickFlairs';

import './styles.css';

class Stats extends Component {
  render() {
    return (
      <div>
        <h1>Stats:</h1>
        <p>Here&#39;s the current state of the game&#39;s smart contract:</p>
        <ul>
          <li>Game Generation: {this.props.gameGeneration}</li>
          <li>Total Clicks: {this.props.clicks}</li>
        </ul>
        { this.props.erc721Clicks != null &&
          this.props.erc721Clicks.length > 0 &&
          <p>The last clicks were:</p> }
        { this.props.erc721Clicks != null &&
          this.props.erc721Clicks.length > 0 &&
          <ClickFlairs erc721Clicks={this.props.erc721Clicks} /> }
      </div>
    );
  }
}

Stats.propTypes = {
  gameGeneration: PropTypes.number,
  clicks: PropTypes.number,
  erc721Clicks: PropTypes.arrayOf(PropTypes.shape),
};

Stats.defaultProps = {
  gameGeneration: -1,
  clicks: -1,
  erc721Clicks: [],
};

export default Stats;
