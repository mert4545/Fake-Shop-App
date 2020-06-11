import { ADD_ORDER_FAIL, ADD_ORDER_SUCCESS, ADD_ORDER_START, FETCH_ORDERS_FAIL, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS } from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    orders: [],
    error: null,
    loading: false
};

const fetch_orders_start = state => {
    return updateState(state, {
        error: null,
        loading: true
    });
};

const fetch_orders_success = (state, action) => {
    const fetchedOrders = [...action.orders];
    return updateState(state, {
        orders: fetchedOrders,
        error: null,
        loading: false
    });
};

const fetch_orders_fail = state => {
    return updateState(state, {
        error: true,
        loading: false
    });
};

const add_order_start = state => {
    return updateState(state, {
        loading: true,
        error: null
    });
};

const add_order_success = state => {
    return updateState(state, {
        error: null,
        loading: false
    });
};

const add_order_fail = state => {
    return updateState(state, {
        error: true,
        loading: false
    });
};


export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_START: return fetch_orders_start(state);
        case FETCH_ORDERS_SUCCESS: return fetch_orders_success(state, action);
        case FETCH_ORDERS_FAIL: return fetch_orders_fail(state);
        case ADD_ORDER_START: return add_order_start(state);
        case ADD_ORDER_SUCCESS: return add_order_success(state);
        case ADD_ORDER_FAIL: return add_order_fail(state);
        default: return state;
    }
};