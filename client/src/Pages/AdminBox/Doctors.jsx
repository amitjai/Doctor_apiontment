import React, {useState, useEffect} from 'react';
import Layout from '../Layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/User/alertSlice';
import toast from 'react-hot-toast';

function Doctors() {

    const [adminData, setAdminData] = useState([]);
    const dispatch = useDispatch();
    const getAdminFunction = async () => {

        try {
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get_all_doctors', 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(hideLoading());
            if(response.data.success) {
                console.log(response.data.data);
                setAdminData(response.data.data);
                toast.success(response.data.message);
            }

        } catch(error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };
    const handleAccountStatus = async (data, status) => {

        try {
            const response = await axios.post('/api/admin/change_account_status', 
                {doctorId:data._id, userId: data.userId, status: status},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            if(response.data.success) {
                console.log(response.data.data);
                toast.success(response.data.message);
                window.location.reload();
            }
        } catch(error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAdminFunction();
    }, []);

  return (
    <Layout>
        <div className="w-[1000px]">
            <h1 className='font-bold text-xl uppercase text-center'>Doctors</h1>
            <table className="table-auto mt-4 text-center mx-auto w-[100%] border-sky-500 border-separate rounded-lg">
                <thead>
                    <tr>
                    <th className='bg-sky-300 p-2'>Name</th>
                    <th className='bg-sky-300 p-2'>Email</th>
                    <th className='bg-sky-300 p-2'>Phone</th>
                    <th className='bg-sky-300 p-2'>Specialization</th>
                    <th className='bg-sky-300 p-2'>Status</th>
                    <th className='bg-sky-300 p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {adminData.map((data) => {
                        return (
                            <tr key={data._id}>
                                <td className='bg-sky-200 p-2'>{`${data.firstName} ${data.lastName}`}</td>
                                <td className='bg-sky-200 p-2'>{data.email}</td>
                                <td className='bg-sky-200 p-2'>{data.phone}</td>
                                <td className='bg-sky-200 p-2'>{data.specialization}</td>
                                <td className='bg-sky-200 p-2'>{data.status}</td>
                                <td className='bg-sky-200 p-2'>
                                    {data.status === "pending" ? 
                                        (<button className='bg-green-700 text-white text-lg rounded-lg px-6 py-1 shadow-2xl' onClick={() => handleAccountStatus(data, 'approved')}>Approve</button>) 
                                            : (<button className='bg-red-700 text-white text-lg rounded-lg px-6 py-1 shadow-2xl'>Reject</button>)
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
        </div>
    </Layout>
  )
}

export default Doctors