import { ADD_ORDERS } from '../actions/actionTypes';

export const addOrders = products => ({
    type: ADD_ORDERS,
    products
});