//import { PRODUCTS } from '../../data/product';
import { ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, CLEAR_CART } from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {  // set an initial state
    cart: {
        userId: null,
        items: {
            products: [],
            totalPrice: 0
        }
    }
};

const add_to_cart = (state, action) => {
    const { productId, userId, allProducts } = action;

    // try to find if "productId" and "userId" are valid and also they exist or not. Also, (dummy) check for the existence and emptiness of "allProducts" 
    if (!productId || !userId || !allProducts || allProducts.length === 0) return null;

    const existingProduct = allProducts.find(prod => prod.id === productId);
    if (!existingProduct) return null;

    const updatedCart = { ...state.cart };  // first, copy the existing "cart" state for immutable manipulation purpose

    const existingUser = updatedCart.userId;
    if (!existingUser) {  // this user has never created a cart before
        updatedCart.userId = userId; // create a new user with a cart
        updatedCart.items.products = [
            {
                product: existingProduct,
                quantity: 1,
                orderDate: new Date()  // add date of ordering
            }
        ];
        updatedCart.items.totalPrice = existingProduct.price;
    } else {  // if this user has already a non-empty cart
        // check if s/he has any existing items/products
        const isProductPurchased = updatedCart.items.products.some(element => element.product.id === existingProduct.id);
        if (!updatedCart.items.products || updatedCart.items.products.length === 0) {  // user has no product(s) in his/her cart 
            updatedCart.items.products = [
                {
                    product: existingProduct,
                    quantity: 1,
                    orderDate: new Date()  // add date of ordering
                }
            ];
        } else if (!isProductPurchased) {  // s/he has existing products except for this product
            const updatedUserProducts = [...updatedCart.items.products, {  // add the product to existing user cart products
                product: existingProduct,
                quantity: 1,
                orderDate: new Date()  // add date of ordering
            }];
            updatedCart.items.products = updatedUserProducts;  // update user cart products
        }

        else {  // user has already purchased this product
            const existingProductIndex = updatedCart.items.products.findIndex(item => item.product.id === existingProduct.id);  // find index of that product
            const updatedProduct = { ...updatedCart.items.products[existingProductIndex] };  // first, copy the existing state of this product in user cart 
            updatedProduct.quantity++;  // increment its quantity upon each "Add to Cart" button click
            updatedProduct.orderDate = new Date();  // add date of ordering
            updatedCart.items.products[existingProductIndex] = updatedProduct;  // immutably update the product inside user cart with its new state
        }
        updatedCart.items.totalPrice += existingProduct.price;  // also update total cart price
    }

    return updateState(state, {
        cart: updatedCart
    });
};

const delete_from_cart = (state, action) => {
    const { productId, userId, allProducts } = action;

    // try to find if "productId" and "userId" are valid and also they exist or not. Also, (dummy) check for the existence and emptiness of "allProducts" 
    if (!productId || !userId || !allProducts || allProducts.length === 0) return null;

    const existingProduct = allProducts.find(prod => prod.id === productId);
    if (!existingProduct) return null;

    const updatedCart = { ...state.cart };  // first, copy the existing "cart" state for immutable manipulation purpose
    const existingUser = updatedCart.userId;

    if (!existingUser) return;  // user has no cart and so no products purchased before.

    // if user has a non-empty cart, check if "existingProduct" is purchased before
    const isProductPurchased = updatedCart.items.products.some(element => element.product.id === existingProduct.id);
    // if user has a non-empty cart but has no products in it yet OR there are already products except for "existingProduct"
    if (!updatedCart.items.products || updatedCart.items.products.length === 0 || !isProductPurchased) return;

    const existingProductIndex = updatedCart.items.products.findIndex(item => item.product.id === existingProduct.id);  // find index of that product
    const updatedProduct = { ...updatedCart.items.products[existingProductIndex] };

    const totalProductPrice = updatedProduct.product.price * updatedProduct.quantity;  // calculate total price of "existingProduct"

    const reducedProducts = [...updatedCart.items.products];
    reducedProducts.splice(existingProductIndex, 1);

    updatedCart.items.products = reducedProducts;

    updatedCart.items.totalPrice -= totalProductPrice;  // update price

    return updateState(state, {
        cart: updatedCart
    });
};

const clear_cart = (state, action) => {
    const { userId } = action;
    if (!userId) return;  // try to find if "userId" is valid and also it does exist or not

    const updatedCart = { ...state.cart };
    const existingUser = updatedCart.userId;

    if (!existingUser) return;  // user has no cart.

    const updatedCartItems = { ...updatedCart.items };
    let updatedProducts = [...updatedCartItems.products];  // copy the existing products first
    updatedProducts = [];  // clear cart products
    updatedCartItems.totalPrice = 0;  // set totalPrice to 0
    updatedCartItems.products = updatedProducts;

    updatedCart.items = updatedCartItems;

    return updateState(state, {
        cart: updatedCart
    });
}


export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART: return add_to_cart(state, action);
        case DELETE_ITEM_FROM_CART: return delete_from_cart(state, action);
        case CLEAR_CART: return clear_cart(state, action);
        default: return state;  // for the 1st render cycle, the application will fall in this line and "initialState" will be used.
    }
};