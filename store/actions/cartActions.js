import { ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, CLEAR_CART } from '../actions/actionTypes';

// ========================== DEFINE SYNCHRONOUS ACTIONS ==========================
export const addToCart = (allProducts, prodId, userId) => ({
    type: ADD_ITEM_TO_CART,
    productId: prodId,
    userId,
    allProducts
});

export const deleteFromCart = (allProducts, prodId, userId) => ({
    type: DELETE_ITEM_FROM_CART,
    productId: prodId,
    userId,
    allProducts
});

export const clearCart = userId => ({
    type: CLEAR_CART,
    userId
})