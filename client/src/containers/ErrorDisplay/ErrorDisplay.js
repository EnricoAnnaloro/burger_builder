import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { clearErrors } from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';

const ErrorDisplay = ( props ) => {

    let errorModal = null;
    console.log(props.error.id)
    const isError = props.error.id !== null;
    if (isError) {
        errorModal = (
            <Modal show={isError} modalClosed={props.onModalClose} isError={props.isError}>
                {props.error.msg}
            </Modal>
        )
    }

    return (
        <Fragment>
            {errorModal}
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onModalClose: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDisplay);
