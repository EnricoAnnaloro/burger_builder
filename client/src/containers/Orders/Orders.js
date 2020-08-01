import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Order from './Order/Order';
import Loader from '../../components/UI/Loader/Loader';
import * as Actions from '../../store/actions/index';

import './Orders.css'

class Orders extends Component {

    componentDidMount() {
        if (this.props.isUserAuthenticated) {
            this.props.onFetchOrders(this.props.user.username, this.props.token);
        }
    }

    render() {

        let unauthorized = null;
        if (!this.props.isUserAuthenticated) {
            unauthorized = <Redirect to='/' />
        }

        let orders = <Loader />
        if (!this.props.loading) {
            orders = this.props.orders.length >= 1 ?
                this.props.orders.reverse().map(order => {
                    return (
                        <Order
                            key={order._id}
                            order={order}
                        />)
                }) : <p style={{ textAlign: "center", marginTop: "5px" }}>No Orders Found!</p>
        }

        return (
            <div className="OrdersPage">
                {unauthorized}
                <h2>Your Orders</h2>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        isUserAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (username, token) => dispatch(Actions.fetchOrders(username, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
