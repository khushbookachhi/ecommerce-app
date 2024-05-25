import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { productReducer } from "./reducers/productsReducer";
import { cartReducer } from "./reducers/cartItemReducers";



// Configure the Redux store
export const store = configureStore({
    // Combine multiple reducers into a single reducer object
    reducer: {
        userReducer,// User reducer
        productReducer,
        cartReducer
    }
});