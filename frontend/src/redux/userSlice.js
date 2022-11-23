import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        //register
        getAllUsersStart: (state) => {
            state.users.isFetching = true
        },
        getAllUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getAllUsersFail: (state) => {
            state.users.isFetching = false;
            state.users.error = false;
        }
    }
});

export const {
    getAllUsersStart, getAllUsersSuccess,
    getAllUsersFail
} = userSlice.actions;

export default userSlice.reducer;
