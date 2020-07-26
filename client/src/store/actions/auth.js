import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from './actionsTypes'

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = authData => {
    return {
        type: AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
    };
};