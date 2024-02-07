import React from 'react'
import { useNavigate } from 'react-router-dom'

function DoctorList({doctor}) {
    const navigate = useNavigate();
  return (
    <div className=''>
        <div className=" border-black max-w-[350px] py-1 px-1 rounded-lg shadow-black-950 shadow-xl cursor-pointer" onClick={() => navigate(`/doctor/apointments/${doctor._id}`)}>
            <h1 className='font-bold text-lg text-center mb-2 bg-sky-200 p-2'>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h1>
            <ul className='list-disc ml-3 px-3 mb-3'>
                <li>{doctor.email}</li>
                <li>{doctor.address}</li>
                <li>{doctor.specialization}</li>
                <li>{`${doctor.experiences} years`}</li>
                <li>{doctor.qualification}</li>
                <li>{doctor.feesForCunsaltation}</li>
                <li>{doctor.time}</li>
            </ul>
        </div>
    </div>
  )
};

export default DoctorList