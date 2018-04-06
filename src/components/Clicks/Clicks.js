import React, { Component } from 'react'
import Erc721Flair from './Erc721Flair/Erc721Flair'

import './styles.css'

class Clicks extends Component {
    render() {
        return(
            <div>
                <h2>Your Clicks</h2>
                <p>Your Click Metadata Here</p>
                <Erc721Flair blocksAwayFromDesiredBlock={10} clickTime={1273185387} clickGeneration={1} />
            </div>
        );
    }
}

export default Clicks