import react,{useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SessionBci from './PastSessionBci';
import PastSessionGraph from './PastSessionGraph';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Pastsession=({paradigms})=>{
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
        
        const [pastSessionList, setPastSessionList] = useState({items:[]});
        const [patientData, setPatientData] =  useState({items:[]});
        const [sessionResult, setSessionResult] =  useState({items:[]});
        
        const getPastSessions = (() => {
                window.require("electron").ipcRenderer.send("getPastSessions",{});
    
                window.require("electron").ipcRenderer.on("getPastSessions", (e,data) => {
                        //console.log(data.items);
                        setPastSessionList(data);
                });
                window.require("electron").ipcRenderer.send("getAllPatient",{});
    
                window.require("electron").ipcRenderer.on("getAllPatient", (e,data) => {
                        //console.log(data.items);
                        setPatientData(data);
                });
        });

        const getSessionResultData = (() => {
                window.require("electron").ipcRenderer.send("getSessionResultData",{});
                window.require("electron").ipcRenderer.on("getSessionResultData", (e,data) => {
                        console.log(data);
                        setSessionResult(data);
                });
        })

        useEffect(() => {
                if (window.require && window.require("electron")){
                        getPastSessions();
                        getSessionResultData();
                }
        }, [])

      function createData(session_id, patient_name,mi_accuracy, date, paradigm_ran,start_time, duration) {
        return { session_id, patient_name, mi_accuracy,date,paradigm_ran, start_time, duration };
      }
      
      const rows = [
        createData('SES112','Patient 01', '70%','19 Jan, 2023','2', '4:00 PM',  '60 Mins'),
        createData('SES111','Patient 02', '70%','13 Jan, 2023', '3','2:30 PM',  '45 Mins'),
        createData('SES096','Patient 03', '70%','12 Jan, 2023','5', '5:00 PM',  '60 Mins'),
       
      ];
//       getSessionResultData
      const [currSessionResult, setCurrSessionResult] = useState({});
      const [currSession, setCurrSession] = useState({});
      const [currSessionparadigms, setCurrSessionparadigms] = useState({});
      const [paradigmNumberId, setParadigmNumberId] = useState('P1');
      const [curSessionparadigmResult, setCurSessionparadigmResult] = useState([]);
//       curSessionparadigmResult
      const filterparadigms = ((paradigmsList) => {
        console.log(paradigmsList);
        // console.log(paradigms);
        const results = paradigms?.items?.filter(item => paradigmsList?.includes(item.id));
        console.log(results);
        setCurrSessionparadigms(results);
      });

      const [showBci, setShowBci] = useState(false);
      const handleBciClose = () => setShowBci(false);
      const handleBciShow = (row) => {
        setCurrSession(row);
        // 
        if (window.require && window.require("electron")){
                window.require("electron").ipcRenderer.send("getSessionResultById",row.id);
                window.require("electron").ipcRenderer.on("getSessionResultById", (e,data) => {
                        console.log(data);
                        setCurrSessionResult(data);
                        setCurSessionparadigmResult(data?.paradigms[0]['results']);
                        setParadigmNumberId(data?.paradigms[0].id);
                        const paradigmsList = data?.paradigms?.map(paradigm => paradigm.id); //list the paradigms from result
                        // console.log(paradigmsList.length);
                        if (typeof paradigmsList !== undefined)
                                filterparadigms(paradigmsList);
                });
        }
        // setCurrSession(pastSessionList.items.find((session) => session.id === row.id));
        setTimeout(() => {
                
                setShowBci(true);
        }, 500);
        };
  

  function handleChildClick(id,index) {
        setParadigmNumberId(id);
        // setIndex(index);
        console.log(id, index,currSessionResult['paradigms'][index]['results']);
        setCurSessionparadigmResult(currSessionResult['paradigms'][index]['results']);
  }

return(
  <div className='container-fluid'>
  <div className='row '>
<div className='col m-0 p-0'>
                  <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                              
                                                <TableRow>
                                                <StyledTableCell>Session ID</StyledTableCell>
                                                    <StyledTableCell align="left">Patient</StyledTableCell>
                                                    <StyledTableCell align="left">MI Accuracy</StyledTableCell>
                                                    <StyledTableCell align="left">Date</StyledTableCell>
                                                    {/* <StyledTableCell align="left">Paradigm Ran</StyledTableCell> */}
                                                    <StyledTableCell align="left">Start Time</StyledTableCell>
                                                    <StyledTableCell align="left">Duration</StyledTableCell>
                                                    
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {pastSessionList.items.map((row) => (
                                                    <StyledTableRow key={row.id}>
                                                            {/* <StyledTableCell component="th" scope="row">
                                                                {row.name}
                                                            </StyledTableCell> */}
                                                            <StyledTableCell align="left" onClick={() => handleBciShow(row)} style={{ "cursor": "pointer" }}>{row.id}</StyledTableCell>
                                                            <StyledTableCell align="left" onClick={() => handleBciShow(row)} style={{ "cursor": "pointer" }}>{patientData.items.find((item) => item.id === row.patientId)?.name}</StyledTableCell>
                                                            <StyledTableCell align="left" onClick={() => handleBciShow(row)} style={{ "cursor": "pointer" }}>{sessionResult.items.find((item) => item.sessionId === row.id)?.MIA ? `${sessionResult.items.find((item) => item.sessionId === row.id)?.MIA}%` : '--'}</StyledTableCell>
                                                            <StyledTableCell align="left" onClick={() => handleBciShow(row)} style={{ "cursor": "pointer" }}>{row.date}</StyledTableCell>
                                                            {/* <StyledTableCell align="left" onClick={() => handleBciShow(row.id)}} style={{ "cursor": "pointer" }}>{row.paradigm_ran}</StyledTableCell> */}
                                                            <StyledTableCell align="left" onClick={() => handleBciShow(row)} style={{ "cursor": "pointer" }}>{row.startTime}</StyledTableCell>
                                                            <StyledTableCell align="left" onClick={() => handleBciShow(row)} style={{ "cursor": "pointer" }}>{row.duration}</StyledTableCell>
                                                           
                                                    </StyledTableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                    </TableContainer> </div> 
                                    </div>  <div className='row'>
                                                        <div>
                                                                <Modal size="lg" show={showBci} onHide={handleBciClose}>
                                                                        <Modal.Header closeButton style={{'border-color':'#FFFFFF'}}>
                                                                        <Modal.Title><h5 className='ps-3 pt-3'>Session - <span style={{"color":"grey"}}>{currSession.id}</span></h5></Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body><div >
                                                                        <div className='row pb-2 px-3'>
                                                        
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='col text-center'>Patient</div></div>
                                                                <div className='row Assessments-labelValue'><Link to={`/individualpatients/${currSession.patientId}`}><div className='text-center'>{patientData.items.find((item) => item.id === currSession.patientId)?.name}</div></Link></div>
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
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #CACACE"}}>
                                                                <div className='row'><div className='text-center'>Duration</div></div>
                                                                <div className='row Assessments-labelValue'><div className='col text-center'>{currSession.duration}</div></div>
                                                        </div>
                                                        <div className='col Assessments-label border-left'>
                                                                <div className='row'><div className='text-center'>Session MIA</div></div>
                                                                <div className='row Assessments-labelValue'><div className='text-center'>{currSessionResult?.MIA ? `${currSessionResult?.MIA}%` : "N/A"}</div></div>
                                                        </div>
                                                </div>  
                                                <div className='row pt-4 pb-2 m-2' style={{"backgroundColor":"#FAFAFA", "borderRadius":"16px"}}>
                                                        <div className='col'>
                                                                        <div className='row'>
                                                                                <div className='col'>
                                                                                        <h6>MI Accuracy vs Trials</h6>        
                                                                                </div>
                                                                                <div className='col-1'></div>
                                                                                {/* <div className='col'></div> */}
                                                                                        {/* <div className='col text-center' style={{"border":"1px solid grey","borderRadius":"8px","backgroundColor":"white"}}> */}
                                                                                        <div className='col text-end'>
                                                                                                {paradigmNumberId && paradigms.items.find((item) => item.id === paradigmNumberId)?.name}
                                                                                        </div>
                                                                        </div>              
                                                                <PastSessionGraph curSessionparadigmResult={curSessionparadigmResult}/>
                                                        </div>
                                                </div>
                                                 <div className='row pt-3 pb-2 px-3'>
                                                        <div className='col Assessments-label' >
                                                                Paradigm ran in this session:
                                                                
                                                        </div></div>
                                                                        </div>
                                                                                        <div>
                                                                                                <SessionBci onChildClick={handleChildClick} paradigms={paradigms} currSessionResult={currSessionResult}/>
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
export default Pastsession;