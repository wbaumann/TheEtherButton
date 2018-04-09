import React, { Component } from 'react'

import './styles.css'

class Footer extends Component {
    render() {
        return(
            <div className="footer">
                <ul>
                    <li><a target="_blank" href="https://github.com/wbaumann/TheEtherButton">GitHub</a></li>
                    <li><a target="_blank" href="#">EtherScan</a></li>
                    <li><a target="_blank" href="https://opensource.org/licenses/MIT">License</a></li>
                    <li><a target="_blank" href="https://github.com/wbaumann/TheEtherButton/blob/master/privacy_policy.txt">Privacy Policy</a></li>
                </ul>
            </div>
        );
    }
}

export default Footer