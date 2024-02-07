import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Header from './Pages/Header';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
// import Footer from './Pages/Footer';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Spinners from './Components/Spinners';
import PublicRoute from './Components/PublicRoute';
import ProtectedRoute from './Components/ProtectedRoute';
import ApplyDoctor from './Pages/ApplyDoctor';
import Apiontment from './Pages/Apiontment';
import DoctorProfile from './Pages/DoctorProfile';
import UserAbout from './Pages/UserAbout';
import Notification from './Pages/Notification';
import Doctors from './Pages/AdminBox/Doctors';
import Users from './Pages/AdminBox/Users';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      <Toaster 
        position='top-center'
        reverseOrder={false}
      />
      {loading && <Spinners />}
      <Routes>
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute> } />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/applyDoctor' element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
        <Route path='/doctor/apointments/:doctorId' element={<ProtectedRoute><Apiontment /></ProtectedRoute>} />
        <Route path='/doctorProfile/:id' element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />
        <Route path='/abouts' element={<ProtectedRoute><UserAbout /></ProtectedRoute>} />
        <Route path='/notification' element={<ProtectedRoute><Notification /></ProtectedRoute>} />
        <Route path='/doctors' element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
