import React, { Component } from 'react';

import './styles.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <ul>
          <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/wbaumann/TheEtherButton">GitHub</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://etherscan.io/address/0xdeafc8d49ea6d6044eaa53f5e7c7c35c60e13d7f">EtherScan</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://opensource.org/licenses/MIT">License</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/wbaumann/TheEtherButton/blob/master/privacy_policy.txt">Privacy Policy</a></li>
        </ul>
      </div>
    );
  }
}

export default Footer;
