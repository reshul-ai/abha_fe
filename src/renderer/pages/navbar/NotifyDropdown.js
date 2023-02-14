import React, { useState } from 'react';
import { Notification } from './data/Notification';
import { Link } from 'react-router-dom';
import './NotifyDropdown.css';
import { AiOutlineBell } from 'react-icons/ai';
import notificationIcon from '../../../../assets/icons/notification.png';
const NotifyDropdown = () => {
  const [notification, setNotification] = useState(false);

  return (
    <>
      <ul
        className={
          notification ? 'services-submenu clicked' : 'services-submenu'
        }
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
                <img className='notfication-icon' src={notificationIcon} alt="" />
                <span className='notification-text'>{item.content}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NotifyDropdown;
