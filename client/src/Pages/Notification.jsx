import React from 'react';
import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';

function Notification() {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();



  return (
    <Layout>
      <div className="w-[1000px]">
        <h1 className='text-xl uppercase font-bold text-center mb-4'>Notification</h1>
        <ul className="nav nav-pills" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
          </li>
        </ul>
        <div className="tab-content mt-4 ml-4" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            {user?.notification.map((notificationMsg, i) => (
              <div className="p-3 border" key={i}>
                <div className="">
                    {notificationMsg.message}
                </div>
              </div>
              ))}
          </div>
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Profile</div>
          <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Contact</div>
        </div>

      </div>
    </Layout>
  )
}

export default Notification;