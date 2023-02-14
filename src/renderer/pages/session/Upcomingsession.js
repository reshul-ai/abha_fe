import react,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SessionBci from './SessionBci';

import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Upcomingsession=()=>{
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
      
      function createData(session_id, patient_name,mi_accuracy, date, start_time, duration) {
        return { session_id, patient_name, mi_accuracy,date, start_time, duration };
      }
      
      const rows = [
        createData('SES112','Patient 01', '70%','19 Jan, 2023', '4:00 PM',  '60 Mins'),
        createData('SES111','Patient 02', '70%','13 Jan, 2023', '2:30 PM',  '45 Mins'),
        createData('SES096','Patient 03', '70%','12 Jan, 2023', '5:00 PM',  '60 Mins'),
       
      ];
      const [showBci, setShowBci] = useState(false);
      const handleBciClose = () => setShowBci(false);
      const handleBciShow = () => setShowBci(true);

      const [SessionDtl, setSessionDtl] = useState('');

    
return(
   
  <div className='container-fluid'>
  <div className='row '>
<div className='col' style={{'padding-left':'0%','padding-right':'0%'}}>
                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                              
                                                <TableRow>
                                                
                                                    <StyledTableCell>Session ID</StyledTableCell>
                                                    <StyledTableCell align="left">Patient</StyledTableCell>
                                                    <StyledTableCell align="left">MI Accuracy</StyledTableCell>
                                                    <StyledTableCell align="left">Date</StyledTableCell>
                                                    <StyledTableCell align="left">Start Time</StyledTableCell>
                                                    <StyledTableCell align="left">Duration</StyledTableCell>
                                                    
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rows.map((row) => (
                                                    <StyledTableRow key={row.name}>
                                                            {/* <StyledTableCell component="th" scope="row">
                                                                {row.name}
                                                            </StyledTableCell> */}
                                                            <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.session_id}</StyledTableCell>
                                                            <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.patient_name}</StyledTableCell>
                                                            <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.mi_accuracy}</StyledTableCell>
                                                            <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.date}</StyledTableCell>
                                                            <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.start_time}</StyledTableCell>
                                                           
                                                            <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.duration}</StyledTableCell>
                                                           
                                                    </StyledTableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                    </TableContainer>
                                    </div>
                                    </div>  <div className='row'>
                                                        <div>
                                                                <Modal size="lg" show={showBci} onHide={handleBciClose}>
                                                                        <Modal.Header closeButton style={{'border-color':'#FFFFFF'}}>
                                                                        <Modal.Title>Upcoming Session-SES112</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body><div >
                                                                        <div className='row pt-3 pb-2 px-3'>
                                                        <div className='col Assessments-label' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row'><div className='col'>Session ID</div></div>
                                                                <div className='row Assessments-labelValue'><div className='col'>SES112</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3'>Patient</div>
                                                                <div className='row Assessments-labelValue ps-3'><Link style={{'padding-left':'0%'}} to={`/individualpatients/1241`}>Patient 01</Link></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3'>Start Time</div>
                                                                <div className='row Assessments-labelValue ps-3'>4:00 PM</div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3'>Duration</div>
                                                                <div className='row Assessments-labelValue ps-3'>60 mins</div>
                                                        </div>
                                                        <div className='col Assessments-label border-left'>
                                                                <div className='row ps-3'>MI Accuracy</div>
                                                                <div className='row Assessments-labelValue ps-3'>--</div>
                                                        </div>
                                                </div>   <div className='row pt-3 pb-2 px-3'>
                                                        <div className='col Assessments-label' >
                                                                <div className='row'><div className='col'>Choose and run a Paradigm:</div></div>
                                                                
                                                        </div></div>
                                                                        </div>
                                                                                        <div>
                                                                                                <SessionBci />
                                                                                        </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                       {/*  <Button variant="secondary" onClick={handleBciClose}>
                                                                                Close
                                                                        </Button>
                                                                        <Button variant="primary" onClick={handleCCShow}>
                                                                                Save Changes
                                                                        </Button> */}
                                                                        </Modal.Footer>
                                                                </Modal>
                                                        </div>
                                                </div> </div>
);
};
export default Upcomingsession;