/* eslint max-len: 0 */

import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';

import FaqItem from './FaqItem/FaqItem';

import './styles.css';

class Faq extends Component {
  render() {
    return (
      <div>
        <h1>FAQ:</h1>
        <FaqItem title="Why this game?">
          <p><a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/The_Button_(Reddit)">The Button was an online meta-game and social experiment that featured an online button and 60 second countdown timer that would reset each time the button was pressed</a>. We thought it would be fun to re-create the same concept but on the Ethereum blockchain.</p>
        </FaqItem>
        <FaqItem title="How can I play?">
          <p>Here’s what you need to get started:</p>
          <ul>
            <li>A computer with <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/chrome/browser/features.html">Chrome</a> or <a target="_blank" rel="noopener noreferrer" href="https://www.mozilla.org/firefox">Firefox</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a>, a digital wallet used for Ethereum apps</li>
            <li>Ether, a &#34;cryptocurrency&#34; that powers the <a target="_blank" rel="noopener noreferrer" href="https://www.ethereum.org/">Ethereum</a> blockchain, which runs this game.</li>
          </ul>
          <p>The video below will guide you through how install MetaMask:</p>
          <LazyLoad height={315} once >
            <p className="iframe-center">
              <iframe title="metamask" width="560" height="315" src="https://www.youtube-nocookie.com/embed/tfETpi-9ORs" frameBorder="0" allowFullScreen />
            </p>
          </LazyLoad>
        </FaqItem>
        <FaqItem title="What are the rules?">
          <p>All game rules have been codified in an Ethereum <a target="_blank" rel="noopener noreferrer" href="https://www.coindesk.com/information/ethereum-smart-contracts-work/">Smart Contract</a>:</p>
          <ul>
            <li>Each time the button is clicked, it will reset the counter to 20 blocks.</li>
            <li>You will be awarded a unique <a target="_blank" rel="noopener noreferrer" href="http://erc721.org/">ERC-721</a> token, based on how close the counter is to Block 0 when you click it.</li>
            <li>You may only click the button once per game round (ie generation).</li>
            <li>The game ends once someone clicks the button at block 0. This increments the game &#34;generation&#34; and restarts the game. You  will retain ownership of your tokens at the end of a round, but no new tokens can be minted for that generation.</li>
          </ul>
          <p>This game is intended to act as a type of social experiment, where anyone can reset the progress made by all other players.</p>
        </FaqItem>
        <FaqItem title="What can I do with my button click flairs?">
          <p>All click flairs have been designed as <a target="_blank" rel="noopener noreferrer" href="http://erc721.org/">ERC-721</a> tokens, which means that each will exist as a unique token. In accordance with this standard, you&#39;re free to sell, collect, trade, or do anything else with your tokens. Please note that you still are only allowed to click the button a single time per game generation (i.e. you can only create a single token each round).</p>
        </FaqItem>
        <FaqItem title="What does it cost?">
          <p>Clicking the button costs a small amount (ie 0.0005ETH) in order to discourage someone from creating 1000s of Ethereum accounts and constantly spamming this Smart Contract to keep the button pinned at 20 blocks.</p>
        </FaqItem>
        <FaqItem title="Where's the code?" >
          <p>All code is freely available on GitHub: <a target="_blank" rel="noopener noreferrer" href="https://github.com/wbaumann/TheEtherButton">TheEtherButton</a>.</p>
        </FaqItem>
        <FaqItem title="Isn't this contract vulernable to front running?" >
          <p>Sure is... Blockchains are subject to race conditions, meaning that the order of transactions in a given block can be manipulated. We have not attempted to handle this scenario to allow for further manipulation of the gameplay.</p>
        </FaqItem>
      </div>
    );
  }
}

export default Faq;
