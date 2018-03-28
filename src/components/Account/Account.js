import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './styles.css'

class Account extends Component {
    getActiveAccount() {
        if (this.props.accounts && this.props.accounts.length > 0) {
            return this.props.accounts[0].substring(0, 12) + "...";
        } else {
            return "";
        }
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