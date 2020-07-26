import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL } from './actionsTypes'

export const loginStart = () => {
    return {
        type: LOGIN_START
    };
};

export const loginSuccess = loginData => {
    return {
        type: LOGIN_SUCCESS,
        loginData: loginData
    };
};

export const loginFail = error => {
    return {
        type: LOGIN_FAIL,
        error: error
    };
};

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginStart());
    };
};