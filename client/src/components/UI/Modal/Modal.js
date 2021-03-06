import React, { Component, Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'

class Modal extends Component {

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentDidUpdate () {
        
    }

    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >                    
                    {this.props.children}
                    {this.props.isError ? <i className="far fa-5x fa-frown"></i> : null}
            </div>
            </Fragment>
        );
    }
}

export default Modal;