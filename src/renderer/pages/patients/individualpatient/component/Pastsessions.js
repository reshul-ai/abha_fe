import react,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import SessionBci from './SessionBci';
import PastSessionGraph from './PastSessionGraph';

import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Pastsessions=()=>{

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
      
      function createData(session_id, mi_accuracy, date, start_time, end_time, duration) {
        return { session_id, mi_accuracy, date, start_time, end_time, duration };
      }
      
      const rows = [
        createData('SES112','--', '14 Jan 2023','4:00 PM', '2:30 PM',  '60 Mins'),
        createData('SES111','--', '14 Jan 2023','2:30 PM', '2:30 PM',  '45 Mins'),
        createData('SES096','--', '14 Jan 2023','5:00 PM', '2:30 PM',  '60 Mins'),
       
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
                                                                <StyledTableCell align="left">MI Accuracy</StyledTableCell>
                                                                <StyledTableCell align="left">Date</StyledTableCell>
                                                                <StyledTableCell align="left">Start Time</StyledTableCell>
                                                                <StyledTableCell align="left">End Time</StyledTableCell>
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
                                                                        <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.mi_accuracy}</StyledTableCell>
                                                                        
                                                                        <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.date}</StyledTableCell>
                                                                        <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.start_time}</StyledTableCell>
                                                                        <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.end_time}</StyledTableCell>
                                                                        <StyledTableCell align="left" onClick={handleBciShow} style={{ "cursor": "pointer" }}>{row.duration}</StyledTableCell>
                                                                        
                                                                </StyledTableRow>
                                                                ))}
                                                                </TableBody>
                                                        </Table>
                                                        </TableContainer>
                                        </div>
                                </div>  


                                <div className='row'>
                                                        <div>
                                                                <Modal size="lg" show={showBci} onHide={handleBciClose}>
                                                                        <Modal.Header closeButton style={{'border-color':'#FFFFFF'}}>
                                                                        <Modal.Title><h5 className='ps-3 pt-3'>Session - <span style={{"color":"grey"}}>SES112</span></h5></Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body><div >
                                                                        <div className='row pb-2 px-3'>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='col text-center'>Session ID</div></div>
                                                                <div className='row Assessments-labelValue'><div className='col text-center'>SES112</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>Patient</div></div>
                                                                <div className='row Assessments-labelValue'><Link to={`/individualpatients/1241`}><div className='text-center'>Patient 01</div></Link></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>Date</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>12 Jan 2023</div></div>
                                                        </div>
                                                        
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>Start Time</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>4:00 PM</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>Duration</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>60 mins</div></div>
                                                        </div>
                                                        <div className='col Assessments-label border-left'>
                                                                <div className='row'><div className='text-center'>Session MIA</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>50%</div></div>
                                                        </div>
                                                </div>  
                                                <div className='row pt-4 pb-2 m-2' style={{"backgroundColor":"#FAFAFA", "borderRadius":"16px"}}>
                                                        <div className='col'>
                                                                        <div className='row'>
                                                                                <div className='col'>
                                                                                        <h6>MI Accuracy vs Trials</h6>        
                                                                                </div>
                                                                                <div className='col-1'></div>
                                                                                <div className='col'></div>
                                                                                        <div className='col text-center' style={{"border":"1px solid grey","borderRadius":"8px","backgroundColor":"white"}}>
                                                                                                Paradigm 1  
                                                                                </div>
                                                                        </div>              
                                                                <PastSessionGraph /> 
                                                        </div>
                                                </div>
                                                 <div className='row pt-3 pb-2 px-3'>
                                                        <div className='col Assessments-label' >
                                                                Paradigm ran in this session:
                                                                
                                                        </div></div>
                                                                        </div>
                                                                                        <div>
                                                                                                {/* <SessionBci /> */}
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
                                                </div> 
                                
                        </div>
);
};
export default Pastsessions;