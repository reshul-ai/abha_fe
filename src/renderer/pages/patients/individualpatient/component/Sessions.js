import react,{useState} from 'react';

import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Upcomingsession from './Upcomingsession';
import Pastsessions from './Pastsessions';
import { BsChevronDown,BsChevronUp } from "react-icons/bs";


const Patientsession = () => {

  const [isUpcomingActive, setIsUpcomingActive] = useState(true);
  const [isPastActive, setIsPastActive] = useState(true);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
        /*   backgroundColor: theme.palette.action.hover, */
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(patient_id, patient_name, date_started, age, sessions, mi_accuracy, contact_number) {
        return { patient_id, patient_name, date_started, age, sessions, mi_accuracy, contact_number };
      }
      
      const rows = [
        createData(2462,'Patient 01', '19 Jan, 2023', 2, 1, 24, '+91-963258741'),
        createData(2462,'Patient 02', '19 Jan, 2023', 2, 1, 37, '+91-963258741'),
        createData(2462,'Patient 03', '19 Jan, 2023', 2, 8, 24, '+91-963258741'),
        createData(2462,'Patient 04', '19 Jan, 2023', 2, 3, 67, '+91-963258741'),
        createData(2462,'Patient 05', '19 Jan, 2023', 2, 4, 49, '+91-963258741'),
      ];



    return (
        <>

               <div className='container-fluid'>
                        <div className='row pb-3'>
                                        <div className="accordion">
                                                <div className="accordion-item">
                                                <div
                                                        className="accordion-title"
                                                        onClick={() => setIsUpcomingActive(!isUpcomingActive)}
                                                >
                                                <div className='row'>
                                                        <div className='col'>Upcoming Sessions</div>
                                                <div className='col text-end'>{isUpcomingActive ? <BsChevronDown/> :<BsChevronUp/>}</div></div>
                                                </div>
                                                        {isUpcomingActive && <div className="accordion-content"><Upcomingsession /></div>}
                                                </div>
                                        </div>
                        </div>
                        <div className='row pb-3'>
                                        <div className="accordion">
                                                <div className="accordion-item">
                                                <div
                                                        className="accordion-title"
                                                        onClick={() => setIsPastActive(!isPastActive)}
                                                >
                                                <div className='row'>
                                                        <div className='col'>Past Sessions</div>
                                                <div className='col text-end'>{isPastActive ? <BsChevronDown/> :<BsChevronUp/>}</div></div>
                                                </div>
                                                        {isPastActive && <div className="accordion-content"><Pastsessions /></div>}
                                                </div>
                                        </div>
                        </div>
               </div>
        
        </>
    );
}


export default Patientsession;