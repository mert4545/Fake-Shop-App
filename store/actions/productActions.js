import axios from '../../axios/axios-shop';
import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS, ADD_PRODUCT_FAIL, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS } from '../actions/actionTypes';

// ========================== DEFINE ACTION CREATORS ==========================
const fetchProductsStart = () => ({
    type: FETCH_PRODUCTS_START
});

const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    products
});

const fetchProductsFail = () => ({
    type: FETCH_PRODUCTS_FAIL
});

const addProductStart = () => ({
    type: ADD_PRODUCT_START
});

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    product
});

const addProductFail = () => ({
    type: ADD_PRODUCT_FAIL
});



// ========================== DEFINE ASYNCHRONOUS ACTIONS ==========================
export const fetchProducts = () => {
    return async dispatch => {
        dispatch(fetchProductsStart());

        try {
            const configOpts = {
                url: '/products.json',
                method: 'GET'
            };
            const response = await axios(configOpts);

            const products = [];
            for (const key in response.data) {
                products.push(response.data[key]);
            }
            dispatch(fetchProductsSuccess(products));
        } catch (err) {
            dispatch(fetchProductsFail());
        }
    }
};

export const addProduct = product => {
    return async dispatch => {
        dispatch(addProductStart());

        try {
            const configOpts = {
                headers: {
                    'Content-type': 'application/json'
                }
            };
            const response = await axios.post('/products.json', product, configOpts);

            dispatch(addProductSuccess(JSON.parse(response.config.data)));
        } catch (err) {
            dispatch(addProductFail());
        }
    }
}
