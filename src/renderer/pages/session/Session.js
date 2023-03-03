import React, { useState, useEffect } from 'react';
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
    const [activeTab, setActiveTab] = useState('sessions');
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


    const [paradigms, setParadigms] = useState({});

    const getParadigms = (() => {
            window.require("electron").ipcRenderer.send("getParadigms",{});

            window.require("electron").ipcRenderer.on("getParadigms", (e,data) => {
                console.log(data);
                setParadigms(data);
            });
    });

    useEffect(() => {
      if (window.require && window.require("electron"))
        getParadigms();
    },[]);


    return (
        <div style={{ display: 'flex', height: '100vh' }}>

<Sidebar backgroundColor="black" width='200px'>
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
            onMouseEnter={handleMouseEnterHome}
            onMouseLeave={handleMouseLeaveHome}
            style={{ color: isHoverHome ? 'black' : 'white' }}
          >
            {' '}
            <div style={{ color: isHoverHome ? 'black' : 'white' }}> Home</div>
          </MenuItem>
          <MenuItem
            icon={<FaUserFriends />}
            component={<Link to="/patients" />}
            onMouseEnter={handleMouseEnterPatients}
            onMouseLeave={handleMouseLeavePatients}
            style={{ color: isHoverPatient ? 'black' : 'white' }}
          >
            {' '}
            <div style={{ color: isHoverPatient ? 'black' : 'white' }}>
              {' '}
              Patients
            </div>
          </MenuItem>
          <MenuItem
            icon={<FaRegCalendarAlt />}
            component={<Link to="/session" />}
            onClick={() => setActiveTab('sessions')}
            className={`${activeTab === 'sessions' && 'sessions'} sidebar-tab`}
          >

            <div> Sessions</div>
          </MenuItem>
        </Menu>
      </Sidebar>

            <main style={{ "width": "100%" }}>
                <div className='container-fluid'>
                <div className='row' style={{"zIndex":"1"}}>
                                                        < Navbarcommon />
                                        </div>
                    <div className='row pt-3 pb-3'>
                                                      <div className='col-md-6' style={{ "cursor": "pointer" }}>
                                                                <span className='d-inline-block mr-3 text-bold' onClick={() => { setUpcomingSession(true) }} 
                                                                style={{ 'border-bottom': upcomingSession ?  "3px solid black" : "none" }}>
                                                                        <p style={{"fontWeight": upcomingSession ? "bold" : "normal","margin":0,"padding":4 }}>Upcoming Sessions</p></span>

                                                                <span className='d-inline-block text-bold ms-2' onClick={() => { setUpcomingSession(false) }} 
                                                                style={{ 'border-bottom': upcomingSession ? "none" :  "3px solid black" }}><p style={{"fontWeight": upcomingSession ? "normal" : "bold", "margin":0,"padding":4 }}>Past Sessions</p></span>
                                                        </div>

                                            {/* <div className='col-md-6' style={{ "cursor": "pointer" }}>
                                                <span className='d-inline-block p-2 mr-3' onClick={() => { setUpcomingSession(true) }} 
                                                style={{ 'border-bottom': upcomingSession ? "2px solid black" : "none" }}>
                                                    <p style={{"fontWeight": upcomingSession ? "bold" : "normal","margin":0,"padding":4 }}>Upcoming Sessions</p></span>

                                                <span className='d-inline-block ms-2 ' onClick={() => { setUpcomingSession(false) }} 
                                                style={{ 'border-bottom': upcomingSession ? "none" : "2px solid black" }}><p style={{"fontWeight": upcomingSession ? "normal" : "bold" ,"margin":0,"padding":4}}></p></span>
                                            </div> */}
                        <div className='col-md-6 text-end'>
                            <button className='btn btn-success' onClick={handleShow} style={{ 'margin-inline': '5px', "backgroundColor":"#006666","color":"white" }}>Add New Session</button>
                            {/*  <span   className='border border-success  text-center p-2 rounded-2' onClick={handleSetShowAssess} style={{ "cursor": "pointer" }}>Take Assessment</span> */} 
                        </div>
                        
                    </div>
                    <div className='row'>
                        <div className='col ps-4 pe-4'>
                            <div>
                                {upcomingSession ? <Upcomingsession /> : <Pastsession paradigms={paradigms} />}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton style={{'border-color':'#FFFFFF'}}>
                                    <Modal.Title><h5 className='pt-3 ps-2'>Add New Session</h5></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <AddNewSessionForm handleClose={handleClose} />
                                    </div>
                                </Modal.Body>
                               
                            </Modal>
                        </div>
                    </div>
                    <div className='row'>
                        <div>
                            <Modal show={showAssess} onHide={handleAssessClose}>
                                <Modal.Header closeButton style={{'border-color':'#FFFFFF'}}>
                                    <Modal.Title>Assessments</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div>
                                        <TakeAssessmentForm />
                                    </div>
                                    <div className='row'>
                                                <div className='col'>
                                                    <div className="form-outline text-start mb-4">
                                            <Button variant="secondary" onClick={handleAssessClose} style={{'width':'100%','backgroundColor':'#FFFFFF','color':'#006666','border-color':'#006666'}}>
                                                                                Cancel
                                                                        </Button>
                                                                        </div></div>
                                                                        <div className='col'>
                                                    <div className="form-outline text-start mb-4" >
                                                                        <Button variant="primary" onClick={handleAssessClose} style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF',}}>
                                                                        Save
                                                                         </Button>
                                           </div></div></div>
                                </Modal.Body>
                               
                            </Modal>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
};
export default Session;