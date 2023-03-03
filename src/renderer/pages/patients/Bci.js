import react,{useState, useEffect} from 'react';
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
import SessionHcq from '../session/SessionHcq';
import { Button, Modal } from "react-bootstrap";

const Bci = ({handleBciClose, patientId}) => {
        console.log(patientId);
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
           /*  backgroundColor: theme.palette.action.hover, */
            },
            // hide last border
            '&:last-child td, &:last-child th': {
            border: 0,
            },
        }));
        
        function createData(paradigm_name, loops, duration, randomize, activities) {
            return { paradigm_name, loops, duration, randomize, activities };
        }

        const rows = [
            createData('Motor Imagery for Left Hand',2,2, 'No', 1),
            createData('Motor Imagery for Right Hand',2, 2, 'Yes', 2),
            createData('Motor Imagery for Both Hands',2,2, 'No', 3),
            createData('Repetitive Exercises',2,2, 'Yes', 3),
            
        ];


        const [showCC, setShowCC] = useState(false);
        const handleCCClose = () => {
            if (window.require && window.require("electron")) {
                window.require("electron").ipcRenderer.send("calibmain", `{"Status":"paradigm_stop"}`);
            }
            setShowCC(false);
        }
        const handleCCShow = (row) => {
            if(window && window.require("electron")){
                window.require("electron").ipcRenderer.send('contact_quality_check',`{"contact_quality_check":"start"}`);
                // window.require("electron").ipcRenderer.on("contact_quality", (e,data) => {
                //     // console.log(data);
                // });
            }
            setShowCC(true);
            setCurParadigmData(row);
            setCurParadigmId(row.id);
        }

        const handleReCCShow = (row) => {
            if(window && window.require("electron")){
                window.require("electron").ipcRenderer.send('contact_quality_check',`{"contact_quality_check":"start"}`);
                // window.require("electron").ipcRenderer.on("contact_quality", (e,data) => {
                //     // console.log(data);
                // });
            }
            setShowCC(true);
        }

        const [curParadigmId, setCurParadigmId] = useState('');
        const [curParadigmData,setCurParadigmData] = useState({});

        const [paradigms, setParadigms] = useState({items:[]});

        const getParadigms = (() => {
                window.require("electron").ipcRenderer.send("getParadigms",{});

                window.require("electron").ipcRenderer.on("getParadigms", (e,data) => {
                        console.log(data);
                        setParadigms(data);
                });
        });
        
        useEffect(() => {
                if (window.require && window.require("electron")){
                        getParadigms();
                }
        }, []);

        const [numberOfLoop, setNumberOfLoop] = useState(2);
        const [res, setRes] = useState();
        const handlePlotWindowShow = () => {
            if (window.require && window.require("electron")) {
                const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/plot_data`;
                console.log(`{"Status":"open","url":"${url}"}`);
                window.require("electron").ipcRenderer.send("plotWindow", `{"Status":"open","url":"${url}"}`);
            }
        };

        const handleParadigmWindow = () => {
            handleCCClose();
            setTimeout(() => {
                if (window.require && window.require("electron")) {
                    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/calibration/${curParadigmId}/${2}`;
                    window.require("electron").ipcRenderer.send("calibmain", `{"Status":"open","url":"${url}","paradigm":"${curParadigmId}","loop":"${2}"}`);
                }
            }, 300);
            if (window.require && window.require("electron")) {
                window.require("electron").ipcRenderer.on("childWindowClosed", (e,data) => {
                    setRes(data);
                });
            }
        };

        const handleModalsClose = (() => {
            handleSSClose();
            handleBciClose();
        });

        // modal control

        window.require("electron").ipcRenderer.on("childWindowClosed", (e,data) => {
            // console.log(data);
            handleShow();
        });

        const [show, setShow] = useState(false);
        const [showSS, setShowSS] = useState(false);

        const handleClose = () => {
            setShow(false);
            setShowSS(true);
        }
        const handleShow = () => setShow(true);

        const handleSSClose = () => setShow(false);
        const handleSSShow = () => setShow(true);

    return (
        <>

        <div className='container-fluid'>
            <div className='row'>
            <TableContainer component={Paper} style={{"padding":0}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead style={{"margin":0}}>
                        <TableRow>
                            <StyledTableCell align="Left">Paradigm Name</StyledTableCell>
                            <StyledTableCell align="Left">Randomize</StyledTableCell>
                            <StyledTableCell align="Left">Activities</StyledTableCell>
                            <StyledTableCell align="Left">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                                    {paradigms.items.map((row) => (
                                        <StyledTableRow key={row.id}>
                                                {/* <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell> */}
                                                
                                                <StyledTableCell align="Left">{row.name}</StyledTableCell>
                                                <StyledTableCell align="Left">{row.Randomize}</StyledTableCell>
                                                <StyledTableCell align="Left">{row.activities}</StyledTableCell>
                                                <StyledTableCell align="Left"><button className='btn' style={{"backgroundColor":"#265B97","color":"white"}} onClick={() => handleCCShow(row)}>Start</button></StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>
            
            {/* contact Quality Check modal  */}
            <div className='row'>
                    <div>
                        <Modal show={showCC} onHide={handleCCClose} backdrop="static" keyboard={false} centered>
                                <Modal.Header style={{'borderColor':'#FFFFFF'}} closeButton>
                                <Modal.Title><h5 className='pt-3 ps-2'>Headset Contact Quality</h5></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                    <SessionHcq />
                                    
                                    <div className='row pt-3'>
                                        <div className='col'>
                                            <div className="form-outline text-start mb-4" style={{'paddingLeft':'6%'}}>
                                                <Button variant="secondary" onClick={handlePlotWindowShow} style={{'width':'100%','backgroundColor':'#FFFFFF','color':'#006666','borderColor':'#006666'}}>
                                                    Plot Data
                                                </Button>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className="form-outline text-start mb-4" style={{'paddingRight':'6%'}}>
                                            {/* <Link to={`/trialmain/${numberOfLoop}`}>
                                                <Button variant="primary" style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF',}}>
                                                Continue
                                                </Button>
                                            </Link> */}
                                            <Button variant="primary" onClick={handleParadigmWindow} style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF',}}>
                                                Continue
                                            </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>                                      
                            </Modal>
                        </div>
            </div>
            
            <div className='row'>
                                    <Modal show={show} onHide={handleClose} centered>
                                            <Modal.Header closeButton style={{"borderColor":"white"}} >
                                                <Modal.Title><h5 className='pt-3 ps-2'>Finish Calibration?</h5></Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body style={{"padding":0, "margin":0}}>
                                                <div className='row ps-3 pe-3'>
                                                            <div className='col'>
                                                                    <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                            
                                                                                    <Button variant="secondary" onClick={handleReCCShow} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                        Re-Calibrate
                                                                                    </Button>
                                                                        
                                                                    </div></div>
                                                            <div className='col'>
                                                                    <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                                    <Button variant="primary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                        Save Calibration Data
                                                                                    </Button>
                                                                    </div></div>
                                                </div>
                                            </Modal.Body>
                                    </Modal>
                        </div>
                        <div className='row'>  

                                    <Modal show={showSS} onHide={handleSSClose} centered>
                                            <Modal.Header closeButton style={{"borderColor":"white"}} >
                                                <Modal.Title><h5 className='pt-3 ps-2'>Saved Successfully</h5></Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body style={{"padding":0, "margin":0}}>
                                                    <div className='row ps-3 pe-3'>
                                                                <div className='col'>
                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                                        
                                                                            <Button variant="secondary" onClick={handleModalsClose} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                Patient Dashboard
                                                                            </Button>
                                                                                       
                                                                        </div></div>
                                                                <div className='col'>
                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                                        <Link to="/home">
                                                                                                <Button variant="primary" style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                                    Home
                                                                                                </Button>
                                                                                        </Link>
                                                                        </div></div>
                                                    </div>
                                            </Modal.Body>
                                    </Modal>

                        </div>
        </div>
 

 


        </>
    );
}


export default Bci;