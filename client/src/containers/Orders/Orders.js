import React, { Component } from 'react';
import { connect } from 'react-redux';

import Axios from '../../axiosInstances/axios-orders';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import Order from './Order/Order';
import Loader from '../../components/UI/Loader/Loader';
import * as Actions from '../../store/actions/index';

import './Orders.css'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Loader />
        if (!this.props.loading) {
            orders = this.props.orders.length >= 1 ?
                this.props.orders.map(order => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />)
                }) : <p style={{ textAlign: "center", marginTop: "5px" }}>No Orders Found!</p>
        }

        return (
            <div className="OrdersPage">
                <h2>Your Orders</h2>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(Actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, Axios));
