import React, { useState } from "react";
import { Notification } from "./data/Notification";
import { Link } from "react-router-dom";
import "./NotifyDropdown.css";
import { AiOutlineBell } from "react-icons/ai";
const NotifyDropdown=()=> {
  const [notification, setNotification] = useState(false);

  return (
    <>
      <ul
        className={notification ? "services-submenu clicked" : "services-submenu"}
        onClick={() => setNotification(!notification)}
      >
        {Notification.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to=""
                className={item.cName}
                onClick={() => setNotification(false)}
              >
                {<AiOutlineBell/>}{item.content}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NotifyDropdown;
