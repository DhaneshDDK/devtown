import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem('token')? JSON.parse(localStorage.getItem('token')) : null,
    user :  null,
}

export const authSlice = createSlice({
    name : 'auth',
    initialState : initialState,
    reducers : {
          setToken : (state,value) => { state.token = value.payload; },
          setUserData : (state,value) => {state.user = value.payload;},
    }
})

export const {setToken, setUserData} = authSlice.actions;
export default authSlice.reducer;