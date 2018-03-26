import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './styles.css'

class Account extends Component {
    getActiveAccount() {
        // TODO: Substring
        return this.props.accounts == null ? "" : this.props.accounts[0].substring(0, 12) + "..."
    }

    render() {
        return(
            <p className="active-account">{this.getActiveAccount()}</p>
        );
    }
}

Account.propTypes = {
    accounts : PropTypes.arrayOf(PropTypes.string)
};

export default Account