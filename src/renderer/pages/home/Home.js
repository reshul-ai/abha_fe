import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import UpperChart from './UpperChart';
import LowerChart from './LowerChart';
import Upcomingsession from '../session/Upcomingsession';
import AddNewSessionForm from '../session/AddNewSessionForm';
import { AiOutlineCalendar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { HiOutlineChip } from "react-icons/hi";
import Form from '../patients/Form';
import Bci from '../patients/Bci';
import HCQ from '../patients/Hcq';
import ba_logo from "../login/BrainAlive.svg";
import Navbarcommon from '../navbar/Navbar';
import { BsChevronDown,BsChevronUp } from "react-icons/bs";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import './home.css';



const Home = () => {

        const { collapseSidebar } = useProSidebar();

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const [showP, setShowP] = useState(false);
        const handleCloseP = () => setShowP(false);
        const handleShowP = () => setShowP(true);

        const [showBci, setShowBci] = useState(false);
        const handleBciClose = () => setShowBci(false);
        const handleBciShow = () => setShowBci(true);


        const [showCC, setShowCC] = useState(false);
        const handleCCClose = () => setShowCC(false);
        const handleCCShow = () => setShowCC(true);

        const [isActive, setIsActive] = useState(true);
        // Sidebar CSS

        const [isHoverHome, setIsHoverHome] = useState(false);
        const [isHoverPatient, setIsHoverPatient] = useState(false);
        const [isHoverSession, setIsHoverSession] = useState(false);
        const [isHoverLogo, setIsHoverLogo] = useState(false);
        const [activeTab, setActiveTab] = useState('home');
        const handleMouseEnterLogo = () => {
                setIsHoverLogo(true);
        };
        const handleMouseLeaveLogo = () => {
                setIsHoverLogo(false);
        };
        const handleMouseEnterHome = () => {
                setIsHoverHome(true);
        };
        const handleMouseLeaveHome = () => {
                setIsHoverHome(false);
        };

        const handleMouseEnterPatients = () => {
                setIsHoverPatient(true);
        };
        const handleMouseLeavePatients = () => {
                setIsHoverPatient(false);
        };
        const handleMouseEnterSessions = () => {
                setIsHoverSession(true);
        };
        const handleMouseLeaveSessions = () => {
                setIsHoverSession(false);
        };

        // Sidebar CSS

        return (
                <div style={{ display: 'flex', height: '100vh' }}>
                       <Sidebar backgroundColor="black" width='200px' >
        <Menu>
          <MenuItem
            icon={<FaBars />}
            onClick={() => {
              collapseSidebar();
            }}
            onMouseEnter={handleMouseEnterLogo}
            onMouseLeave={handleMouseLeaveLogo}
            style={{ color: 'white', backgroundColor:'black'}}
          >
            <div style={{ color: isHoverLogo ? 'black' : 'white' }}>
              {' '}
              <img width={35} src={ba_logo}></img>
            </div>
          </MenuItem>
          <MenuItem
            icon={<FaHome />}
            component={<Link to="/home" />}
            onClick={() => setActiveTab('home')}
            onMouseEnter={handleMouseEnterHome}
            onMouseLeave={handleMouseLeaveHome}
            className={`${activeTab === 'home' && 'home'} sidebar-tab`}
          >
            {' '}
            <div> Home</div>
          </MenuItem>
          <MenuItem
            icon={<FaUserFriends />}
            component={<Link to="/patients" />}
            onClick={() => setActiveTab('patients')}
            onMouseEnter={handleMouseEnterPatients}
            onMouseLeave={handleMouseLeavePatients}
            className={`${activeTab === 'patients' && 'patients'} sidebar-tab`}
            style={{ color: isHoverPatient ? 'black' : 'white' }}
          >
            {' '}
            <div style={{ color: isHoverPatient ? 'black' : 'white' }}> Patients</div>
          </MenuItem>
          <MenuItem
            icon={<FaRegCalendarAlt />}
            component={<Link to="/session" />}
            onClick={() => setActiveTab('sessions')}
            className={`${activeTab === 'sessions' && 'sessions'} sidebar-tab`}
            onMouseEnter={handleMouseEnterSessions}
            onMouseLeave={handleMouseLeaveSessions}
            style={{ color: isHoverSession ? 'black' : 'white' }}
          >
            {' '}
            <div style={{ color: isHoverSession ? 'black' : 'white' }} > Sessions</div>
          </MenuItem>
        </Menu>
      </Sidebar>
                        <main style={{ "width": "100%" }}>
                                <div className='container-fluid'>
                                        <div className='row' style={{ "zIndex": "1" }}>
                                                <Navbarcommon />
                                        </div>
                                        <div className='row pt-3 pb-2'>
                                                <div className='col text-left' style={{ "cursor": "pointer" }}>
                                                        <sapn className='border border-success col text-center p-1 rounded-2 text-success ' onClick={handleShow}  >
                                                                <AiOutlineCalendar /> Add New Session
                                                        </sapn>
                                                </div>
                                                <div className='col text-left' style={{ "cursor": "pointer" }}>
                                                        <sapn className='border border-success col text-center p-1 rounded-2 text-success ' onClick={handleShowP}  >
                                                                <BsPeople /> Add New Patient
                                                        </sapn>

                                                </div>

                                                <div className='col text-left'>
                                                        <sapn className='border border-success col text-center p-1 rounded-2 text-success ' >
                                                                <div className='ddd'>
                                                                        <div className='ic'>
                                                                                <HiOutlineChip />
                                                                        </div>
                                                                        <div className='cont'>
                                                                                Device <small style={{ 'fontSize': '9px' }}>  Connected to:QDIC-name of the device</small>
                                                                        </div> </div>
                                                        </sapn>
                                                </div>

                                        </div>
                                        
                                        <div className="accordion">
                                                <div className="accordion-item">
                                                <div
                                                        className="accordion-title"
                                                        onClick={() => setIsActive(!isActive)}
                                                >
                                                <div className='row'>
                                                        <div className='col'>Upcoming Sessions</div>
                                                <div className='col text-end'>{isActive ? <BsChevronDown/> :<BsChevronUp/>}</div></div>
                                                </div>
                                                        {isActive && <div className="accordion-content"><Upcomingsession /></div>}
                                                </div>
                                        </div>

                                        <div className='row pt-4 mt-4 ms-2 me-2' style={{"backgroundColor":"#FAFAFA","borderRadius":"16px"}}>
                                                <div className='col'>
                                                        <div className='row'>
                                                                <div className='col'>
                                                                        <h5>Patients Examined per Month</h5>
                                                                </div>
                                                                <div className='col'></div>
                                                                <div className='col-2 text-center'>
                                                                        <select
                                                                                className="form-select form-select-sm"
                                                                                id="year"
                                                                                name="year"
                                                                                aria-label="form-select-sm example"
                                                                        >
                                                                                <option defaultValue value="0">2022</option>
                                                                                <option value="1">2021</option>
                                                                                <option value="2">2020</option>
                                                                                <option value="3">2019</option>

                                                                        </select>
                                                                </div></div>

                                                                <LowerChart />
                                                        </div>
                                                </div>
                                        <div className='row pt-4 mt-4 ms-2 me-2' style={{"backgroundColor":"#FAFAFA","borderRadius":"16px"}}>
                                                <div className='col'>
                                                        <div className='row'>
                                                                <div className='col'>
                                                                        <h5>Sessions Attended per Month</h5>
                                                                </div>
                                                                <div className='col'></div>
                                                                <div className='col-2 text-center'>
                                                                        <select
                                                                                className="form-select form-select-sm"
                                                                                id="year"
                                                                                name="year"
                                                                                aria-label="form-select-sm example"
                                                                        >
                                                                                <option defaultValue value="0">2022</option>
                                                                                <option value="1">2021</option>
                                                                                <option value="2">2020</option>
                                                                                <option value="3">2019</option>

                                                                        </select>
                                                                </div>
                                                        </div>
                                                        <UpperChart />
                                                </div>
                                        </div>
                                        <div className='row'>
                                                <div>
                                                        <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>Add New Session</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body style={{"padding":0, "margin":0}}>
                                                                        <div className='ps-3 pe-3'>
                                                                                <AddNewSessionForm />
                                                                        </div>
                                                                        <div className='row ps-3 pe-3'>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                                                <Button variant="secondary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                                        Cancel
                                                                                                </Button>
                                                                                        </div></div>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                                                <Button variant="primary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                                        Add Session
                                                                                                </Button>
                                                                                        </div></div></div>
                                                                </Modal.Body>
                                                        </Modal>
                                                </div>
                                        </div>
                                        <div className='row'>
                                                <div>
                                                        <Modal show={showP} onHide={handleCloseP}>
                                                                <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>Add New Patient</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                        <div>
                                                                                <Form />
                                                                        </div>
                                                                        <div className='row ps-3 pe-3'>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                                                <Button variant="secondary" onClick={handleCloseP} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                                        Cancel
                                                                                                </Button>
                                                                                        </div></div>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                                                <Button variant="primary" onClick={handleBciShow} style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                                        Add Patient
                                                                                                </Button>
                                                                                        </div>
                                                                                </div></div>
                                                                </Modal.Body>

                                                        </Modal>
                                                </div>
                                        </div>
                                        <div className='row'>
                                                <div>
                                                        <Modal size="lg" show={showBci} onHide={handleBciClose}>
                                                                <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>BCI Calibration</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                        <div>
                                                                                <Bci />
                                                                        </div>
                                                                </Modal.Body>

                                                        </Modal>
                                                </div>
                                        </div>
                                        <div className='row'>
                                                <div>
                                                        <Modal show={showCC} onHide={handleCCClose}>
                                                                <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>Headset Contact Quality</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                        <div>
                                                                                <HCQ />
                                                                        </div>

                                                                        <div className='row pt-3'>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                                                <Button variant="secondary" onClick={handleCCClose} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                                        Plot Data
                                                                                                </Button>
                                                                                        </div></div>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                                                <Link to="/calibration">
                                                                                                        <Button variant="primary" style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                                                Continue
                                                                                                        </Button></Link>
                                                                                        </div></div>
                                                                                </div>
                                                                </Modal.Body>
                                                        </Modal>
                                                </div>
                                        </div>
                                </div>
                        </main>
                </div>


        )
}


export default Home;