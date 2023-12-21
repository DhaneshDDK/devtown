import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : [],
    loading : true,
}

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setProducts : (state, value) => { state.products = value.payload; },
        setLoading  : (state, value) => { state.loading = value.payload; },
    }
})

export const {setProducts, setLoading} = productSlice.actions;
export default productSlice.reducer;