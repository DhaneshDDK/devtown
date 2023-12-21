import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast'

const initialState = {
    cart : localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    totalItems : localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
    totalPrice : localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers : {
        add : (state, action) => {
             let check = state.cart?.includes(action.payload);
             if(check){
                toast.error('Item already exists in cart'); return;
             }  

             state.cart.push(action.payload);
             state.totalItems++;
             state.totalPrice += action.payload.price

             localStorage.setItem("cart",JSON.stringify(state.cart));
             localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
             localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

         },
        remove : (state, action) => { 
           state.cart = state.cart.filter((item)=> item.name !== action.payload.name);
           if(state.totalItems > 0) {
           state.totalItems--;
           state.totalPrice-=action.payload.price;
                
             localStorage.setItem("cart",JSON.stringify(state.cart));
             localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
             localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

           }
        },
       
        resetCart : (state)=>{
            state.cart = []
            state.totalPrice = 0
            state.totalItems = 0
            localStorage.removeItem("cart")
            localStorage.removeItem("totalPrice")
            localStorage.removeItem("totalItems")
        }

    }
})



export const {add, remove, resetCart} = cartSlice.actions;

export default cartSlice.reducer;