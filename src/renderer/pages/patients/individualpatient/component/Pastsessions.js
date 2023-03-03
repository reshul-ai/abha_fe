import react,{useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PastSessionBci from './PastSessionBci';
import PastSessionGraph from './PastSessionGraph';

import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { duration } from 'moment';

const Pastsessions=({patientData,sessionData})=>{

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
      
//       function createData(session_id, mi_accuracy, date, start_time, end_time, duration) {
//         return { session_id, mi_accuracy, date, start_time, end_time, duration };
//       }
      
//       const rows = [
//         createData('SES112','--', '14 Jan 2023','4:00 PM', '2:30 PM',  '60 Mins'),
//         createData('SES111','--', '14 Jan 2023','2:30 PM', '2:30 PM',  '45 Mins'),
//         createData('SES096','--', '14 Jan 2023','5:00 PM', '2:30 PM',  '60 Mins'),
       
//       ];
        const [currSession, setCurrSession] = useState({});
      const [showBci, setShowBci] = useState(false);
      const handleBciClose = () => setShowBci(false);
      const handleBciShow = (id) => {
        setCurrSession(pastSessionData.items.find((session) => session.id === id));
        setShowBci(true);
};

      const [SessionDtl, setSessionDtl] = useState('');

      // to get curr date on yyy-mm-dd format
      function getCurDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        
        let sdd = "";
        let smm = "";
        sdd = (dd < 10) ? '0' + dd : dd.toString();
        smm = (mm < 10) ? '0' + mm : mm.toString();

        return (yyyy + '-' + smm + '-' + sdd);
      }

      const [pastSessionData, setPastSessionData] = useState({items:[]});
      const getPastSessions = (() => {
              const today = getCurDate();

              const pastSessions = sessionData.items.filter((session) => {
              if (session.date > today) return false; // Select sessions that have already occurred
              const aDateTime = new Date(`${session.date} ${session.endTime}`);
              const bDateTime = new Date();

              if (aDateTime < bDateTime) {
                      return 1; // Return true if the session has already ended
              } else {
                      return 0;
              }
              });
              console.log(pastSessions);
              setPastSessionData({items : pastSessions});
      });

      useEffect(() => {
        if (window.require && window.require("electron")){
                getPastSessions();
        }
}, []);
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
                                                                {pastSessionData.items.map((row) => (
                                                                <StyledTableRow key={row.id}>
                                                                        {/* <StyledTableCell component="th" scope="row">
                                                                                {row.name}
                                                                        </StyledTableCell> */}
                                                                        <StyledTableCell align="left" onClick={() => handleBciShow(row.id)} style={{ "cursor": "pointer" }}>{row.id}</StyledTableCell>
                                                                        <StyledTableCell align="left" onClick={() => handleBciShow(row.id)} style={{ "cursor": "pointer" }}>{'--'}</StyledTableCell>
                                                                        
                                                                        <StyledTableCell align="left" onClick={() => handleBciShow(row.id)} style={{ "cursor": "pointer" }}>{row.date}</StyledTableCell>
                                                                        <StyledTableCell align="left" onClick={() => handleBciShow(row.id)} style={{ "cursor": "pointer" }}>{row.startTime}</StyledTableCell>
                                                                        <StyledTableCell align="left" onClick={() => handleBciShow(row.id)} style={{ "cursor": "pointer" }}>{row.endTime}</StyledTableCell>
                                                                        <StyledTableCell align="left" onClick={() => handleBciShow(row.id)} style={{ "cursor": "pointer" }}>{row.duration}</StyledTableCell>                                                                        
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
                                                                        <Modal.Title><h5 className='ps-3 pt-3'>Session - <span style={{"color":"grey"}}>{currSession.id}</span></h5></Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body><div >
                                                                        <div className='row pb-2 px-3'>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='col text-center'>Session ID</div></div>
                                                                <div className='row Assessments-labelValue'><div className='col text-center'>{currSession.id}</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>Patient</div></div>
                                                                <div className='row Assessments-labelValue'><Link to={`/individualpatients/${patientData.id}`}><div className='text-center'>{patientData.name}</div></Link></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>Date</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>{currSession.date}</div></div>
                                                        </div>
                                                        
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>Start Time</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>{currSession.startTime}</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>End Time</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>{currSession.endTime}</div></div>
                                                        </div>
                                                        <div className='col Assessments-label border-left'>
                                                                <div className='row'><div className='text-center'>Duration</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>{currSession.duration}</div></div>
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
                                                                                                <PastSessionBci />
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