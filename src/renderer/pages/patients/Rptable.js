import React, {useState, useEffect} from "react";
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


const Rpatienttable = () =>{
  const navigate = useNavigate();
  const callindivisualPt=(input)=>{
    navigate('/individualpatients/'+input);
  }

  const [isElectron,setIsElectron] = useState(false);
  const [patientData, setPatientData] = useState({items:[]});
  const [sessionData, setSessionData] = useState({items:[]});
  const [sessionResultsData, setSessionResultsData] = useState({items:[]});
  const [patientsAvgMIA, setPatientsAvgMIA] = useState({});

  const getPatientsData = () => {
      //console.log("called");
      window.require("electron").ipcRenderer.send("getRecoveredPatientData",{});

      window.require("electron").ipcRenderer.on("getRecoveredPatientData", (e,data) => {
          console.log(data);
          setPatientData(data);
      });
  }

  const getSessionsData = (() => {
    window.require("electron").ipcRenderer.send("getSessionData",{});

    window.require("electron").ipcRenderer.on("getSessionData", (e,data) => {
            //console.log(data.items);
            setSessionData(data);
    });
  });

  const getSessionResultsData = (() => {
    window.require("electron").ipcRenderer.send("getSessionResultData",{});

    window.require("electron").ipcRenderer.on("getSessionResultData", (e,data) => {
            console.log(data.items);
            setSessionResultsData(data);

            const patients = {};
            for (let i = 0; i < data?.items?.length; i++) {
              console.log("in loop");
              const session = data?.items[i];
              if (!session.MIA) {
                continue;
              }
              if (!patients[session.patientId]) {
                patients[session.patientId] = { totalMIA: 0, sessionCount: 0 };
              }
              patients[session.patientId].totalMIA += session.MIA;
              patients[session.patientId].sessionCount++;
            }

            const patientMIA = {};
            for (let [patientId, { totalMIA, sessionCount }] of Object.entries(patients)) {
              const avgMIA = Math.floor(totalMIA / sessionCount);
              patientMIA[patientId] = avgMIA;
            }

            setPatientsAvgMIA(patientMIA);
            });
  });

  useEffect(() => {
      if (window.require && window.require("electron")){
          setIsElectron(isElectron => !isElectron);
          getPatientsData();
          getSessionsData();
          getSessionResultsData();
      }   
  },[]);

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
        createData(2462,'Patient 01', '19 Jan, 2023', 2, 1, 24, '+91-963258741'),
        createData(2463,'Patient 02', '19 Jan, 2023', 2, 1, 37, '+91-963258741'),
        createData(2464,'Patient 03', '19 Jan, 2023', 2, 8, 24, '+91-963258741'),
        createData(2465,'Patient 04', '19 Jan, 2023', 2, 3, 67, '+91-963258741'),
        createData(2466,'Patient 05', '19 Jan, 2023', 2, 4, 49, '+91-963258741'),
      ];

      function getFirstSessionOfPatient(patientId) {
        const patientSessions = sessionData.items.filter((session) => session.patientId === patientId);
        // console.log(`${patientId}: `,patientSessions);
        const sortedSessions = patientSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedSessions.length > 0 ? sortedSessions[0] : null;
      }

      const getLastAttendedSession = (patientId) => {
        let sessions = sessionData.items.filter((session) => session.patientId === patientId);
        let lastSession = null;
      
        sessions.forEach(session => {
          const sessionEndTime = new Date(`${session.date} ${session.endTime}`);
          const currentDate = new Date();
    
          if (sessionEndTime < currentDate && (!lastSession || sessionEndTime > new Date(`${lastSession.date} ${lastSession.endTime}`))) {
            lastSession = session;
          }
          
        });
      
        // console.log(lastSession);
        return lastSession;
      }

    return (
        <>

                                    <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                <TableRow>
                                                  <StyledTableCell align="left">Patient ID</StyledTableCell>
                                                  <StyledTableCell align="left">Patient Name</StyledTableCell>
                                                  <StyledTableCell align="left">Date Started</StyledTableCell>
                                                  <StyledTableCell align="left">Relieved On</StyledTableCell>
                                                  <StyledTableCell align="left">Age</StyledTableCell>
                                                  <StyledTableCell align="left">Sessions</StyledTableCell>
                                                  <StyledTableCell align="left">MI Accuracy</StyledTableCell>
                                                  <StyledTableCell align="left">Contact No.</StyledTableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {
                            patientData.items.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        {/* <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell> */}
                                        <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.id}`)} style={{"cursor": "pointer"}}>{row.id}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.id}`)} style={{"cursor": "pointer"}}>{row.name}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.id}`)} style={{"cursor": "pointer"}}>{getFirstSessionOfPatient(row.id)?.date || '--'}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.id}`)} style={{"cursor": "pointer"}}>{getLastAttendedSession(row.id)?.date || '--'}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.id}`)} style={{"cursor": "pointer"}}>{row.age}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.id}`)} style={{"cursor": "pointer"}}>{sessionData.items.filter((session) => session.patientId === row.id)?.length}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.id}`)} style={{"cursor": "pointer"}}>{patientsAvgMIA[`${row.id}`] ? `${patientsAvgMIA[`${row.id}`]}%` : '--'}</StyledTableCell>
                                        <StyledTableCell align="left" onClick={() => callindivisualPt(`${row.id}`)} style={{"cursor": "pointer"}}>{row.phoneNumber}</StyledTableCell> 
                                    </StyledTableRow>
                            ))
                        }
                                                </TableBody>
                                            </Table>
                                    </TableContainer>

        </>
    )
}


export default Rpatienttable;