import axios from 'axios';
import { loginFail, loginStart, loginSuccess, registerFail, registerStart, registerSuccess } from './authSlice';
import { deleteFail, deleteStart, deleteSuccess } from './deleteSlice';
import { getAllUsersFail, getAllUsersStart, getAllUsersSuccess } from './userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:8000/login', user);
        if (res.data?.mess !== 'valid') {
            dispatch(loginFail(res.data));
        }
        else dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (e) {
        dispatch(loginFail());
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post('http://localhost:8000/register', user);
        dispatch(registerSuccess(res.data));
        navigate("/");
    } catch (e) {
        dispatch(registerFail());
    }
}

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getAllUsersStart());
    try {
        const res = await axios.get('http://localhost:8000/allUsers', {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getAllUsersSuccess(res.data));
    } catch (e) {
        dispatch(getAllUsersFail());
    }
}

export const deleteUser = async (accessToken, dispatch, id) => {
    dispatch(deleteStart());
    try {
        const res = await axios.delete(`http://localhost:8000/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteSuccess(res.data));
    } catch (e) {
        dispatch(deleteFail());
    }

}

