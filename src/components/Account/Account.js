import React, { Component } from 'react'
import { User } from 'react-feather';

import '../../css/oswald.css'
import '../../css/open-sans.css'
import '../../css/pure-min.css'

import './styles.css'

class Account extends Component {
    render() {
        return(
            <div className="navbar-right">
                <User color="#ffffff" className="account"/>
                <a href="#" className="pure-menu-heading pure-menu-link">0x0123456789...</a>
            </div>
        );
    }
}

export default Account