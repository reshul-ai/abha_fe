import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import Upcomingsession from './Upcomingsession';
import Pastsession from './PastSession';
import AddNewSessionForm from './AddNewSessionForm';
import TakeAssessmentForm from './TakeAssessmentForm';
import Navbarcommon from '../navbar/Navbar';
import ba_logo from "../login/BrainAlive.svg";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";


const Session = () => {

    const { collapseSidebar } = useProSidebar();
    
    const [upcomingSession, setUpcomingSession] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAssess, setShowAssess] = useState(false);
    const handleAssessClose = () => setShowAssess(false);
    const handleSetShowAssess = () => setShowAssess(true);

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
                    <div className='row pt-3 pb-3'>

                        <div className='col-md-6' style={{ "cursor": "pointer" }}>
                            <span className='d-inline-block p-2 mr-3' onClick={() => { setUpcomingSession(true) }} 
                            style={{ 'border-bottom': upcomingSession ? "2px solid black" : "none" }}>
                                <b>Upcoming Sessions</b></span>

                            <span className='d-inline-block p-2 ' onClick={() => { setUpcomingSession(false) }} 
                            style={{ 'border-bottom': upcomingSession ? "none" : "2px solid black" }}><b>Past Sessions</b></span>
                        </div>
                        <div className='col-md-6 text-end'>
                            <button className='btn btn-success' onClick={handleShow} style={{ 'margin-inline': '5px' }}>Add New Session</button>
                            <span   className='border border-success  text-center p-2 rounded-2' onClick={handleSetShowAssess} style={{ "cursor": "pointer" }}>Take Assessment</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div>
                                {upcomingSession ? <Upcomingsession /> : <Pastsession />}
                            </div>
                        </div>
                    </div>
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
                            <Modal show={showAssess} onHide={handleAssessClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Assessments</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <TakeAssessmentForm />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleAssessClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleAssessClose}>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
};
export default Session;