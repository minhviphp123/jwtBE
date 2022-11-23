import { createSlice } from '@reduxjs/toolkit';

const deleteSlice = createSlice({
    name: "delete",
    initialState: {
        delete: {
            mess: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        //register
        deleteStart: (state) => {
            state.delete.isFetching = true
        },
        deleteSuccess: (state, action) => {
            state.delete.isFetching = false;
            state.delete.mess = action.payload;
            state.delete.error = false;
        },
        deleteFail: (state) => {
            state.delete.isFetching = false;
            state.delete.error = false;
        }
    }
});

export const {
    deleteStart,
    deleteSuccess,
    deleteFail
} = deleteSlice.actions;

export default deleteSlice.reducer;
