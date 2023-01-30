import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
// import './App.css';

// import page
import Home from './pages/home/Home';
import Patients from './pages/patients/Patients';
import Sessions from './pages/sessions/Sessions';

import { ProSidebarProvider } from 'react-pro-sidebar';


export default function App() {
  return (

    <>
        <ProSidebarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/sessions" element={<Sessions />} />
            </Routes>
          </Router>
        </ProSidebarProvider>
    </>
    
  );
}
