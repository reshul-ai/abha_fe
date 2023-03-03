import { useState, useEffect } from "react";
import "./resModal.css";
import Success from '../../../assets/icons/Success.png';
import Failure from '../../../assets/icons/Failure.png';

function ResModal({ res, handleClose }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpen(false);
      handleClose();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [handleClose]);

  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <img src={res ? Success : Failure} alt={res?"Sucess":"Failure"} />
    </div>
  );
}

export default ResModal;