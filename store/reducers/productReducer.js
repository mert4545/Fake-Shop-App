import { PRODUCTS } from '../../data/product';
import { FETCH_ALL_PRODUCTS, ADD_PRODUCT } from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {  // set an initial state
    allProducts: [],
    dummyAllProducts: PRODUCTS   // this state will be removed after interacting with db and fetching PRODUCTS from db. 
};                               // In that case, in "fetch_all_products" function, "allProducts" will always be updated
                                // with data fetched from db!!!. Also, look out in Line-21!

const fetch_all_products = state => {
    return updateState(state, {
        allProducts: [...state.dummyAllProducts]
    });
};

const add_product = (state, action) => {
    const addedProduct = action.product;  // get new Product details
    console.log(addedProduct);
    const updatedProducts = [...state.dummyAllProducts, addedProduct];  // grab existing state of "allProducts" and add new product to "allProducts"

    PRODUCTS.push(addedProduct);   // !!!!! IMPORTANT!! -- This line will be removed when moving "PRODUCTS" into db. So watch out for update(s)!!

    return updateState(state, {
        dummyAllProducts: updatedProducts
    });
}


export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS: return fetch_all_products(state);
        case ADD_PRODUCT: return add_product(state, action);
        default: return state;  // for the 1st render cycle, the application will fall in this line and "initialState" will be used.
    }
};