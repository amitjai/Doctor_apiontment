import { configureStore } from '@reduxjs/toolkit';
import { alertSlice } from './User/alertSlice';
import { userSlice } from './User/userSlice';

export default configureStore({
    reducer: {
        alerts: alertSlice.reducer,
        user: userSlice.reducer
    }
});