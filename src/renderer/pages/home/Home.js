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

import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

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


        // Sidebar CSS

        const [isHoverHome, setIsHoverHome] = useState(false);
        const [isHoverPatient, setIsHoverPatient] = useState(false);
        const [isHoverSession, setIsHoverSession] = useState(false);
        const [isHoverLogo, setIsHoverLogo] = useState(false);

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
                        <Sidebar backgroundColor='black'>
                            <Menu>
                                <MenuItem
                                    icon={<FaBars />}
                                    onClick={() => {
                                    collapseSidebar();                                
                                    }}
                                    
                                    onMouseEnter={handleMouseEnterLogo} 
                                    onMouseLeave={handleMouseLeaveLogo}
                                    style={{color:isHoverLogo ? 'black' : 'white'}}
                                >
                                    <div style={{"color":isHoverLogo ? 'black' : 'white'}}>{" "}
                                    <img width={25} src={ba_logo}></img></div>
                                </MenuItem>
                                <MenuItem icon={<FaHome />} component={<Link to="/home" />} onMouseEnter={handleMouseEnterHome} 
                                    onMouseLeave={handleMouseLeaveHome} style={{color: isHoverHome ? 'black' : 'white'}}> <div style={{color: isHoverHome ? 'black' : 'white'}}>{" "} Home</div></MenuItem>
                                <MenuItem icon={<FaUserFriends />} component={<Link to="/patients" />} onMouseEnter={handleMouseEnterPatients} 
                                    onMouseLeave={handleMouseLeavePatients} style={{color: isHoverPatient ? 'black' : 'white'}}> <div style={{color: isHoverPatient ? 'black' : 'white'}} >{" "} Patients</div></MenuItem>
                                <MenuItem icon={<FaRegCalendarAlt />} component={<Link to="/session" />} onMouseEnter={handleMouseEnterSessions} 
                                    onMouseLeave={handleMouseLeaveSessions} style={{color: isHoverSession ? 'black' : 'white'}}> <div style={{color: isHoverSession ? 'black' : 'white'}}>{" "} Sessions</div></MenuItem>
                            </Menu>
                        </Sidebar>
                        <main style={{ "width": "100%" }}>
                                <div className='container-fluid'>
                                        <div className='row' style={{"zIndex":"1"}}>
                                                        < Navbarcommon />
                                        </div>
                                        <div className='row pt-3 pb-2'>
                                                <div className='col text-left' style={{ "cursor": "pointer" }}>
                                                        <sapn className='border border-success col text-center p-1 rounded-2 text-success ' onClick={handleShow}  >
                                                        <AiOutlineCalendar /> Add New Session
                                                        </sapn>

                                                </div>
                                                <div className='col text-left' style={{ "cursor": "pointer" }}>
                                                        <sapn className='border border-success col text-center p-1 rounded-2 text-success ' onClick={handleShow}  >
                                                        <BsPeople/> Add New Patient
                                                        </sapn>
                                                                
                                                </div>

                                                <div className='col text-left'>
                                                        <sapn className='border border-success col text-center p-1 rounded-2 text-success ' >
                                                        <HiOutlineChip/>  Device <small style={{'fontSize':'9px'}}>  Connected to:QDIC-name of the device</small>
                                                        </sapn>
                                                                
                                                </div>
                                               
                                        </div>     
                                        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header variant="dark">  Upcoming Sessions</Accordion.Header>
        <Accordion.Body>
                   <Upcomingsession />  
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>
                                     

                                        <div className='row pt-2'>
                                                <div className='col'>
                                                <div className='row'>
                                                <div className='col'>
                                                <p>Sessions attended per Month</p>        
                                                        </div><div className='col'></div>
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

                                                                <UpperChart /></div></div>
                                                                <div className='row pt-5'>
                                                <div className='col'>
                                                <div className='row'>
                                                <div className='col'>
                                                <p>Patients Examined per Month</p>        
                                                        </div><div className='col'></div>
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

                                                                <LowerChart /></div></div>
                                        <div className='row'>
                                                <div>
                                                        <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton>
                                                                        <Modal.Title>Add New Session</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                        <div>
                                                                                <AddNewSessionForm />
                                                                        </div>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                        <Button variant="secondary" onClick={handleClose}>
                                                                                Cancel
                                                                        </Button>
                                                                        <Button variant="primary" onClick={handleClose}>
                                                                                Add Session
                                                                        </Button>
                                                                </Modal.Footer>
                                                        </Modal>
                                                </div>
                                        </div>
                                        <div className='row'>
                                                        <div>
                                                                <Modal show={showP} onHide={handleCloseP}>
                                                                        <Modal.Header closeButton>
                                                                        <Modal.Title>Add New Patient</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                                <div>
                                                                                        <Form />
                                                                                </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                        <Button variant="secondary" onClick={handleCloseP}>
                                                                                Cancel
                                                                        </Button>
                                                                        <Button variant="primary" onClick={handleBciShow}>
                                                                                Add Patients
                                                                        </Button>
                                                                        </Modal.Footer>
                                                                </Modal>
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                        <div>
                                                                <Modal size="lg" show={showBci} onHide={handleBciClose}>
                                                                        <Modal.Header closeButton>
                                                                        <Modal.Title>BCI Caliberation</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                                        <div>
                                                                                                <Bci />
                                                                                        </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                        <Button variant="secondary" onClick={handleBciClose}>
                                                                                Close
                                                                        </Button>
                                                                        <Button variant="primary" onClick={handleCCShow}>
                                                                                Save Changes
                                                                        </Button>
                                                                        </Modal.Footer>
                                                                </Modal>
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                        <div>
                                                                <Modal show={showCC} onHide={handleCCClose}>
                                                                        <Modal.Header closeButton>
                                                                        <Modal.Title>Headset Contact Quality</Modal.Title>
                                                                        </Modal.Header>
                                                                                <Modal.Body>
                                                                                                <div>
                                                                                                        <HCQ />
                                                                                                </div>
                                                                                </Modal.Body>
                                                                        <Modal.Footer>
                                                                                <Button variant="secondary" onClick={handleCCClose}>
                                                                                        Show Plot Data
                                                                                </Button>
                                                                                <Link to="/trialmain">
                                                                                        <Button variant="primary">
                                                                                                Continue
                                                                                        </Button>
                                                                                </Link>
                                                                        </Modal.Footer>
                                                                </Modal>
                                                        </div>
                                                </div>
                                </div>
                        </main>
                </div>


        )
}


export default Home;