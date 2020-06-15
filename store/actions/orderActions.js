import axios from '../../axios/axios-shop';
import { ADD_ORDER_FAIL, ADD_ORDER_START, ADD_ORDER_SUCCESS, FETCH_ORDERS_FAIL, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS } from '../actions/actionTypes';

// ========================== DEFINE ACTION CREATORS ==========================
const fetchOrdersStart = () => ({
    type: FETCH_ORDERS_START
});

const fetchOrdersSuccess = orders => ({
    type: FETCH_ORDERS_SUCCESS,
    orders
});

const fetchOrdersFail = () => ({
    type: FETCH_ORDERS_FAIL
});

const addOrderStart = () => ({
    type: ADD_ORDER_START
});

const addOrderSuccess = orders => ({
    type: ADD_ORDER_SUCCESS,
    orders
});

const addOrderFail = () => ({
    type: ADD_ORDER_FAIL
});


// ========================== DEFINE ASYNCHRONOUS ACTIONS ==========================
export const fetchOrders = () => {
    return async (dispatch, getState) => {
        dispatch(fetchOrdersStart());

        try {
            const token = getState().rootAuth.idToken;
            const userId = getState().rootAuth.userId;
            const configOpts = {
                url: `/orders/${userId}.json?auth=${token}`,
                method: 'GET'
            };
            const response = await axios(configOpts);

            const orders = [];
            for (const key in response.data) {
                orders.push(response.data[key]);
            }
            dispatch(fetchOrdersSuccess(orders));
        } catch (err) {
            dispatch(fetchOrdersFail());
        }
    }
};


export const addOrder = newOrders => {
    return async (dispatch, getState) => {
        dispatch(addOrderStart());

        try {
            /* // existing orders detected. check if any of "addedOrders" is ordered before. If so, increase its quantity; else, add it to "orders" state
            const orderProductTitles = updatedOrders.map(order => order.product.title);  // extract all existing ordered product title(s)
            const addedOrderTitles = newOrders.map(item => item.product.title);  // extract titles of all currently added product(s)

            for (const title of addedOrderTitles) {  // for each currently added product title,
                if (!orderProductTitles.includes(title)) {  // check if it has previously ordered. if no product with this title is ordered yet, add that product to "orders"
                    const addedOrder = newOrders.find(item => item.product.title === title);
                    updatedOrders = [...updatedOrders, addedOrder];
                } else {  // since product has been previously ordered,
                    const prod = newOrders.find(item => item.product.title === title);  // extract product to be updated in "orders"
                    const productIndex = updatedOrders.findIndex(order => order.product.id === prod.product.id);  // find index of this product in "orders"

                    const updatedProduct = { ...updatedOrders[productIndex] };  // get current state of existing product in "orders"
                    updatedProduct.quantity += prod.quantity;  // update quantity of the product
                    updatedOrders[productIndex] = updatedProduct;  // update entire product in "orders"
                }
            } */

            const configOpts = {
                headers: {
                    'Content-type': 'application/json'
                }
            };

            const token = getState().rootAuth.idToken;
            const userId = getState().rootAuth.userId;

            for (const order of newOrders) {
                const response = await axios.post(`/orders/${userId}.json?auth=${token}`, order, configOpts);
                dispatch(addOrderSuccess(JSON.parse(response.config.data)));
            }
        } catch (err) {
            dispatch(addOrderFail());
        }
    }
};