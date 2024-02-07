import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import DoctorList from '../Components/DoctorList';

function Home() {

  const [doctor, setDoctor] = useState([]);
  const getUserData = async () => {
      try {
        const res = await axios.get('/api/user/get_all_doctors_list', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(res.data.success) {
          setDoctor(res.data.data);
        }
      } catch(error) {
          console.log(error);
      }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
        <div className="w-[1000px]">
            <h1 className='font-bold text-2xl uppercase text-center'>Doctors List</h1>
            <div className="flex flex-wrap align-middle gap-3 mt-10">
              {doctor.map((list) => {
                return (
                    <DoctorList key={list._id} doctor={list}  />
                )
              })}
            </div>
        </div>
    </Layout>
  )
}

export default Home;