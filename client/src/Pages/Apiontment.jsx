import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/User/alertSlice';
import toast from 'react-hot-toast';

function Apiontment() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const params = useParams();
  const getDoctorById = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.post('/api/doctor/get_doctor_by_id', 
          {doctorId: params.doctorId}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        dispatch(hideLoading());
        if(res.data.success) {
          setDoctor(res.data.data);
        }
      } catch(error) {
          dispatch(hideLoading());
          console.log(error);
      }
  };

  const handleBooking = async () => {

    try {
      const response = await axios.post('/api/user/book_apointment', 
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          time: time,
          userInfo: user
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if(response.data.data) {
          toast.success(response.data.message);
        }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDoctorById();
  }, []);
  return (
    <Layout>
        <div className="w-[1000px]">
            <h1 className='text-2xl font-bold uppercase text-center'>Book Apointment</h1>
            {doctor && (
                <div className="mt-20">
                  <ul className='w-[70%] mx-auto'>
                    <li className='flex align-middle border-1 border-black p-1 gap-1'>
                      <h3 className='font-bold text-lg w-[400px] bg-sky-200 py-2 px-6'>Name</h3>
                      <p className='text-lg w-[400px] bg-sky-200 py-2 px-6'>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</p>
                    </li>
                    <li className='flex align-middle border-1 border-black gap-1 p-1'>
                      <h3 className='font-bold text-lg w-[400px] bg-sky-200 py-2 px-6'>Specialist</h3>
                      <p className='text-lg w-[400px] bg-sky-200 py-2 px-6'>{doctor.specialization}</p>
                    </li>
                    <li className='flex align-middle border-1 border-black gap-1 p-1'>
                      <h3 className='font-bold text-lg w-[400px] bg-sky-200 py-2 px-6'>Experiences</h3>
                      <p className='text-lg w-[400px] bg-sky-200 py-2 px-6'>{`${doctor.experiences} Years`}</p>
                    </li>
                    <li className='flex align-middle border-1 border-black gap-1 p-1'>
                      <h3 className='font-bold text-lg w-[400px] bg-sky-200 py-2 px-6'>Fee</h3>
                      <p className='text-lg w-[400px] bg-sky-200 py-2 px-6'>{`Rs. ${doctor.feesForCunsaltation}`}</p>
                    </li>
                    <li className='flex align-middle border-1 border-black gap-1 p-1'>
                      <h3 className='font-bold text-lg w-[400px] bg-sky-200 py-2 px-6'>Book slot</h3>
                      <p className='text-lg w-[400px] bg-sky-200 py-2 px-6'><input type="time" /></p>
                    </li>
                  </ul>
                  <button type='button' className='bg-sky-700 text-white py-2 px-6 rounded-lg mt-4 float-end mx-40' onClick={handleBooking}>Book slot</button>
                </div>
              )
            }

        </div>
    </Layout>
  )
}

export default Apiontment