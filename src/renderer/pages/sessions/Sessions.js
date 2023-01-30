import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaAlignJustify, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";


const Sessions = () =>{

    const { collapseSidebar } = useProSidebar();
    return (

        <>

                <div style={{ display: 'flex', height: '100vh' }}>
                        <Sidebar>
                            <Menu>
                                <MenuItem
                                    icon={<FaAlignJustify />}
                                    onClick={() => {
                                    collapseSidebar();
                                    }}
                                    style={{ textAlign: "center" }}
                                >
                                    {" "}
                                    <h2>BrainAlive</h2>
                                </MenuItem>
                                
                                    <MenuItem icon={<FaHome />} component={<Link to="/" />}> 
                                        {" "} Home
                                    </MenuItem>
                                
                                
                                    <MenuItem icon={<FaUserFriends />} component={<Link to="/patients" />}><div> {" "} Patients </div></MenuItem>
                               
                                
                                    <MenuItem icon={<FaRegCalendarAlt />} component={<Link to="/sessions" />}><div> {" "} Sessions </div></MenuItem>
                               
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