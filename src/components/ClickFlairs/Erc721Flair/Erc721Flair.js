import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameColors from '../../../utils/GameColors'

import './styles.css'

class Erc721Flair extends Component {

    render() {
        return(
            <div className="click-graphic" style={{background: GameColors.getColor(this.props.blocksAwayFromDesiredBlock)}}>
                <p className="info">{new Date(this.props.clickTime * 1000).toLocaleString()}</p>
                <p className="block-number">{this.props.blocksAwayFromDesiredBlock}</p>
                <p className="info"><i>Generation: {this.props.clickGeneration}</i></p>
            </div>
        );
    }
}

Erc721Flair.propTypes = {
    blocksAwayFromDesiredBlock: PropTypes.number,
    clickTime: PropTypes.number,
    clickGeneration: PropTypes.number
};

export default Erc721Flair