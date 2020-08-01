import * as actionTypes from './actionsTypes'
import Axios from '../../axiosInstances/axios-orders'
import {tokenConfig} from './authActions'

export const purchaseBurgerSuccess = (orderID, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: orderID,
        orderData: orderData
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, username) => {
    return dispatch => {
        orderData.username = username;
        dispatch(purchaseBurgerStart());
        Axios.post("/api/orders/new", orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = orders => {
    console.log("fetchedOrders", orders)
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const fetchOrders = ( username, token ) => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart());
        
        const requestBody = JSON.stringify({
            username: username
        })
            
        Axios.post('/api/orders', requestBody, tokenConfig(getState))
            .then(response => {
                const fetchedOrders = [];

                console.log(response.data.orders);

                dispatch(fetchOrdersSuccess(response.data.orders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            })
    }
}