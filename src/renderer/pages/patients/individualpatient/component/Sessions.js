import react from 'react';

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


const Patientsession = () => {

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
                        {/* <div className='row'>
                                <div className='col'>
                                        <h1>Welcome to Sessions Page</h1>
                                </div>
                        </div> */}
                        <div className='row pb-3'>
                                <div className='col'>
                                    <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="left">Patient ID</StyledTableCell>
                                                    <StyledTableCell align="left">Patient Name</StyledTableCell>
                                                    <StyledTableCell align="left">Date Started</StyledTableCell>
                                                    <StyledTableCell align="left">Age</StyledTableCell>
                                                    <StyledTableCell align="left">Sessions</StyledTableCell>
                                                    <StyledTableCell align="left">MI Accuracy</StyledTableCell>
                                                    <StyledTableCell align="left">Contact Number</StyledTableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rows.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                            {/* <StyledTableCell component="th" scope="row">
                                                                {row.name}
                                                            </StyledTableCell> */}
                                                            <StyledTableCell align="left">{row.patient_id}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.patient_name}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.date_started}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.age}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.sessions}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.mi_accuracy}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.contact_number}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                </div>
                        </div>
                        <div className='row pt-3'>
                                <div className='col'>
                                    <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="left">Patient ID</StyledTableCell>
                                                    <StyledTableCell align="left">Patient Name</StyledTableCell>
                                                    <StyledTableCell align="left">Date Started</StyledTableCell>
                                                    <StyledTableCell align="left">Age</StyledTableCell>
                                                    <StyledTableCell align="left">Sessions</StyledTableCell>
                                                    <StyledTableCell align="left">MI Accuracy</StyledTableCell>
                                                    <StyledTableCell align="left">Contact Number</StyledTableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rows.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                            {/* <StyledTableCell component="th" scope="row">
                                                                {row.name}
                                                            </StyledTableCell> */}
                                                            <StyledTableCell align="left">{row.patient_id}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.patient_name}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.date_started}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.age}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.sessions}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.mi_accuracy}</StyledTableCell>
                                                            <StyledTableCell align="left">{row.contact_number}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                </div>
                        </div>
               </div>
        
        </>
    );
}


export default Patientsession;