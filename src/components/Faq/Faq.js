import React, { Component } from 'react';
import FaqItem from './FaqItem/FaqItem';

import './styles.css';

class Faq extends Component {
    render() {
        return(
            <div>
                <h1>FAQ:</h1>
                <FaqItem title="How can I play?">
                    <p>Here’s what you need to play:</p>
                    <ul>
                        <li>A computer with Chrome or Firefox</li>
                        <li>MetaMask, a digital wallet used for Ethereum apps</li>
                        <li>Ether, a "cryptocurrency" that powers Ethereum and hence TheEtherButton.</li>
                    </ul>
                    <p>Here's a quick guide on how to install MetaMask: </p>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/tfETpi-9ORs" frameBorder="0" allowFullScreen></iframe>
                </FaqItem>
                <FaqItem title="Why this game?">
                    <p><a target="_blank" href="https://en.wikipedia.org/wiki/The_Button_(Reddit)">The Button was an online meta-game and social experiment that featured an online button and 60 second countdown timer that would reset each time the button was pressed</a>. We thought it would be fun to re-create the same concept but on the Ethereum blockchain.</p>
                </FaqItem>
                <FaqItem title="What can I do with my button click flairs?">
                    <p>All click flairs have been designed as <a target="_blank" href="http://erc721.org/">ERC-721</a> tokens, so you can trade them as you please. Despite this, please note that you still are only allowed to click the button a single time. </p>
                </FaqItem>
                <FaqItem title="Why does it cost money?">
                    <p>Clicking the button costs a small amount (ie 0.001ETH) in order to discourage someone from creating 1000s of Ethereum accounts and constantly spamming this Smart Contract.</p>
                </FaqItem>
            </div>
        );
    }
}

export default Faq