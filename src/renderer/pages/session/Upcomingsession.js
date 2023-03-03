import react,{useState, useEffect} from 'react';
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

        const [upcomingSessionList, setUpcomingSessionList] = useState({items:[]});
        const [patientData, setPatientData] =  useState({items:[]});
        const [listUpdated, setListUpdated] =  useState(true);

        const getUpcomingSessions = (() => {
                window.require("electron").ipcRenderer.send("getUpcomingSessions",{});
    
                window.require("electron").ipcRenderer.on("getUpcomingSessions", (e,data) => {
                        //console.log(data.items);
                        setUpcomingSessionList(data);
                        setListUpdated(false);
                        setTimeout(() => {
                                setListUpdated(true);
                        }, 400);
                });
                window.require("electron").ipcRenderer.send("getAllPatient",{});
    
                window.require("electron").ipcRenderer.on("getAllPatient", (e,data) => {
                        //console.log(data.items);
                        setPatientData(data);
                });
        });

        const [paradigms, setParadigms] = useState({});

        const getParadigms = (() => {
                window.require("electron").ipcRenderer.send("getParadigms",{});

                window.require("electron").ipcRenderer.on("getParadigms", (e,data) => {
                        console.log(data);
                        setParadigms(data);
                });
        });

        useEffect(() => {
                if (window.require && window.require("electron")){
                        getUpcomingSessions();
                        getParadigms();
                }
        }, []);

        // function createData(session_id, patient_name,mi_accuracy, date, start_time, duration) {
        //         return { session_id, patient_name, mi_accuracy,date, start_time, duration };
        // }

        // const rows = [
        //         createData('SES112','Patient 01', '70%','19 Jan, 2023', '4:00 PM',  '60 Mins'),
        //         createData('SES111','Patient 02', '70%','13 Jan, 2023', '2:30 PM',  '45 Mins'),
        //         createData('SES096','Patient 03', '70%','12 Jan, 2023', '5:00 PM',  '60 Mins'),

        // ];

        const [currSession, setCurrSession] = useState({});

        const [showBci, setShowBci] = useState(false);
        const handleBciClose = () => {
                getUpcomingSessions();
                setShowBci(false);
        };
        const handleBciShow = (id) => {
                setCurrSession(upcomingSessionList.items.find((session) => session.id === id));
                setShowBci(true);
        };

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
                                <StyledTableCell align="left">Date</StyledTableCell>
                                <StyledTableCell align="left">Start Time</StyledTableCell>
                                <StyledTableCell align="left">End Time</StyledTableCell>
                                <StyledTableCell align="left">Duration</StyledTableCell>
                                
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {upcomingSessionList.items.map((row) => (
                                <StyledTableRow key={row.id}>
                                        {/* <StyledTableCell component="th" scope="row">
                                                {row.name}
                                        </StyledTableCell> */}
                                        <StyledTableCell align="left" onClick={() => handleBciShow(row.id)} style={{ "cursor": "pointer" }}>{row.id}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => handleBciShow(row.id)} style={{ "cursor": "pointer" }}>{patientData.items.find((item) => item.id === row.patientId)?.name}</StyledTableCell>
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
                                        <Modal.Title><h5 className='pt-2 ps-2'>Upcoming Session - <span style={{"color":"grey"}}>{currSession.id}</span></h5></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body><div >
                                        <div className='row pb-2 px-3'>
                                        <div className='col text-center Assessments-label' style={{"borderRight": "1px solid silver"}}>
                                                <div className='row'><div className='col'>Session ID</div></div>
                                                <div className='row Assessments-labelValue'><div className='col'>{currSession.id}</div></div>
                                        </div>
                                        <div className='col text-center Assessments-label' style={{"borderRight": "1px solid silver"}}>
                                                <div className='row' ><div className='col'>Patient</div></div>
                                                <div className='row Assessments-labelValue'><Link to={`/individualpatients/${currSession.PatientId}`}><div className='col text-center'>{patientData.items.find((item) => item.id === currSession.patientId)?.name}</div></Link></div>
                                        </div>
                                        <div className='col text-center Assessments-label' style={{"borderRight": "1px solid silver"}}>
                                                <div className='row' ><div className='col'>Date</div></div>
                                                <div className='row Assessments-labelValue'><div className='col text-center'>{currSession.date}</div></div>
                                        </div>
                                        <div className='col text-center Assessments-label' style={{"borderRight": "1px solid silver"}}>
                                                <div className='row'><div className='text-center'>Start Time</div></div>
                                                <div className='row Assessments-labelValue'><div className='text-center'>{currSession.startTime}</div></div>
                                        </div>
                                        
                                        <div className='col text-center Assessments-label' style={{"borderRight": "1px solid silver"}}>
                                                <div className='row'><div className='text-center'><div className='text-center'>End Time</div></div></div>
                                                <div className='row Assessments-labelValue'><div className='text-center'>{currSession.endTime}</div></div>
                                        </div>
                                        <div className='col text-center Assessments-label border-left'>
                                                <div className='row'><div className='text-center'>Duration</div></div>
                                                <div className='row Assessments-labelValue'><div className='text-center'>{currSession.duration}</div></div>
                                        </div>
                                        </div>   <div className='row pt-3 pb-2 px-3'>
                                        <div className='col Assessments-label' >
                                                <div className='row'><div className='col'>Choose and run a Paradigm:</div></div>
                                                
                                        </div></div>
                                        </div>
                                                        <div>
                                                                <SessionBci currSession={currSession} paradigms={paradigms} handleBciClose={handleBciClose}/>
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