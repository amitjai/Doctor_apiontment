import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='bg-sky-800 '>
        <div className="flex align-middle justify-between px-20 py-3 text-white">
            <Link to='/login' className='font-bold text-2xl'>Doctor Apointment</Link>
            <ul className='flex gap-4 '>
                <Link to='/'><li className='text-lg '>Home</li></Link>
                <Link to='/login'><li className='text-lg'>Login</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Header