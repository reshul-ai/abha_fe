import react,{useState} from 'react';
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
// import SessionHCQ from './SessionHcq';
import { Button, Modal } from "react-bootstrap";

const Bci = () => {

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
            backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
            border: 0,
            },
        }));
        
        function createData(paradigm_name, loops, duration, randomize, activities) {
            return { paradigm_name, loops, duration, randomize, activities };;
        }

        const rows = [
            createData('Right Hand Movement',2,2, 'No', 1),
            createData('Motor Imagery',2, 2, 'Yes', 2),
            createData('Left Knee Motor Imagery',2,2, 'No', 3),
            createData('Left Foot Movement',2,2, 'Yes', 3),
            createData('Right Knee Motor Imagery',2,2, 'No', 2),
            createData('Right Foot Movement',2,2, 'Yes', 1),
        ];


        const [showCC, setShowCC] = useState(false);
        const handleCCClose = () => setShowCC(false);
        const handleCCShow = () => setShowCC(true);


    return (
        <>
 

 <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="Left">Paradigm Name</StyledTableCell>
                            <StyledTableCell align="Left">Loops</StyledTableCell>
                            <StyledTableCell align="Left">Duration(sec.)</StyledTableCell>
                            <StyledTableCell align="Left">Randomize</StyledTableCell>
                            <StyledTableCell align="Left">Activities</StyledTableCell>
                            <StyledTableCell align="Left">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                                {/* <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell> */}
                                                
                                                <StyledTableCell align="Left"><input type="radio" />     {row.paradigm_name}</StyledTableCell>
                                                <StyledTableCell align="Left">{row.loops}</StyledTableCell>
                                                <StyledTableCell align="Left">{row.duration}</StyledTableCell>
                                                <StyledTableCell align="Left">{row.randomize}</StyledTableCell>
                                                <StyledTableCell align="Left">{row.activities}</StyledTableCell>
                                                <StyledTableCell align="Left"><button className='btn btn-primary' onClick={handleCCShow}>Start</button></StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                        </TableBody>
                    </Table>
            </TableContainer>


        </>
    );
}


export default Bci;