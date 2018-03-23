import React, { Component } from 'react'

import './styles.css'

class Footer extends Component {
    render() {
        return(
            <div className="footer">
                <ul>
                    <li><a href="https://github.com/wbaumann/TheEtherButton">GitHub</a></li>
                    <li><a href="#">EtherScan</a></li>
                    <li><a href="https://opensource.org/licenses/MIT">License</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
        );
    }
}

export default Footer