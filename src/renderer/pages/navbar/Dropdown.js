import React, { useState } from "react";
import { guideDropdown } from "./NavItems";
import { Link } from "react-router-dom";
import "./Dropdown.css";

const Dropdown=()=> {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <ul
        className={dropdown ? "nservices-submenu clicked" : "nservices-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
        {guideDropdown.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className="nsubmenu-item"
                onClick={() => setDropdown(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
