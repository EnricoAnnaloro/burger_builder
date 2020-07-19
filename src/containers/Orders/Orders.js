import React, { Component } from 'react';
import Axios from '../../axiosInstances/axios-orders'
import withErrorHandler from '../withErrorHandler/withErrorHandler'
import Order from './Order/Order'
import Loader from '../../components/UI/Loader/Loader'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        Axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];

                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }

                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {

        console.log(this.state.orders);

        return (
            <div className="OrdersPage">
                {this.state.orders.map(order => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />)
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, Axios);
