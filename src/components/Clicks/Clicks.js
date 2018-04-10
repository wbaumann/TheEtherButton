import React, { Component } from 'react';
import ClickFlairs from '../ClickFlairs/ClickFlairs';

import './styles.css';

class Clicks extends Component {
    render() {
        return(
            <div >
                <h1>Your ERC-721 Click Tokens:</h1>
                <p>You've acquired the following click tokens:</p>
                <ClickFlairs erc721Clicks={this.props.erc721Clicks} />
            </div>
        );
    }
}

export default Clicks