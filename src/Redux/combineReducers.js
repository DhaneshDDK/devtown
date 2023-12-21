import { combineReducers } from "@reduxjs/toolkit";
import ProductSlice from "./Slices/ProductSlice";
import userSlice from "./Slices/userSlice";
import cartSlice from "./Slices/cartSlice";

const rootReducer = combineReducers({
    product : ProductSlice,
    auth : userSlice,
    cart : cartSlice
})
export default rootReducer;