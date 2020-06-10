import axios from '../../axios/axios-products';
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
            const response = await axios({
                url: '/products',
                method: 'GET'
            });
            const jsonResponse = response.json();

            console.log(jsonResponse);
            dispatch(fetchProductsSuccess(jsonResponse));
        } catch (err) {
            dispatch(fetchProductsFail());
        }
    }
};

export const addProduct = product => {
    return async dispatch => {
        dispatch(addProductStart());

        try {
            const response = await axios({
                url: `/products/${product.id}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                data: product
            });
            const jsonResponse = response.json();

            console.log(jsonResponse);
            dispatch(addProductSuccess(jsonResponse));
        } catch (err) {
            dispatch(addProductFail());
        }
    }
}
