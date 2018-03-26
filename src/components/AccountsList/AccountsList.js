import React, { Component } from 'react'
import { User } from 'react-feather'
import Account from '../Account/Account'
import Network from '../Network/Network'

import './styles.css'

class AccountsList extends Component {
    render() {
        return(
            <div className="navbar-right account-wrapper">
                <User color="#ffffff" className="account-icon"/>
                <div className="account-details" >
                    <Account accounts={this.props.accounts} />
                    <Network />
                </div>
            </div>
        );
    }
}

export default AccountsList