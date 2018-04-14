import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Erc721Flair from './Erc721Flair/Erc721Flair';

import './styles.css';

class ClickFlairs extends Component {
  render() {
    return (
      <div >
        <div className="click-flairs" >
          {this.props.erc721Clicks.map(erc721Click => <Erc721Flair {...erc721Click} key={erc721Click.clickTime} />)}
        </div>
      </div>
    );
  }
}

ClickFlairs.propTypes = {
  erc721Clicks: PropTypes.array,
};

ClickFlairs.defaultProps = {
  erc721Clicks: [],
};

export default ClickFlairs;
