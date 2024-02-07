import React, { useEffect, useState } from 'react'
import Layout from '../Layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/User/alertSlice';
import toast from 'react-hot-toast';


function Users() {
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();
    const getUserFunction = async () => {

        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get_all_users', 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(hideLoading());
            if(response.data.success) {
                setUserData(response.data.data);
                toast.success(response.data.message);
            }

        } catch(error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }
    useEffect(() => {
        getUserFunction();
    }, []);

  return (
    <Layout>
        <div className="w-[1000px]">
            <h1 className='font-bold text-xl uppercase text-center'>Users</h1>
            <table className="table-auto mt-4 text-center mx-auto w-[100%] border-sky-500 border-separate rounded-lg">
                <thead>
                    <tr>
                    <th className='bg-sky-300 p-2'>Name</th>
                    <th className='bg-sky-300 p-2'>Email</th>
                    <th className='bg-sky-300 p-2'>Status</th>
                    <th className='bg-sky-300 p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((data) => {
                        return (
                            <tr key={data._id}>
                                <td className='bg-sky-200 p-2'>{data.username}</td>
                                <td className='bg-sky-200 p-2'>{data.email}</td>
                                <td className='bg-sky-200 p-2'>{data.createdAt}</td>
                                <td className='bg-sky-200 p-2'><button className='bg-red-700 text-white text-lg rounded-lg px-6 py-1 shadow-2xl'>Block</button></td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
        </div>
    </Layout>
  )
}
export default Users