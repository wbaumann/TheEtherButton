import React, { Component } from 'react';

import './styles.css';

class Loading extends Component {

    render() {
        return(
            <div className="loading">
                <div className="lds-dual-ring"></div>
                <p>Waiting for your click to be saved to the Ethereum blockchain (i.e. mined).</p>
            </div>
        );
    }
}

export default Loading