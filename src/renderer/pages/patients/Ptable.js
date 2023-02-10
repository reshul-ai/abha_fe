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


const Patienttable = () =>{
    

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
          backgroundColor: theme.palette.action.hover,
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
        createData(1241,'Patient 01', '19 Jan, 2023', 2, 1, 24, '+91-963258741'),
        createData(1242,'Patient 02', '19 Jan, 2023', 2, 1, 37, '+91-963258741'),
        createData(1243,'Patient 03', '19 Jan, 2023', 2, 8, 24, '+91-963258741'),
        createData(1244,'Patient 04', '19 Jan, 2023', 2, 3, 67, '+91-963258741'),
        createData(1245,'Patient 05', '19 Jan, 2023', 2, 4, 49, '+91-963258741'),
      ];


    return (
        <>

                                    <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="right">Patient ID</StyledTableCell>
                                                    <StyledTableCell align="right">Patient Name</StyledTableCell>
                                                    <StyledTableCell align="right">Date Started</StyledTableCell>
                                                    <StyledTableCell align="right">Age</StyledTableCell>
                                                    <StyledTableCell align="right">Sessions</StyledTableCell>
                                                    <StyledTableCell align="right">MI Accuracy</StyledTableCell>
                                                    <StyledTableCell align="right">Contact Number</StyledTableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {
                                                    rows.map((row) => (
                                                        

                                                            <StyledTableRow key={row.name}>


                                                                {/* <StyledTableCell component="th" scope="row">
                                                                    {row.name}
                                                                </StyledTableCell> */}
                                                                <StyledTableCell align="right"><Link to={`/individualpatients/${row.patient_id}`} style={{"color":"black","textDecoration":"none"}}>{row.patient_id} </Link></StyledTableCell>
                                                                <StyledTableCell align="right"><Link to={`/individualpatients/${row.patient_id}`} style={{"color":"black","textDecoration":"none"}}>{row.patient_name}</Link></StyledTableCell>
                                                                <StyledTableCell align="right"><Link to={`/individualpatients/${row.patient_id}`} style={{"color":"black","textDecoration":"none"}}>{row.date_started}</Link></StyledTableCell>
                                                                <StyledTableCell align="right"><Link to={`/individualpatients/${row.patient_id}`} style={{"color":"black","textDecoration":"none"}}>{row.age}</Link></StyledTableCell>
                                                                <StyledTableCell align="right"><Link to={`/individualpatients/${row.patient_id}`} style={{"color":"black","textDecoration":"none"}}>{row.sessions}</Link></StyledTableCell>
                                                                <StyledTableCell align="right"><Link to={`/individualpatients/${row.patient_id}`} style={{"color":"black","textDecoration":"none"}}>{row.mi_accuracy}</Link></StyledTableCell>
                                                                <StyledTableCell align="right"><Link to={`/individualpatients/${row.patient_id}`} style={{"color":"black","textDecoration":"none"}}>{row.contact_number}</Link></StyledTableCell>

                                                               
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