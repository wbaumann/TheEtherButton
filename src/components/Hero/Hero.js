import React, { Component } from 'react'

import './styles.css'

class Hero extends Component {
    render() {
        return(
            <div className="hero">
                <h1>An <a target="_blank" href="https://www.ethereum.org/">Ethereum</a>-based version of Reddit's <a target="_blank" href="https://www.reddit.com/r/thebutton/">r/TheButton</a> game.</h1>
                <p className="subtitle">You will be awarded a unique <a  target="_blank"href="http://erc721.org/">ERC-721 token</a> flair based on how close the counter is to Block 0 when you click the button, but you may only press it once. Choose wisely...</p>
            </div>
        );
    }
}

export default Hero