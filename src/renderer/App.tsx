// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
// import Trailmain from './pages/patients/trials/Trialmain';
import Trailmain from './pages/sessiontrials/Trialmain';
import Trialmancalib from './pages/caliberationtrials/Trialmain';
import Resetpassword from './pages/forgotpassword/ResetPassword';
import Brianimg from './pages/brianimg/brainimg';
import Brianimgchild from './pages/brianimg/brainimgchild';
import LineCharts from './pages/sessiontrials/LineChart';
import { ProSidebarProvider } from 'react-pro-sidebar';
import PlotData from './pages/plotData/plotData';
import TrialPage01 from './pages/caliberationtrials/trial_page_01';
import VideoPlay from './pages/sessiontrials/videoPlay';
import Pls_wait from './pages/sessiontrials/pls_wait';
import MyComponent from './pages/sample/myComponent';

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
              <Route path="/trialmain/:id/:loop" element={<Trailmain />} />
              <Route path="/calibration/:id/:loop" element={<Trialmancalib />} />
              <Route path="/brainimg" element={<Brianimg />} />
              <Route path="/brainimgchild" element={<Brianimgchild />} />
               
              <Route path="/plot_data" element={<PlotData />} />
              <Route path="/trial01" element={<TrialPage01 />} />

              
            </Routes>

          </Router>

        </ProSidebarProvider>
    </>
    
  );
}
