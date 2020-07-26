import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = ( WrappedComponent, axios) => {
    return class extends Component{
        
        state = {
            error: null
        }

        componentWillMount() {
            // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
            // Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, 
            // this is a good place to instantiate the network request.

            // You may call setState() immediately in componentDidMount().

            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState({error: null});
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            // componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
            // Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests,
            // or cleaning up any subscriptions that were created in componentDidMount().

            // We use it to cancel the interceptors when we are done using the component. eg. when we stop using the 
            // <BurgerBuilder /> and there is no need for checking for that error state.
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        closeErrorModalHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.closeErrorModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;
