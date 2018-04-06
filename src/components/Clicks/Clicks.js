import React, { Component } from 'react'
import Erc721Flair from './Erc721Flair/Erc721Flair'

import './styles.css'

class Clicks extends Component {
    render() {
        const erc721Clicks = [
            {blocksAwayFromDesiredBlock: 16, clickTime:1273185387, clickGeneration: 1},
            {blocksAwayFromDesiredBlock: 11, clickTime:1276185387, clickGeneration: 2},
            {blocksAwayFromDesiredBlock: 5, clickTime:1289185387, clickGeneration: 3},
        ]
        return(
            <div>
                <h1>Your ERC-721 Click Tokens:</h1>
                <div className="click-flairs" >
                    {erc721Clicks.map(erc721Click => <Erc721Flair {...erc721Click} key={erc721Click.clickGeneration} /> )} 
                </div>
            </div>
        );
    }
}

export default Clicks