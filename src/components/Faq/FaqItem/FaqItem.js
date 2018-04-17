import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class FaqItem extends Component {
  render() {
    return (
      <div>
        <h2 className="title-content">{this.props.title}</h2>
        <div className="child-content">{this.props.children}</div>
      </div>
    );
  }
}

FaqItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FaqItem;

