import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { navItems } from "./NavItems";
import Loggeduser from "./component/User";
import NotifyDropdown from "./NotifyDropdown";
import Dropdown from "./Dropdown";
import { AiOutlineMenu } from "react-icons/ai";
import ba_logo from "../login/BrainAlive.svg";
import { useLocation } from 'react-router-dom'
import './nav.css';
const Navbarcommon=() =>{
  const [dropdown, setDropdown] = useState(false);
  const [notification, setNotification] = useState(false);
  const [user, setUser] = useState(false);
  const location = useLocation();
  let urlPath=location.pathname.split("/")[1];
   console.log(location.pathname); 
   
  return (
    <>
      <div className="container-fluid p-0">
      <nav className="navbar pt-2 pb-2">
       
        <div className="col-10 text-center">
              <ul className="">
                  {urlPath==='navbar' && 'Navbar'}
                  {urlPath==='home' && 'Home'}
                  {urlPath==='session' && 'Sessions'}
                  {urlPath==='patients' && 'Patients'}
                  {urlPath==='individualpatients' && 'Patients'}
              </ul>
        </div>


        <div className="col">
            <ul className="nav-items me-0">
              {navItems.map((item) => {
                if (item.id === 1) {
                
                    return (
                      <li
                        key={item.id}
                        className={item.cName}
                        onMouseEnter={() => setNotification(true)}
                          onMouseLeave={() => setNotification(false)}  
                      >
                        <Link to={item.path}>{item.title}</Link>
                        {notification && <NotifyDropdown />}
                      </li>
                    );
                  }
                  if (item.id === 2) {
                
                      return (
                        <li
                          key={item.id}
                          className={item.cName}
                          onMouseEnter={() => setDropdown(true)}
                          onMouseLeave={() => setDropdown(false)} 
                        >
                          <Link to={item.path}>{item.title}</Link>
                          {dropdown && <Dropdown />}
                        </li>
                      );
                    }
                    if (item.id === 3) {
                
                        return (
                          <li
                            key={item.id}
                            className={item.cName}
                            onMouseEnter={() => setUser(true)}
                            onMouseLeave={() => setUser(false)}
                          >
                            <Link to={item.path}>{item.title}</Link>
                            {user && <Loggeduser />}
                          </li>
                        );
                      }
              })}
            </ul>
        </div>
      
        
        
        
      </nav>
      </div>
      
    </>
  );
}

export default Navbarcommon;