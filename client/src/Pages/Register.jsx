import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/User/alertSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputVal, setInputVal] = useState({
        username: "",
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
        try {
            dispatch(showLoading());
            const {username, email, password} = inputVal;
            if(!username && !email && !password) {
                return toast.error("please fill all field");
            };
            const response = await axios.post("/api/user/register", inputVal);
            dispatch(hideLoading());
            if(response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            };
                   
        } catch(error) {
            dispatch(hideLoading());
            toast.error("Server not respond..");
            console.log(error);
        }
    };

  return (
    <div className='bg-sky-50'>
        <div className="max-w-sm mx-auto text-center py-28">
            <h1 className='font-bold text-2xl pb-6'>Register</h1>
            <form className='flex flex-col gap-4' onSubmit={onSubmit}>
                <input type="text" placeholder='Username' className='bg-sky-200 px-6 py-3 rounded-lg' name="username" value={inputVal.username} onChange={onChange} />
                <input type="email" placeholder='Email' className='bg-sky-200 px-6 py-3 rounded-lg' name="email" value={inputVal.email} onChange={onChange} />
                <input type="password" placeholder='Password' className='bg-sky-200 px-6 py-3 rounded-lg' name="password" value={inputVal.password} onChange={onChange} />
                <button type='button' className='bg-sky-800 text-xl uppercase py-2 rounded-lg text-white' onClick={onClick}>Sign Up</button>
            </form>
            <p className='my-3'>Already have an account <Link to='/login' className='font-bold text-sky-600' >Login</Link> </p>
        </div>
    </div>
  )
}

export default Register