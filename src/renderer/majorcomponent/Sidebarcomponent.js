import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";


import Home from "../pages/Home";
import ba_logo from "../login/BrainAlive.svg";
const Sidebarcomponent = () =>{

    const { collapseSidebar } = useProSidebar();
    return (

        <>

            <div style={{ display: 'flex', height: '100vh' }}>
                    <Sidebar>
                        <Menu>
                            <MenuItem
                                icon={<FaBars />}
                                onClick={() => {
                                collapseSidebar();
                                }}
                                style={{ textAlign: "center" }}
                            >
                                {" "}
                                <img width={25} src={ba_logo}></img>
                            </MenuItem>
                            <MenuItem icon={<FaHome />} component={<Link to="/" />}> {" "} Home</MenuItem>
                            <MenuItem icon={<FaUserFriends />} component={<Link to="/patients" />}> {" "} Patients</MenuItem>
                            <MenuItem icon={<FaRegCalendarAlt />} component={<Link to="/sessions" />}> {" "} Sessions</MenuItem>
                        </Menu>
                    </Sidebar>
                    <main>
                        <Home />
                    </main>
            </div>

        </>

    );
}


export default Sidebarcomponent;