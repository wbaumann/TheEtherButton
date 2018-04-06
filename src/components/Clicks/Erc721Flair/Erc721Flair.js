import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css'

class Erc721Flair extends Component {
    getBackgroundColor() {
        switch(this.props.blocksAwayFromDesiredBlock) {
            case 20:
            case 19:
                return "#673AB7";
            case 18:
            case 17:
                return "#3F51B5";
            case 16:
            case 15:
                return "#2196F3";
            case 14:
            case 13:
                return "#03A9F4";
            case 12:
            case 11:           
                return "#00BCD4";
            case 10:
            case 9:
                return "#009688";
            case 8:
            case 7:
                return "#4CAF50";
            case 6:
                return "#8BC34A";
            case 5:
                return "#CDDC39";
            case 4:
                return "#FFEB3B";
            case 3:
                return "#FFC107";
            case 2:
                return "#FF9800";
            case 1:
                return "#FF5722";
            case 0:
                return "#F44336";
            default:
                return "";
        }
    }

    render() {
        return(
            <div className="click-graphic" style={{background: this.getBackgroundColor()}}>
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