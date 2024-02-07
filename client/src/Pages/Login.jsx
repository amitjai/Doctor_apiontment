import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/User/alertSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputVal, setInputVal] = useState({
        email: "",
        password: ""
    });
    const onSubmit = (e) => {
        e.preventDefault();
    };
    const onChange = (e) => {
        setInputVal({
            ...inputVal,
            [e.target.name]: e.target.value
        });
    };
    const onClick = async () => {
        const {email, password} = inputVal;
        if(email === "" && password === "") {
            return toast.error("Please fill all field");
        }
        try {
            dispatch(showLoading());

            const response = await axios.post('/api/user/login', inputVal);
            window.location.reload();
            dispatch(hideLoading());
            if(!response.data.success){
                return toast.error(response.data.message);
            }
            localStorage.setItem("token", response.data.token);
            toast.success(response.data.message);
            navigate('/layout');

        } catch(error) {
            dispatch(hideLoading());
            toast.error("Somthing wen't wrong.");
        }
    }
  return (
    <div className='bg-sky-50'>
        <div className="max-w-sm mx-auto text-center py-32">
            <h1 className='text-2xl font-bold pb-6'>Login</h1>
            <form className='flex flex-col gap-4' onSubmit={onSubmit}>
                <input type="email" placeholder='Email' className='bg-sky-200 px-6 py-3 rounded-lg' name="email" value={inputVal.email} onChange={onChange} />
                <input type="password" placeholder='Password' className='bg-sky-200 px-6 py-3 rounded-lg' name="password" value={inputVal.password} onChange={onChange} />
                <button type='button' className='bg-sky-700 text-white uppercase text-lg py-2 rounded-lg' onClick={onClick}>Sign in</button>
            </form>
            <p className='text-center py-3'>Don't have an account <Link to='/register' className='text-sky-600 font-bold'>Register</Link> </p>
        </div>
    </div>
  )
}

export default Login