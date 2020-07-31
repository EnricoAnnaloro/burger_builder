import React, { Component } from 'react';

import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';


class LogoutForm extends Component {

    render() {
        

        return (
            <div>
                <Modal show={true} modalClosed={this.props.cancelLogout} isError={false}>
                    <p>Are you sure?</p>
                    <Button btnType="Success" clicked={this.props.confirmLogout}>LOGOUT</Button>
                    <Button btnType="Danger" clicked={this.props.cancelLogout}>Cancel</Button>
                </Modal>
            </div>
        );
    }
}



export default LogoutForm;
