import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
import ba_logo from "../login/BrainAlive.svg";

import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";

const Sessions = () =>{

    const { collapseSidebar } = useProSidebar();

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

        <>

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
                                <MenuItem icon={<FaRegCalendarAlt />} component={<Link to="/sessions" />} onMouseEnter={handleMouseEnterSessions} 
                                    onMouseLeave={handleMouseLeaveSessions} style={{color: isHoverSession ? 'black' : 'white'}}> <div style={{color: isHoverSession ? 'black' : 'white'}}>{" "} Sessions</div></MenuItem>
                            </Menu>
                        </Sidebar>
                        <main>
                                <h1>This is Sessions Page</h1>
                        </main>
                </div>


        </>

    );
}


export default Sessions;