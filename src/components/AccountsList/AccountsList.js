import React, { Component } from 'react'
import { User } from 'react-feather'
import Account from '../Account/Account'
import Network from '../Network/Network'

import './styles.css'

class AccountsList extends Component {
    render() {
        return(
            <div className="navbar-right">
                <User color="#ffffff" className="account"/>
                <Account accounts={this.props.accounts} />
                <Network />
            </div>
        );
    }
}

export default AccountsList