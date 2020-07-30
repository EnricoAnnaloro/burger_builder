import { GET_ERRORS, CLEAR_ERRORS } from './actionsTypes';

// Return found errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            msg: msg,
            status: status,
            id: id
        }
    }
}

// Clear Errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}