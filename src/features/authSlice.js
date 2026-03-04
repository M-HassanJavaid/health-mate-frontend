import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState : {
        isLogin: false,
        user: null
    },

    reducers: {
        setLogout: (state , action)=>{
            state.isLogin = false;
            state.user = null
        },

        setLogin: (state , action) => {
            state.user = action.payload;
            state.isLogin = true
        }
    }

});

export const { setLogin , setLogout } = authSlice.actions;
export default authSlice.reducer;