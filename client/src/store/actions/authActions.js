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

        // Fetching the user
        Axios.get('api/auth/users', tokenConfig(getState))
            .then(res => {
                dispatch({ type: USER_LOADED, payload: res.data });
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data.msg, err.response.status));
                dispatch({ type: AUTH_ERROR });
            })
    }
}

export const registerUser = (userRegistrationInfo) => {
    return dispatch => {
        // Stringify to transform javascript object into JSON object
        const registrationBody = JSON.stringify({
            username: userRegistrationInfo.username,
            password: userRegistrationInfo.password,
            name: userRegistrationInfo.name,
            last_name: userRegistrationInfo.last_name,
            email: userRegistrationInfo.email,
            phone_number: userRegistrationInfo.phone_number
        })
    
        // Configuring the headers
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
    
        Axios.post('/api/users', registrationBody, config)
            .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
            .catch(err => {
                dispatch({ type: REGISTER_FAIL });
                dispatch(returnErrors(err.response.data.msg, err.response.status, "REGISTER_FAIL"));
            });
    }
}

// Login User Procesure
export const login = (username, password) => {
    return dispatch => {
        const loginBody = JSON.stringify({
            username: username,
            password: password
        })
    
        // Configuring the headers
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
    
        Axios.post('/api/auth', loginBody, config)
            .then(res => {
                dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            })
            .catch(err => {
                console.log("login catch")
                dispatch({ type: LOGIN_FAIL });
                dispatch(returnErrors(err.response.data.msg, err.response.status, "LOGIN_FAIL"))
            });
    }
}

// Logout User, simply calls the LOGOUT_SUCCESS which clears token and other data
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
}

// Set up config, header and token for authentication
export const tokenConfig = getState => {
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

    return config

}