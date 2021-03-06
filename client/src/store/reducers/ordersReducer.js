import * as actionTypes from '../actions/actionsTypes'

const initialState = {
    orders: [],
    loading: false,
    isPurchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                isPurchased: false
            };

        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderID
            }

            return {
                ...state,
                loading: false,
                isPurchased: true,
                orders: state.orders.concat(newOrder)
            };

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };

        case actionTypes.FETCH_ORDERS_SUCCESS:
            console.log('FETCH_ORDERS_SUCCESS', action)
            return {
                ...state,
                orders: action.orders,
                loading: false
            };

        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export default reducer;