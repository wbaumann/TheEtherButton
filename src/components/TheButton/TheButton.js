import React, { Component } from 'react'

import './styles.css'

class TheButton extends Component {
    render() {
        return(
            <div className="pure-u-1-1">
              <h1>TheButton</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <p>This section will contain our button to count down 20 blocks</p>
            </div>
        );
    }
}

export default TheButton