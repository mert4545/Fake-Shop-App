import { ADD_ORDERS } from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    orders: []
};

const add_orders = (state, action) => {
    const addedProducts = [...action.products];

    let updatedOrders = [...state.orders];  // get existing "orders" state
    if (!updatedOrders) return;
    if (updatedOrders.length === 0) {  // no previous orders are placed. directly add new products to "orders" state
        updatedOrders = [...state.orders, ...addedProducts];
    } else {  // existing products detected. check if any of "addedProducts" is ordered before. If so, increase its quantity; else, add it to "orders" state
        const orderProductTitles = updatedOrders.map(order => order.product.title);  // extract all existing ordered product title(s)
        const addedProductTitles = addedProducts.map(item => item.product.title);  // extract titles of all currently added product(s)

        for (const title of addedProductTitles) {  // for each currently added product title,
            if (!orderProductTitles.includes(title)) {  // check if it has previously ordered. if no product with this title is ordered yet, add that product to "orders"
                const addedProduct = addedProducts.find(item => item.product.title === title);
                updatedOrders = [...updatedOrders, addedProduct];
            } else {  // since product has been previously ordered,
                const prod = addedProducts.find(item => item.product.title === title);  // extract product to be updated in "orders"

                const productIndex = updatedOrders.findIndex(order => order.product.id === prod.product.id);  // find index of this product in "orders"
                const updatedProduct = { ...updatedOrders[productIndex] };  // get current state of existing product in "orders"
                updatedProduct.quantity += prod.quantity;  // update quantity of the product
                updatedOrders[productIndex] = updatedProduct;  // update entire product in "orders"
            }
        }
    }

    return updateState(state, {
        orders: updatedOrders
    });
};



export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDERS: return add_orders(state, action);
        default: return state;
    }
};