import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, ADD_PRODUCT_FAIL, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS } from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {  // set an initial state
    allProducts: [],
    error: null,
    loading: false
};

const fetch_products_start = state => {
    return updateState(state, {
        error: null,
        loading: true
    });
};

const fetch_products_success = (state, action) => {
    const fetchedProducts = [...action.products];
    return updateState(state, {
        allProducts: fetchedProducts,
        error: null,
        loading: false
    });
};

const fetch_products_fail = state => {
    return updateState(state, {
        error: true,
        loading: false
    });
};

const add_product_start = state => {
    return updateState(state, {
        error: null,
        loading: true
    });
};

const add_product_success = state => {
    return updateState(state, {
        error: null,
        loading: false
    });
};

const add_product_fail = state => {
    return updateState(state, {
        error: true,
        loading: false
    });
};


export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_START: return fetch_products_start(state);
        case FETCH_PRODUCTS_SUCCESS: return fetch_products_success(state, action);
        case FETCH_PRODUCTS_FAIL: return fetch_products_fail(state);
        case ADD_PRODUCT_START: return add_product_start(state);
        case ADD_PRODUCT_SUCCESS: return add_product_success(state);
        case ADD_PRODUCT_FAIL: return add_product_fail(state);
        default: return state;  // for the 1st render cycle, the application will fall in this line and "initialState" will be used.
    }
};