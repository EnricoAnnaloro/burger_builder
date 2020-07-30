import { combineReducers } from 'redux';

import burgerBuilder from './burgerBuilderReducer';
import orders from './ordersReducer';
import auth from './authReducer';
import error from './errorReducer'

export default combineReducers({
    burgerBuilder: burgerBuilder,
    orders: orders,
    auth: auth,
    error: error
});