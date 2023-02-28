import React from "react";
import { FaAlignJustify, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from "react-router-dom";

const Patienttable = () =>{
  const navigate = useNavigate();
    const callindivisualPt=(input)=>{
      navigate('/individualpatients/'+input);
     
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#eaeaeb',
          color: 'black',
          fontWeight:'bold'
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          
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
        createData(1241,'Patient 01', '19 Jan, 2023', 2, 1, 24, '+91 963258741'),
        createData(1242,'Patient 02', '19 Jan, 2023', 2, 1, 37, '+91 963258741'),
        createData(1243,'Patient 03', '19 Jan, 2023', 2, 8, 24, '+91 963258741'),
        createData(1244,'Patient 04', '19 Jan, 2023', 2, 3, 67, '+91 963258741'),
        createData(1245,'Patient 05', '19 Jan, 2023', 2, 4, 49, '+91 963258741'),
      ];


    return (
        <>

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
                                                {
                                                    rows.map((row) => (
                                                        

                                                            <StyledTableRow key={row.name}>


                                                                {/* <StyledTableCell component="th" scope="row">
                                                                    {row.name}
                                                                </StyledTableCell> */}
                                                                <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.patient_id}`)} style={{"cursor": "pointer"}}>{row.patient_id}</StyledTableCell>
                                                                <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.patient_id}`)} style={{"cursor": "pointer"}}>{row.patient_name}</StyledTableCell>
                                                                <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.patient_id}`)} style={{"cursor": "pointer"}}>{row.date_started}</StyledTableCell>
                                                                <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.patient_id}`)} style={{"cursor": "pointer"}}>{row.age}</StyledTableCell>
                                                                <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.patient_id}`)} style={{"cursor": "pointer"}}>{row.sessions}</StyledTableCell>
                                                                <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.patient_id}`)} style={{"cursor": "pointer"}}>{row.mi_accuracy}</StyledTableCell>
                                                                <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.patient_id}`)} style={{"cursor": "pointer"}}>{row.contact_number}</StyledTableCell>

                                                               
                                                            </StyledTableRow>

                                                        
                                                    ))
                                                }
                                                </TableBody>
                                            </Table>
                                    </TableContainer>

        </>
    )
}


export default Patienttable;