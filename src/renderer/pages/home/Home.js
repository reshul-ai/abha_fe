import React, { useEffect, useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import UpperChart from './UpperChart';
import LowerChart from './LowerChart';
import TopUpcomingSession from '../session/TopUpcomingSession';
import AddNewSessionForm from '../session/AddNewSessionForm';
import { AiOutlineCalendar,AiOutlineInfoCircle } from "react-icons/ai";
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
import leftHand from './left-hand.mp4';

const Home = () => {

        const { collapseSidebar } = useProSidebar();

        const [isActive, setIsActive] = useState(true);

        const [render, setRender] = useState(false);

        const [show, setShow] = useState(false);
        const handleClose = () => {
                setShow(false);
                setIsActive(false);
                setTimeout(() => {
                        setIsActive(true);
                }, 500);
                
        };
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
        
        const [graph,setGraph] = useState({});

        function groupSessionsByYear(data) {
                const sessionsByYear = {};
                
                for (const session of data) {
                  const date = new Date(session.date);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  
                  if (!sessionsByYear[year]) {
                    sessionsByYear[year] = {};
                  }
                  
                  if (!sessionsByYear[year][month]) {
                    sessionsByYear[year][month] = { patients: new Set(), sessions: [] };
                  }
                  
                  sessionsByYear[year][month].patients.add(session.patientId);
                  sessionsByYear[year][month].sessions.push(session.id);
                }
                
                return sessionsByYear;
        }

        // function classifyPatientsByMonthAndYear(data) {
        //         let patientsByMonthAndYear = {};
              
        //         for (let item of data) {
        //           let date = new Date(item.date);
        //           let year = date.getFullYear();
        //           let month = date.getMonth() + 1; // January is 0
              
        //           if (!patientsByMonthAndYear[year]) {
        //             patientsByMonthAndYear[year] = {};
        //           }
              
        //           if (!patientsByMonthAndYear[year][month]) {
        //             patientsByMonthAndYear[year][month] = new Set();
        //           }
              
        //           patientsByMonthAndYear[year][month].add(item.patientId);
        //         }
              
        //         return patientsByMonthAndYear;
        // }

        const [socketConnected,setSocketConnected] = useState(false);

        useEffect(() => {
                if (window.require && window.require("electron")){
                        // window.require("electron").ipcRenderer.send('client_status',{});
                        window.require("electron").ipcRenderer.on("client_status", (e,data) => {
                                console.log(data);
                                if(data==="connected"){
                                        setSocketConnected(true);
                                        // console.log(data);
                                } else{
                                        setSocketConnected(false);
                                        // console.log(data);
                                }
                        });
                }
        },[socketConnected]);

        useEffect(() => {
                const handleKeyDown = (event) => {
                  if (event.key === 'Escape') {
                    // send a message to the main window to close the child window
                //     window.opener.postMessage('close-child-window', '*');
                console.log("key pressed");
                  }
                };
            
                window.document.addEventListener('keydown', handleKeyDown);
            
                return () => {
                  window.document.removeEventListener('keydown', handleKeyDown);
                };
        }, []);

        const [sessionData, setSessionData] = useState({items:[]});

        const getSessionResultsData = (() => {
                window.require("electron").ipcRenderer.send("getSessionData",{});
          
                window.require("electron").ipcRenderer.on("getSessionData", (e,data) => {
                        console.log(data.items);
                        setSessionData(data);
                        const graphData = groupSessionsByYear(data.items);
                        setGraph(graphData);
                        console.log(graphData);
                        setRender(true);
                        // Assuming the data is stored in a variable called 'data'
                        const sessionsPerMonthPerYear = {};

                        // Loop through each session
                        for (const session of data.items) {
                        // Parse the session date
                        const sessionDate = new Date(session.date);
                        const year = sessionDate.getFullYear();
                        const month = sessionDate.getMonth() + 1;

                        // Create the year and month key if it doesn't exist yet
                        if (!sessionsPerMonthPerYear[year]) {
                        sessionsPerMonthPerYear[year] = {};
                        }
                        if (!sessionsPerMonthPerYear[year][month]) {
                        sessionsPerMonthPerYear[year][month] = {
                        patients: new Set(),
                        sessions: []
                        };
                        }

                        // Add the patient to the set of patients for that month
                        sessionsPerMonthPerYear[year][month].patients.add(session.patientId);
                        // Add the session to the array of sessions for that month
                        sessionsPerMonthPerYear[year][month].sessions.push(session.id);
                        }

                        // Convert the object to an array for easier manipulation and sorting
                        const sessionsPerMonthPerYearArray = [];
                        for (const year in sessionsPerMonthPerYear) {
                        for (const month in sessionsPerMonthPerYear[year]) {
                        const patientsCount = sessionsPerMonthPerYear[year][month].patients.size;
                        const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' });
                        sessionsPerMonthPerYearArray.push({
                        name: monthName,
                        patients: patientsCount,
                        year: year
                        });
                        }
                        }

                        // Sort the array by year and month
                        sessionsPerMonthPerYearArray.sort((a, b) => {
                        if (a.year !== b.year) {
                        return a.year - b.year;
                        }
                        return a.name.localeCompare(b.name);
                        });

                        console.log(sessionsPerMonthPerYearArray);
                });
        });

        useEffect(() => {
                getSessionResultsData();
        },[]);

        const [patientId, setPatientId] = useState('')

        const handlePatient = ((id) => {
        setPatientId(id);
        })

        const [leftHandPath,setLeftHandPath] = useState('');
        const [rightHandPath, setRightHandPath] = useState('');

        // const getAssetPath = (()=> {
        //         if(window.require && window.require("electron")) 
        //                 window.require("electron").ipcRenderer.send("path", 'left-hand.mp4');
        //         if(window.require && window.require("electron")) 
        //                 window.require("electron").ipcRenderer.on("path", (e,data) => {
        //                 setLeftHandPath(data);
        //         })
        //         if(window.require && window.require("electron")) 
        //                 window.require("electron").ipcRenderer.send("path", 'right-hand.mp4');
        //         if(window.require && window.require("electron")) 
        //                 window.require("electron").ipcRenderer.on("path", (e,data) => {
        //                 setRightHandPath(data);
        //         })
        // });
        
        // useEffect(() => {
        //         getAssetPath();
        // });

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
                                        {/* <div className='row'>
                                                <h5>{leftHandPath}</h5>
                                                <video src={leftHandPath} autoPlay muted/>
                                        </div> */}
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

                                                <div className='col text-left' >
                                                        <sapn className='border border-success col text-center p-1 rounded-2 text-success ' >
                                                                <div className='ddd'>
                                                                        <div className='ic'>
                                                                        {socketConnected?<HiOutlineChip fontSize={'30px'} color='green'/>:<HiOutlineChip color='red'/>}
                                                                        </div>
                                                                        <div className='cont'>
                                                                                {
                                                                                socketConnected ? <div><h5 style={{marginBottom:'0px'}}>Device</h5><small style={{ 'fontSize': '9px' }}>  Connected</small></div>:
                                                                                <div style={{color:'red'}}><h5 style={{marginBottom:'0px'}}>Device</h5> <small style={{ 'fontSize': '9px' }}>  Not Connected</small></div>
                                                                                }
                                                                                
                                                                        </div> 
                                                                </div>
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
                                                        {isActive && <div className="accordion-content"><TopUpcomingSession /></div>}
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
                                                                                <option defaultValue value="0">2023</option>
                                                                                {/* <option value="1">2021</option>
                                                                                <option value="2">2020</option>
                                                                                <option value="3">2019</option> */}

                                                                        </select>
                                                                </div></div>

                                                                { render && <LowerChart graph={graph}/>}
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
                                                        { <UpperChart graph={graph}/>}
                                                </div>
                                        </div>
                                        <div className='row'>
                                                <div>
                                                        <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton style={{ 'borderColor': '#FFFFFF' }}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>Add New Session</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body style={{"padding":0, "margin":0}}>
                                                                        <div className='ps-3 pe-3'>
                                                                                <AddNewSessionForm handleClose={handleClose}/>
                                                                        </div>
                                                                        
                                                                </Modal.Body>
                                                        </Modal>
                                                </div>
                                        </div>
                                        <div className='row'>
                                                <div>
                                                        <Modal show={showP} onHide={handleCloseP}>
                                                                <Modal.Header closeButton style={{ 'borderColor': '#FFFFFF' }}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>Add New Patient</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                        <div>
                                                                                <Form handlePatient={handlePatient} handleBciShow={handleBciShow} handleCloseP={handleCloseP}/>
                                                                        </div>
                                                                </Modal.Body>

                                                        </Modal>
                                                </div>
                                        </div>
                                        <div className='row'>
                                                <div>
                                                        <Modal size="lg" show={showBci} onHide={handleBciClose}>
                                                                <Modal.Header closeButton style={{ 'borderColor': '#FFFFFF' }}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>BCI Calibration</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                        <div>
                                                                                <Bci handleBciClose={handleBciClose} patientId={patientId}/>
                                                                        </div>
                                                                </Modal.Body>

                                                        </Modal>
                                                </div>
                                        </div>
                                        <div className='row'>
                                                <div>
                                                        <Modal show={showCC} onHide={handleCCClose}>
                                                                <Modal.Header closeButton style={{ 'borderColor': '#FFFFFF' }}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>Headset Contact Quality</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                        <div>
                                                                                <HCQ />
                                                                        </div>

                                                                        <div className='row pt-3'>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                                                <Button variant="secondary" onClick={handleCCClose} style={{ 'width': '100%', 'backgroundColor': '#FFFFFF', 'color': '#006666', 'borderColor': '#006666' }}>
                                                                                                        Plot Data
                                                                                                </Button>
                                                                                        </div></div>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'paddingRight': '6%' }}>
                                                                                                <Link to="/calibration">
                                                                                                        <Button variant="primary" style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                                                Continue
                                                                                                        </Button>
                                                                                                </Link>
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