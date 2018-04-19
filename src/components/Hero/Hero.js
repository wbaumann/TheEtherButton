import React, { Component } from 'react';

import './styles.css';

class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <h1>An Ethereum-based version of Reddit&#39;s <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/thebutton/">r/TheButton</a> game.</h1>
        <p className="subtitle">You will be awarded a unique <a target="_blank" rel="noopener noreferrer" href="http://erc721.org/">ERC-721 token</a> flair based on how close the counter is to Block 0 when you click the button below. This token is yours to sell, collect, or trade. But you may only press the button once. Choose wisely...</p>
      </div>
    );
  }
}

export default Hero;
