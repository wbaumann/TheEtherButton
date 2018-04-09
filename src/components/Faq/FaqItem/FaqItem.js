import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css'

class FaqItem extends Component {
    render() {
        return(
            <div>
                <h2>{this.props.title}</h2>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

FaqItem.propTypes = {
    title: PropTypes.string
};

export default FaqItem