import react,{useState, useEffect, useRef} from 'react';
import { FaAlignJustify, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link, useNavigate,useLocation } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SessionHcq from './SessionHcq';
import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Brianimg from '../brianimg/brainimg';
import Success from '../../../renderer/assets/icons/Success.png';
import Check from '../../../renderer/assets/icons/Check.png';
import leftArrow from '../../../renderer/assets/icons/left.png';
import rightArrow from '../../../renderer/assets/icons/right.png';
import { Alert } from '@mui/material';

const SessionBci = ({currSession, paradigms, handleBciClose}) => {
    const navigate = useNavigate();

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
    
    // function createData(paradigm_name, loops, duration, randomize, activities) {
    //     return { paradigm_name, loops, duration, randomize, activities };
    // }

    // const rows = [
    //     createData('Motor Imagery for Left Hand',2,2, 'No', 1),
    //     createData('Motor Imagery for Right Hand',2, 2, 'No', 1),
    //     createData('Motor Imagery for Both Hands',2,2, 'No', 2),
    //     createData('Repetitive Exercises',2,2, 'No', 3),
    // ];

    /* Result section state management */

    const [paradigmResult, setParadigmResult] = useState(
        {
            sessionId: currSession.id,
            patientId: currSession.patientId,
            paradigms: [],
            MIA:0
        }
    );

    const handleAddObjects = (obj) => {
        // const obj = [
        //   {
        //     id: 'P1',
        //     loop: '5',
        //     results: [0, 1, 0, 0, 1],
        //     feedback:"aklhdalkjfhsdlfjhdaef"
        //   }
        // ];
        console.log(obj);
        setParadigmResult(prevState => ({
            ...prevState,
            paradigms: [...prevState.paradigms, ...obj]
        }));
    };

    function calculateAverageResults(record) { 
            const { paradigms } = record;
            const totalResults = paradigms.reduce((acc, curr) => acc.concat(curr.results), []);
            const averageResult = totalResults.reduce((acc, curr) => acc + curr, 0) / totalResults.length;
            return Math.floor(averageResult*100);
    }

    // to send final result to server
    useEffect(() => {
        // Do something when the paradigm array is changed
        if(paradigmResult.paradigms.length > 0){
            paradigmResult.MIA = calculateAverageResults(paradigmResult);
            if (window.require && window.require("electron")) {
                console.log("paradigmResult",paradigmResult);
                window.require("electron").ipcRenderer.send("saveSessionResult",paradigmResult);
            }
        }
    }),[paradigmResult.paradigms];

    // To save trial results in an array
    const [result, setResult] = useState([]);
    const [prevloop, setPrevLoop] = useState(0);

    const AddNewElement = (newElement) => {
        setResult(prevState => [...prevState, newElement]);
    };

    useEffect(() => {
        // condition to update result
        if (window.require && window.require("electron")) {
            window.require("electron").ipcRenderer.on("paradigmRes", (e,data) => {
                data = JSON.parse(data);
                // console.log(data, typeof data);
                // try{
                //     console.log(data?.paradigm?.result);
                // }catch(e){
                //     console.log("Error in response parsing");
                // }
                try{
                    if( parseInt(data?.paradigm?.loop) === "undefined" && 
                        parseInt(data?.paradigm?.loop) === undefined && 
                        parseInt(data?.paradigm?.loop) === null && 
                        parseInt(data?.paradigm?.loop) === prevloop) {
                            console.log(data, typeof parseInt(data?.paradigm?.loop));
                    } else {
                        setPrevLoop(data?.paradigm?.loop)
                        AddNewElement(data?.paradigm?.result)
                    }
                }catch(e){
                    Alert('Invalid object from server!')
                }
            });
        }
    },[]);

    /* Result section state management */

    const [curParadigmId, setCurParadigmId] = useState('');
    const [curParadigmData,setCurParadigmData] = useState({});
    const [url,setUrl] = useState('');

    const [numberOfLoop, setNumberOfLoop] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);
    
    // To open loop window
    const handleModalShow = (row) => {
        // console.log("row", row);
        setCurParadigmData(row);
        setCurParadigmId(row.id);
        setUrl(row.trials[1].url);
        if(window && window.require("electron")){
            window.require("electron").ipcRenderer.send("connect_to_server",{});
    
            window.require("electron").ipcRenderer.on("connect_to_server", (e,data) => {
                    console.log(data);
                    if(data === "connected"){
                        console.log("Connected to server");
                    } else {
                        console.log(data);
                    }
            });
        }
        setShowModal(true);
    }

    const handleIncrement = () => {
            if (numberOfLoop > 1) {
            setNumberOfLoop(numberOfLoop - 1);
            }
    };
    const handleDecrement = () => {
            if (numberOfLoop < 50) {
            setNumberOfLoop(numberOfLoop + 1);
            }
    };

    const [reRunParadigm, setReRunParadigm] = useState(false);
    const handleReRunParadigmClose = () => {
        setReRunParadigm(false);
    };
    const handleReRunParadigmShow = () => {
        setFirstParadigm(false);
        setLastModal(false);
        setResult([]);
        setNumberOfLoop(numberOfLoop+1);
        setReRunParadigm(true);
        setShowModal(true);
    };

    const [showCC, setShowCC] = useState(false);
    const handleCCClose = () => setShowCC(false);
    const handleCCShow = () => {
        if(window && window.require("electron")){
            window.require("electron").ipcRenderer.send('contact_quality_check',`{"contact_quality_check":"start"}`);
            // window.require("electron").ipcRenderer.on("contact_quality", (e,data) => {
            //     // console.log(data);
            // });
        }
        setShowCC(true);
        handleModalClose();
    };

    const handlePlotWindowShow = () => {
        if (window.require && window.require("electron")) {
            const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/plot_data`;
            console.log(`{"Status":"open","url":"${url}"}`);
            window.require("electron").ipcRenderer.send("plotWindow", `{"Status":"open","url":"${url}"}`);
        }
    };

    const [res, setRes] = useState('');

    // Continue button on contact quality check modal
    const handleParadigmWindow = () => {
        handleModalClose();
        handleCCClose();
        setTimeout(() => {
            if(reRunParadigm){
                console.log("re-run");
                if (window.require && window.require("electron")) {
                    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/trialmain/${curParadigmId}/${numberOfLoop}`;
                    window.require("electron").ipcRenderer.send("trialmain", `{"Status":"open","url":"${url}","paradigm":"${curParadigmId}","loop":"${numberOfLoop}"}`);
                }
            }else{
                if (window.require && window.require("electron")) {
                    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/trialmain/${curParadigmId}/${numberOfLoop}`;
                    window.require("electron").ipcRenderer.send("trialmain", `{"Status":"open","url":"${url}","paradigm":"${curParadigmId}","loop":"${numberOfLoop}"}`);
                }
            }
        }, 300);
        if (window.require && window.require("electron")) {
            window.require("electron").ipcRenderer.on("trialmainResponse", (e,data) => {
                setRes(data);
            });
        }
        if(window && window.require("electron")){
              const session_data = `{"id":"${currSession.id}","status":"${"RUNNING"}"}`;
              window.require("electron").ipcRenderer.send("updateSessionStatus",session_data);
        }
    };

    if (window.require && window.require("electron")) {
        window.require("electron").ipcRenderer.on("childWindowClosed", () => {
            handleFirstParadigmShow();
        });
    }

    const [feedback, setFeedback] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const [showfirstParadigm, setFirstParadigm] = useState(false);
    const handleFirstParadigmClose = () => {
        setFirstParadigm(false);
        handleSecondParadigmShow();
    };
    const handleFirstParadigmShow = () => {
        setFirstParadigm(true);
    };

    const [showSecondParadigm, setShowSecondParadigm] = useState(false);
    const handleSecondParadigmClose = () => {
        console.log(feedback);
        setShowSecondParadigm(false);
        handleLastModalShow();
        // console.log({"id":curParadigmId,"loop":numberOfLoop,"feedback":feedback,"results":result});
        // console.log({id:curParadigmId,loop:numberOfLoop,feedback:feedback,results:result});
        handleAddObjects([{"id":curParadigmId,"loop":numberOfLoop,"feedback":feedback,"results":result}]);
        setPrevLoop(0);
        if(window && window.require("electron")){
            const session_data = `{"id":"${currSession.id}","status":"${"FINISHED"}"}`;
            window.require("electron").ipcRenderer.send("updateSessionStatus",session_data);
        }
    };
    const handleSecondParadigmShow = () => {
        setShowSecondParadigm(true);
    };

    const [lastModal, setLastModal] = useState(false);
    const handleLastModalClose = () => {
        setLastModal(false);
    };
    const handleLastModalShow = () => {
        setLastModal(true);
    };

    const handlePrardigmStop = () => {
        console.log("handlePrardigmStop called");
        if (window.require && window.require("electron")) {
            window.require("electron").ipcRenderer.send("trialmain", `{"Status":"paradigm_stop"}`);
        }
        handleCCClose();
    };
    const handleHome = () => {
        handleLastModalClose();
        handleBciClose();
    };

    const handleNumberChange = (e) => {
        setNumberOfLoop(e.target.value);
    };
return (
    <>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    
                    <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Paradigm Name</StyledTableCell>
                                    <StyledTableCell align="left">Randomize</StyledTableCell>
                                    <StyledTableCell align="left">Activities</StyledTableCell>
                                    <StyledTableCell align="left">Action</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                            {paradigms.items.map((row) => (
                                                <StyledTableRow key={row.id}>
                                                        {/* <StyledTableCell component="th" scope="row">
                                                            {row.name}
                                                        </StyledTableCell> */}
                                                        
                                                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                                                        <StyledTableCell align="left">{row.Randomize}</StyledTableCell>
                                                        <StyledTableCell align="left">{row.activities}</StyledTableCell>
                                                        <StyledTableCell align="left"><button className='btn' style={{"backgroundColor":"#265b97","color":"white"}} onClick={() => handleModalShow(row)}>Launch</button></StyledTableCell>       
                                                </StyledTableRow>
                                            ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                </div>
            </div>

            {/* After launch modals */}
            
            {/* selete number of loops modal */}
            <div className="row">
                <div>
                    <Modal
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showModal}
                    onHide={handleModalClose}
                    backdrop="static" 
                    keyboard={false}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Select No. of Loops</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        <p>No. of Loops</p>
                        <div className="d-flex justify-content-center">
                            <button
                            className="number-loop-btn"
                            onClick={handleIncrement}
                            >
                            <img src={leftArrow} alt="<" />
                            </button>
                            {/* {' '}
                            <span className="number-loop-count text-center">
                            {numberOfLoop}
                            </span>{' '} */}
                            <input
                                type="number"
                                value={numberOfLoop}
                                onChange={(e) => handleNumberChange(e)}
                                className="number-loop-input"
                            />
                            <button
                            className="number-loop-btn"
                            onClick={handleDecrement}
                            >
                            <img src={rightArrow} alt=">" />
                            </button>
                        </div>
                        </div>

                        <div className="mt-3 d-flex justify-content-center">
                        <Button
                            style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF','padding':'8px 5px 8px 5px','margin':'2px 15px 2px 15px'}}
                            variant="secondary"
                            onClick={handleCCShow}
                        >
                            Check Contact Quality
                        </Button>
                        </div>
                    </Modal.Body>
                    </Modal>
                </div>

                {/* Headset Contact Quality modal */}

            </div>
            {/* contact Quality Check modal  */}
            <div className='row'>
                    <div>
                        <Modal show={showCC} onHide={handlePrardigmStop} backdrop="static" keyboard={false} centered>
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

            
            {/* Paradigm end modals */}

            {/* first modal */}
            <div className='row'>
                <Modal show={showfirstParadigm} onHide={handleFirstParadigmClose} centered backdrop="static" keyboard={false} size='md'>
                    <Modal.Header>
                    <Modal.Title>Saved Paradigm?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                                    
                                    
                                    
                                    <div className='row pt-3'>
                                        <div className='col'>
                                            <div className="form-outline text-start mb-4" style={{'paddingLeft':'6%'}}>
                                                <Button variant="secondary" onClick={handleReRunParadigmShow} style={{'width':'100%','backgroundColor':'#FFFFFF','color':'#006666','borderColor':'#006666'}}>
                                                    Re-run Paradigm
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
                                            <Button variant="primary" onClick={handleFirstParadigmClose} style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF',}}>
                                                End & Save Data
                                            </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body> 
                    {/* <Modal.Footer className="d-flex justify-content-center" style={{border:'0px', padding:'0px',margin:'0px'}}>
                            <div className='row pt-3'>
                                <div className='col-6' style={{'padding':'0%','margin':'0px'}}>
                                    <div className="form-outline text-start mb-4" style={{'padding':'0%','margin':'0px'}}>
                                        <Button variant="secondary" onClick={handleReRunParadigmShow} style={{'backgroundColor':'#FFFFFF','color':'#006666','borderColor':'#006666'}}>
                                        Re-run Paradigm
                                        </Button>
                                    </div>
                                </div>
                                <div className='col-6' style={{'paddingLeft':'0%'}}>
                                    <div className="form-outline text-start mb-4" style={{'padding':'0%'}}>
                                    
                                    <Button variant="primary" onClick={handleFirstParadigmClose} style={{'backgroundColor':'#006666','color':'#FFFFFF',}}>
                                    End & Save Data
                                    </Button>
                                    </div>
                                </div>
                            </div>
                    </Modal.Footer> */}
                </Modal>
            </div>
            {/* second modal  */}
            <div className='row' >
                <div>
                    <Modal show={showSecondParadigm} onHide={handleSecondParadigmClose}  centered backdrop="static" keyboard={false}>
                    <Modal.Header>
                    <Modal.Title>End Paradigm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <form onSubmit={handleSubmit}>
                            <div className="form-outline text-start mb-4">
                                    <label className="form-label" htmlFor="feedback">
                                        Feedback
                                    </label>
                                    <input
                                        type="text"
                                        id="feedback"
                                        className="form-control form-control-sm"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                            </div>
                        </form> */}
                        <Form>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Feedback</Form.Label>
                                <Form.Control as="textarea" rows={2} placeholder="Therapist's feedback or comments" value={feedback} onChange={(e) => setFeedback(e.target.value)}/>
                            </Form.Group>
                        </Form>
                        <div className='row pt-3'>
                            <div className='col'>
                                <div className="form-outline text-start mb-2" style={{'paddingLeft':'6%'}}>
                                    <Button variant="secondary" onClick={handleSecondParadigmClose} style={{'width':'100%','backgroundColor':'#FFFFFF','color':'#006666','borderColor':'#006666'}}>
                                    Run more paradigm
                                    </Button>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-outline text-start mb-2" style={{'paddingRight':'6%'}}>
                                <Button variant="primary" onClick={handleSecondParadigmClose} style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF',}}>
                                Save Feedback
                                </Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                </div>
            </div>
            {/* last modal */}
            <div className='row'>
            <Modal show={lastModal} 
                onHide={handleLastModalClose} 
                size='sm' 
                centered backdrop="static" 
                keyboard={false}>
                <Modal.Header className="d-flex justify-content-center" style={{border:'0px'}}>
                    <img src={Check} width='70px'/>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center" style={{padding:'0px', margin:'0px'}}>
                    <Modal.Title>Saved Successfully</Modal.Title>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center" style={{border:'0px', padding:'0px'}}>
                        <div className='row pt-3' style={{padding:'0px',margin:'0px'}}>
                            <div className='col-9' style={{'padding':'0%'}}>
                                <div className="form-outline text-start mb-2" style={{'padding':'0%'}}>
                                <Link to="/patients">
                                    <Button variant="primary" style={{'backgroundColor':'#FFFFFF','color':'#006666','borderColor':'#006666'}}>
                                        Patient Dashboard
                                    </Button>
                                </Link>
                                </div>
                            </div>
                            <div className='col-3' style={{'padding':'0%'}}>
                                <div className="form-outline text-start mb-2" style={{'paddingRight':'6%'}}>
                                    <Button variant="primary" onClick={handleHome} style={{'backgroundColor':'#006666','color':'#FFFFFF'}}>
                                        Home
                                    </Button>
                                </div>
                            </div>
                        </div>
                </Modal.Footer>
            </Modal>
            </div>
        </div> 
    </>
    );
}

export default SessionBci;