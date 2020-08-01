import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { logout } from '../../../../store/actions/index';
import LogoutForm from '../../../LogoutForm/LogoutForm';
import './LogoutButton.css';

class LogoutButton extends Component {

    state = {
        showModal: false,
        mustRedirect: false
    }

    confirmLogout = () => {
        this.props.onLogoutConfirm();
        this.setState({
            showModal: false,
            mustRedirect: true
        });
    }

    cancelModal = () => {
        this.setState({
            ...this.state,
            showModal: false
        })
    }

    displayModal = () => {
        this.setState({
            ...this.state,
            showModal: true
        })
    }

    render() {

        let redirect = null;
        if (this.state.mustRedirect) {
            redirect = <Redirect to='/' />
        }

        return (
            <Fragment>
                {redirect}  
                {this.state.showModal ? <LogoutForm cancelLogout={this.cancelModal} confirmLogout={this.confirmLogout} /> : null}
                <button className="LogoutButton" onClick={this.displayModal}>
                    <p className="logout">Logout</p>
                </button>
            </Fragment>

        );
    }
}

const mapStatetoProps = state => {
    return {
        authInfo: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutConfirm: () => dispatch(logout())
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(LogoutButton);
