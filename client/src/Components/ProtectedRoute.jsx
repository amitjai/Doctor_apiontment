import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/User/alertSlice';
import axios from 'axios';
import { getUser } from '../redux/User/userSlice';

function ProtectedRoute({children}) {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const tokenId = localStorage.getItem("token");

    const getUserInfo = async () => {

        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/getUserData', {
                token: localStorage.getItem("token")
            }, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                dispatch(getUser(response.data.data));
            } else {
                localStorage.clear();
                <Navigate to='/login' />
            }
        } catch(error) {
            dispatch(hideLoading());
            console.log(error);
            localStorage.clear();
        }
    };

    useEffect(() => {
        if(!user) {
            getUserInfo();
        }
    }, [user, getUserInfo]);

    if(tokenId) {
        return children;
    } else {
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute