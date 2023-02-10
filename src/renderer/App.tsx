import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
// import './App.css';

// import page
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import Home from './pages/home/Home';
import Patients from './pages/patients/Patients';
import Session from './pages/session/Session';
import Individualpatient from './pages/patients/individualpatient/Individualpatient';
import Trailmain from './pages/patients/trials/Trialmain';
import Resetpassword from './pages/forgotpassword/ResetPassword';

import { ProSidebarProvider } from 'react-pro-sidebar';


export default function App() {
  return (

    <>
        <ProSidebarProvider>
          
          <Router>
          
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword" element={<Resetpassword />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/session" element={<Session />} />
              <Route path="/individualpatients/:id" element={<Individualpatient />} />
              <Route path="/trialmain" element={<Trailmain />} />
            </Routes>
          </Router>
        </ProSidebarProvider>
    </>
    
  );
}
