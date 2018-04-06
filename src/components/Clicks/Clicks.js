import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Erc721Flair from './Erc721Flair/Erc721Flair'

import './styles.css'

class Clicks extends Component {
    render() {
        return(
            <div >
                <h1>Your ERC-721 Click Tokens:</h1>
                <div className="click-flairs" >
                    {this.props.erc721Clicks.map(erc721Click => <Erc721Flair {...erc721Click} key={erc721Click.clickGeneration} /> )} 
                </div>
            </div>
        );
    }
}

Clicks.propTypes = {
    erc721Clicks: PropTypes.array
};

Clicks.defaultProps = {
    erc721Clicks: []
};

export default Clicks