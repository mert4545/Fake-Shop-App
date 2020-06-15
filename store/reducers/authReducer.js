import { updateState } from '../utility';
import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, LOGOUT } from '../actions/actionTypes';

const initialState = {
    idToken: '',
    userId: '',
    error: null,
    errMessage: '',
    loading: false
};

const auth_start = state => {
    return updateState(state, {
        error: null,
        errMessage: '',
        loading: true
    });
};

const auth_success = (state, action) => {
    const { userId, token } = action;
    return updateState(state, {
        userId,
        idToken: token,
        error: null,
        errMessage: '',
        loading: false
    });
};

const auth_fail = (state, action) => {
    return updateState(state, {
        error: true,
        errMessage: action.errMessage,
        loading: false
    });
};


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START: return auth_start(state);
        case AUTH_SUCCESS: return auth_success(state, action);
        case AUTH_FAIL: return auth_fail(state, action);
        case LOGOUT: return initialState;
        default: return state;
    }
};