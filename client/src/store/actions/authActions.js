import axios from 'axios';
import Axios from '../../axiosInstances/axios-orders';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/actionsTypes'

import { returnErrors, clearErrors } from './index'
// Check token and load user
// by making a request to /api/auth/user

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOADING });
        
        // Get token from localStorage from the authReducer State
        const token = getState().auth.token;

        // Configuring the headers
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        // Check if token is present
        if (token) {
            config.headers['x-auth-token'] = token;
        }

        // Fetching the user
        Axios.get('api/auth/user', config)
            .then(res => {
                console.log(res);
                dispatch({ type: USER_LOADED, payload: res.data });                    
            })
            .catch(err => {
                console.log(err.response.data);
                console.log(err.response.status);
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({ type: AUTH_ERROR });
            })
    }
}