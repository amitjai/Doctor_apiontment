import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/User/alertSlice';

function DoctorProfile() {
  const {user} = useSelector(state => state.user);
  const [doctor, setDoctor] = useState(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const getDoctorInfo = async () => {
    try {
      const response = await axios.post('/api/doctor/get_doctor_info', {userId: params.id}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if(response.data.data) {
        setDoctor(response.data.data);
      }
    } catch(error) {
      console.log(error);
    }
  };
  
  
  const onChange = (e) => {
      setDoctor({
          ...doctor,
          [e.target.name]: e.target.value
      })
  };
  const onClick = async () => {
         try {
            dispatch(showLoading());
            const response = await axios.post('/api/doctor/update_doctor_info',
                {...doctor, userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            dispatch(hideLoading());
            if(response.data.success) {
                console.log(response.data.data);
                // setDoctor(response.data.data);
                // toast.success(response.data.message);
                // navigate('/');
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
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);


  return (
    <Layout>
      <div className="">
          {doctor && (
            <div className="w-[1000px]">
            <h1 className='text-sky-950 font-bold text-2xl uppercase text-center'>Doctor Profile</h1>
            <h2 className='text-sky-900 font-bold text-xl mt-1 ml-4'>Personal Details:</h2>
            <form onSubmit={onSubmit} className='py-10 grid grid-cols-3 gap-4 max-w-4xl mx-auto'>
                <input type="text" placeholder='First_name' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='firstName' value={doctor.firstName} onChange={onChange} />
                <input type="text" placeholder='Last_name' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='lastName' value={doctor.lastName} onChange={onChange}/>
                <input type="phone" placeholder='Mobile_NO.' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='phone' value={doctor.phone} onChange={onChange} />
                <input type="email" placeholder='Email' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='email' value={doctor.email} onChange={onChange} />
                <input type="text" placeholder='Address' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='address' value={doctor.address} onChange={onChange} />
                <input type="txet" placeholder='Website' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='website' value={doctor.website} onChange={onChange} />

            </form>
            <h2 className='text-sky-900 font-bold text-xl mt-1 ml-4'>Profesional Details:</h2>
            <form onSubmit={onSubmit} className='py-10 grid grid-cols-3 gap-4 max-w-4xl mx-auto'>
                <input type="txet" placeholder='Specialization' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='specialization' value={doctor.specialization} onChange={onChange} />
                <input type="number" placeholder='Experiences' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='experiences' value={doctor.experiences} onChange={onChange} />
                <input type="text" placeholder='Qualification' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='qualification' value={doctor.qualification} onChange={onChange} />
                <input type="text" placeholder='Fees per session' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='feesForCunsaltation' value={doctor.feesForCunsaltation} onChange={onChange} />
                <input type="text" placeholder='Timing (10:00/11:00)' className='bg-sky-200 px-6 py-2 text-lg rounded-lg' name='time' value={doctor.time} onChange={onChange} />


                <button type='button' className='bg-sky-800 uppercase text-white rounded-lg' onClick={onClick}>Update Form</button>
            </form>
        </div>
          )}
      </div>
    </Layout>
  )
}

export default DoctorProfile;