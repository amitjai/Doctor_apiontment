import React, { useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/User/alertSlice';
import toast from 'react-hot-toast';

function ApplyDoctor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    const [inputVal, setInputVal] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        specialization: "",
        qualification: "",
        experiences: "",
        feesForCunsaltation: "",
        time: ""
    });

    const onChange = (e) => {
        setInputVal({
            ...inputVal,
            [e.target.name]: e.target.value
        })
    };
    const onClick = async () => {
         try {
            dispatch(showLoading());
            const response = await axios.post('api/user/apply_doctor',
                {...inputVal, userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            dispatch(hideLoading());
            if(response.data.success) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.error("Something went wrong!");
            }
         } catch(error) {
            dispatch(hideLoading());
            console.log(error);
            toast.error("Something went wrong!");
         }
    };
    const onSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <Layout>
        <div className="w-[1000px]">
            <h1 className='text-sky-950 font-bold text-2xl uppercase text-center'>Apply Doctor</h1>
            <h2 className='text-sky-900 font-bold text-xl mt-1 ml-4'>Personal Details:</h2>
            <form onSubmit={onSubmit} className='py-10 grid grid-cols-3 gap-4 max-w-4xl mx-auto'>
                <input type="text" placeholder='First_name' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='firstName' value={inputVal.fname} onChange={onChange} />
                <input type="text" placeholder='Last_name' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='lastName' value={inputVal.lname} onChange={onChange}/>
                <input type="phone" placeholder='Mobile_NO.' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='phone' value={inputVal.phone} onChange={onChange} />
                <input type="email" placeholder='Email' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='email' value={inputVal.email} onChange={onChange} />
                <input type="text" placeholder='Address' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='address' value={inputVal.address} onChange={onChange} />
                <input type="txet" placeholder='Website' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='website' value={inputVal.website} onChange={onChange} />

            </form>
            <h2 className='text-sky-900 font-bold text-xl mt-1 ml-4'>Profesional Details:</h2>
            <form onSubmit={onSubmit} className='py-10 grid grid-cols-3 gap-4 max-w-4xl mx-auto'>
                <input type="txet" placeholder='Specialization' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='specialization' value={inputVal.specialization} onChange={onChange} />
                <input type="number" placeholder='Experiences' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='experiences' value={inputVal.experience} onChange={onChange} />
                <input type="text" placeholder='Qualification' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='qualification' value={inputVal.qualification} onChange={onChange} />
                <input type="text" placeholder='Fees per session' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='feesForCunsaltation' value={inputVal.fee} onChange={onChange} />
                <input type="text" placeholder='Timing (10:00/11:00)' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='time' value={inputVal.timing} onChange={onChange} />


                <button type='button' className='bg-sky-800 uppercase text-white rounded-lg' onClick={onClick}>Submit Form</button>
            </form>
        </div>
    </Layout>
  )
}

export default ApplyDoctor