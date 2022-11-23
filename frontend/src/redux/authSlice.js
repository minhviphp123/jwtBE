import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            mess: null
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        //login
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFail: (state, action) => {
            state.login.isFetching = false;
            state.login.mess = action.payload;
            state.login.error = false;
        },

        //register
        registerStart: (state) => {
            state.login.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        registerFail: (state) => {
            state.login.isFetching = false;
            state.login.error = false;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFail,
    registerStart,
    registerSuccess,
    registerFail
} = authSlice.actions;

export default authSlice.reducer;
