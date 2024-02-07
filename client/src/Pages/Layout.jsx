import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Layout({children}) {
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const userMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house"
    },
    
    {
      id: 2,
      name: "Apply doctor",
      path: "/applyDoctor",
      icon: "fa-solid fa-user-doctor"
    },
    {
      id: 3,
      name: "Apointments",
      path: "/apointments",
      icon: "fa-solid fa-calendar-check"
    },
    {
      id: 4,
      name: "Profile",
      path: "/",
      icon: "fa-solid fa-user"
    },
    {
      id: 5,
      name: "Abouts",
      path: "/abouts",
      icon: "fa-solid fa-address-card"
    }
  ];

  const doctorMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house"
    },
    {
      id: 3,
      name: "Apointments",
      // path: `/doctor/apointments`,
      icon: "fa-solid fa-calendar-check"
    },
    {
      id: 4,
      name: "Profile",
      path: `/doctorProfile/${user?._id}`,
      icon: "fa-solid fa-user"
    },
    {
      id: 5,
      name: "Abouts",
      path: "/abouts",
      icon: "fa-solid fa-address-card"
    }
  ];
  
  const adminMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house"
    },
    
    {
      id: 2,
      name: "Doctors",
      path: "/doctors",
      icon: "fa-solid fa-user-doctor"
    },
    {
      id: 3,
      name: "users",
      path: "/users",
      icon: "fa-solid fa-user"
    },
    {
      id: 4,
      name: "Profile",
      path: "/",
      icon: "fa-solid fa-user"
    },
    {
      id: 5,
      name: "Abouts",
      path: "/abouts",
      icon: "fa-solid fa-address-card"
    },
  ];

  const selectMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  const logoutClick = () => {
    localStorage.clear(); 
    navigate('/login');
    toast.success("successfully Signout.");
  };

  const notifyMessage = () => {
        navigate('/notification');
    }

  return (
    <div className='bg-sky-50 h-vh p-2 grid grid-rows-8 grid-flow-col gap-2'>

      {/* Sidebar section inside Home page */}

        <div className="bg-sky-700 w-[270px] row-span-12 rounded-lg p-3 sticky shadow-2xl sm:max-w-full">
          <h1 className='text-white font-bold text-2xl text-center'>Doctor <br /> Apointment</h1>
          <ul className='text-white font-small mt-28 block'>

            {selectMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                  return (
                    <div className={`${isActive && "bg-sky-950 rounded-lg"}`} key={menu.id}>
                        <Link to={menu.path}>
                          <li className=' text-center pl-10 py-3 mb-2 hover:bg-sky-950 rounded-lg shadow-2xl flex align-middle gap-3'>
                            <i className={menu.icon}></i>
                            <small className='text-md'>{menu.name}</small>
                          </li>
                        </Link>
                    </div>
                  )
            })}
            <div  onClick={logoutClick} >
                <Link to='/'>
                  <li className=' text-center pl-10 py-3 mb-2 hover:bg-sky-950 rounded-lg shadow-2xl flex align-middle gap-3'>
                  <i className="fa-solid fa-right-from-bracket"></i>
                    <small className='text-sm'>Logout</small>
                  </li>
                </Link>
            </div>
            
          </ul>
        </div>

        {/* right top header section */}


        <div className="bg-sky-200 h-full col-span-12 rounded-lg px-12 py-4 shadow-2xl flex align-middle justify-between">
            <Link><i className="fa-solid fa-xmark"></i></Link>
            <div className="flex align-middle gap-3">
                
              <div onClick={notifyMessage}>
                <Link>
                    <i className="fa-regular fa-bell"></i>
                    <span className="inline-flex align-top rounded-full bg-red-700 px-1 text-[12px] font-medium text-white ring-1 ring-outset ring-red-600/10">
                        {user && user.notification.length}
                    </span>
                </Link>
              </div>
              <Link  className='uppercase font-medium'>{user?.username}</Link>
            </div>
        </div>

        {/* right bottom section inside Home page */}

        <div className="bg-sky-100 row-span-11 col-span-12 rounded-lg p-4 shadow-2xl">
            {children}
        </div>
    </div>
  )
}

export default Layout