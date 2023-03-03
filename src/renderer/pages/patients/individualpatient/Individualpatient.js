import react,{useState, useEffect} from 'react';
import { BsTelephone } from "react-icons/bs";
import { FaRegEnvelope } from "react-icons/fa";
import { AiOutlineInfoCircle } from 'react-icons/ai';
// import { IoLocationOutline } from "react-icons/io";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { Outlet, Link } from "react-router-dom";
// Import Dashboard and Sessions
import Patientsession from './component/Sessions';
import Patientdashboard from './component/Dashboard';
import Navbarcommon from '../../navbar/Navbar';
// imports for Modal
import { Button, Modal } from "react-bootstrap";
import ba_logo from "../../login/BrainAlive.svg";
// Modal imports
import Bci from '../Bci';
import AddNewSessionForm from '../../session/AddNewSessionForm';
import TakeAssessmentForm from '../../session/TakeAssessmentForm';
// get patient data
import {Pdata} from './Pdata';
import { useLocation } from 'react-router-dom'
import { RiMapPinLine } from "react-icons/ri";
import { setMaxListeners } from 'events';

const Individualpatient = () => {

    const location = useLocation();

//     console.log(location)

    const { collapseSidebar } = useProSidebar();

    let patientId = null;

    patientId = location.pathname.split("/")[2];
        
    console.log(patientId)
        
//     Pdata.map(i => {
//         if( i.id ==  current_page_url){
//                 patientData = i;
//         }
//     })


      const [isHovering, setIsHovering] = useState(false);
        const handleMouseOver = () => {
        setIsHovering(true);
        };

        const handleMouseOut = () => {
        setIsHovering(false);
        };
        // i buttons
        const [iButtonMIA, setIButtonMIA] = useState(false);
        const [iButtonMIAvsARAT, setIButtonMIAvsARAT] = useState(false);
        const [iButtonMIAvsGS, setIButtonMIAvsGS] = useState(false);

        const [isShown, setIsShown] = useState(false);

    const [showBci, setShowBci] = useState(false);
    const handleBciClose = () => setShowBci(false);
    const handleBciShow = () => setShowBci(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAssess, setShowAssess] = useState(false);
    const handleAssessClose = () => setShowAssess(false);
    const handleSetShowAssess = () => setShowAssess(true);
    // Dashboard or Sessions
    const [isDashboard, setIsDashboard] = useState(true);

     // Sidebar CSS

     const [isHoverHome, setIsHoverHome] = useState(false);
     const [isHoverPatient, setIsHoverPatient] = useState(false);
     const [isHoverSession, setIsHoverSession] = useState(false);
     const [isHoverLogo, setIsHoverLogo] = useState(false);
     const [activeTab, setActiveTab] = useState('patient');
     const handleMouseEnterLogo = () => {
              setIsHoverLogo(true);
     };
     const handleMouseLeaveLogo = () => {
             setIsHoverLogo(false);
     };
     const handleMouseEnterHome = () => {
     setIsHoverHome(true);
     };
     const handleMouseLeaveHome = () => {
     setIsHoverHome(false);
     };

     const handleMouseEnterPatients = () => {
              setIsHoverPatient(true);
     };
     const handleMouseLeavePatients = () => {
             setIsHoverPatient(false);
     };
     const handleMouseEnterSessions = () => {
              setIsHoverSession(true);
     };
     const handleMouseLeaveSessions = () => {
             setIsHoverSession(false);
     };

     const [isElectron,setIsElectron] = useState(false);
    const [patientData, setPatientData] = useState({});
    const [sessionData, setSessionData] = useState({items:[]});

    const getPatientData = () => {
        window.require("electron").ipcRenderer.send("getPatientDetailsById",patientId);

        window.require("electron").ipcRenderer.on("getPatientDetailsById", (e,data) => {
            console.log(data);
            setPatientData(data);
        });
    }
    const [patientsessions, setPatientSessions] = useState({});

    const getSessionByPatientId = () => {
        window.require("electron").ipcRenderer.send("getSessionByPatientId",patientId);

        window.require("electron").ipcRenderer.on("getSessionByPatientId", (e,data) => {
            console.log(data);
            setPatientSessions(data);
        });
    }
        function calculateAverageResults(records) {
        return records.items.map(record => {
                const { paradigms } = record;
                const totalResults = paradigms.reduce((acc, curr) => acc.concat(curr.results), []);
                const averageResult = totalResults.reduce((acc, curr) => acc + curr, 0) / totalResults.length;
                return { sessionId: record.sessionId, patientId: record.patientId, averageResult };
        });
        }
        function overallAverageResults(records){
        const totalResults = records.reduce((acc, curr) => acc + curr.averageResult, 0);
        return Math.floor((totalResults / records.length)*100);
        }

    const [patientResults, setPatientResults] = useState({});
    const [MIA, setMIA] = useState(0);

    const getSessionResultByPatientId = () => {
        window.require("electron").ipcRenderer.send("getSessionResultByPatientId",patientId);

        window.require("electron").ipcRenderer.on("getSessionResultByPatientId", (e,data) => {
            console.log(data);
            let individualSessionProcessedResults = calculateAverageResults(data);
        //     console.log(individualSessionProcessedResults);
            let allSessionProcessedResults = overallAverageResults(individualSessionProcessedResults);
            
            if(allSessionProcessedResults){
                // console.log(allSessionProcessedResults);
                setMIA(allSessionProcessedResults);
            }
                
            setPatientResults(data);
        });
    }
    
    const [firstSession, setFirstSession] = useState({});

    function getFirstSessionOfPatient() {
        window.require("electron").ipcRenderer.send("getSessionData",{});

        window.require("electron").ipcRenderer.on("getSessionData", (e,data) => {
                // console.log(data);
                const patientSessions = data.items.filter((session) => session.patientId === patientId);
                // console.log(`${patientId}: `,patientSessions);
                const sortedSessions = patientSessions.sort((a, b) => new Date(a.date) - new Date(b.date));
                console.log(sortedSessions.length);
                sortedSessions.length > 0 ? setFirstSession(sortedSessions[0]) : null;
        }); 
      }

    useEffect(() => {
        // console.log(patientId);
        if (window.require && window.require("electron")){
            setIsElectron(isElectron => !isElectron);
            getPatientData();
            getSessionByPatientId();
            getSessionResultByPatientId();
            getFirstSessionOfPatient();
        }   
    },[]);

    

    const handleChildClick = (() => {
        setShowAssess(false);
    })

    const [showRecoveryModal, setShowRecoveryModal] = useState(false);

    const handleRecoveryOpen = () => setShowRecoveryModal(true);
    const handleRecoveryClose = (() => {
        setShowRecoveryModal(false);
    })

    const handleRecoveryclick = (() => {
        
        window.require("electron").ipcRenderer.send("updatePatientStatus",patientId);

        window.require("electron").ipcRenderer.on("updatePatientStatus", (e,data) => {
                console.log(data);
                setPatientData(data);   
        })
    })

    return(
        <> 

            <div style={{ display: 'flex', height: '100vh' }}>

            <Sidebar backgroundColor="black" width='200px'>
          <Menu>
            <MenuItem
              icon={<FaBars />}
              onClick={() => {
                collapseSidebar();
              }}
              onMouseEnter={handleMouseEnterLogo}
              onMouseLeave={handleMouseLeaveLogo}
              style={{ color: 'white', backgroundColor:'black'}}
            >
              <div style={{ color: isHoverLogo ? 'black' : 'white' }}>
                {' '}
                <img width={35} src={ba_logo}></img>
              </div>
            </MenuItem>
            <MenuItem
              icon={<FaHome />}
              component={<Link to="/home" />}
              onMouseEnter={handleMouseEnterHome}
              onMouseLeave={handleMouseLeaveHome}
              style={{ color: isHoverHome ? 'black' : 'white' }}
            >
              {' '}
              <div style={{ color: isHoverHome ? 'black' : 'white' }}>
                {' '}
                Home
              </div>
            </MenuItem>
            <MenuItem
              icon={<FaUserFriends />}
              component={<Link to="/patients" />}
              onClick={() => setActiveTab('patient')}
              className={`${activeTab === 'patient' && 'patients'} sidebar-tab`}
            >
              <div> Patients</div>
            </MenuItem>
            <MenuItem
              icon={<FaRegCalendarAlt />}
              component={<Link to="/session" />}
              onMouseEnter={handleMouseEnterSessions}
              onMouseLeave={handleMouseLeaveSessions}
              style={{ color: isHoverSession ? 'black' : 'white' }}
            >
              {' '}
              <div style={{ color: isHoverSession ? 'black' : 'white' }}>
                {' '}
                Sessions
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>

                        <main style={{ "width": "100%" }}>
                        <div  style={{"zIndex":"1"}}>
                                                        < Navbarcommon />
                                        </div>
                                        <div className='container-fluid p-4'>
                                       
                                                <div className='row'>
                                                        <div className='col-9'>

                                                                <div className='row pt-1 pb-1'>
                                                                <p style={{"padding":"0","margin":"0"}}>
                                                                        <span><b>{patientData?.name}</b></span> ({patientData?.id})
                                                                        {
                                                                        (patientData?.status === "NOT RECOVERED") ? 
                                                                        <button className='btn btn-outline-success btn-sm mx-3' onClick={handleRecoveryOpen}>Mark as Recovered</button> :
                                                                        <button className='btn btn-outline-info btn-sm mx-3'>Recovered</button>
                                                                        }
                                                                </p>       
                                                                </div>
                                                                <div className='row pt-1 pb-1'>
                                                                        <span>
                                                                        {patientData?.age} &nbsp; &#x2022; &nbsp;{patientData?.gender} &nbsp; &#x2022;&nbsp; {patientData?.maritalStatus}
                                                                        </span>
                                                                </div>
                                                                <div className='row pt-1 pb-1'>
                                                                        <div className='col-1' style={{"width":"12px"}}><BsTelephone /></div>
                                                                        <div className='col'>{patientData?.phoneNumber}</div>
                                                                </div>
                                                                <div className='row pt-1 pb-1'>
                                                                        <div className='col-1' style={{"width":"12px"}}><FaRegEnvelope /></div>
                                                                        <div className='col'>{patientData?.email}</div>
                                                                </div>
                                                                <div className='row pt-1 pb-1'>
                                                                        <div className='col-1' style={{"width":"12px"}}><RiMapPinLine /></div>
                                                                        <div className='col'>{patientData?.address}</div>
                                                                </div>

                                                        </div>
                                                        {
                                                                patientData?.status === "NOT RECOVERED" && (
                                                                        <div className='col'>
                                                                                <div className='row pb-2'>
                                                                                        <button className='btn btn-success' onClick={handleShow}>Add New Session</button>
                                                                                        </div>
                                                                                        <div className='row pb-2'>
                                                                                        <button className='btn btn-outline-success' onClick={handleSetShowAssess}>Take Assessment</button>
                                                                                        </div>
                                                                                        <div className='row pb-2'>
                                                                                        <button className='btn btn-outline-success' onClick={() => {handleBciShow()}}>Re-Calibrate BCI</button>
                                                                                </div>
                                                                        </div>
                                                                )
                                                        }
                                                        
                                                </div>
                                                <div className='row pt-3 pb-2'>
                                                        <div className='col' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row' style={{"color":"#8A8A93"}}><div className='col'>Calibrated</div></div>
                                                                <div className='row'><div className='col'><b style={{"padding":"0"}}>{patientData?.bci_calib_status}</b></div></div>
                                                        </div>
                                                        <div className='col' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3' style={{"color":"#8A8A93"}}>Sessions Attended</div>
                                                                <div className='row ps-3'><b style={{"padding":"0"}}>{patientsessions?.items?.length}</b></div>
                                                        </div>
                                                        <div className='col' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3' style={{'display':'flex'}}>
                                                                        <div style={{"color":"#8A8A93",'padding':'0'}}>MIA
                                                                        <sup><AiOutlineInfoCircle title="Motor Imaginary Accuracy"/></sup></div>
                                                                </div>
                                                                <div className='row ps-3'><b style={{"padding":"0"}}>{MIA==0 ? 'N/A' : `${MIA}%`}</b></div>
                                                        </div>
                                                        <div className='col border-left' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3' style={{'display':'flex'}}>
                                                                        <div style={{"color":"#8A8A93",'padding':'0'}}>MIA vs ARAT
                                                                        <sup><AiOutlineInfoCircle title="Motor Imaginary Accuracy"/></sup></div>
                                                                </div>
                                                                <div className='row ps-3'><b style={{"padding":"0"}}>{"N/A"}</b></div>
                                                        </div>
                                                        <div className='col border-left'>
                                                                <div className='row ps-3' style={{'display':'flex'}}>
                                                                        <div style={{"color":"#8A8A93",'padding':'0'}}>MIA vs GS
                                                                        <sup><AiOutlineInfoCircle title="Motor Imaginary Accuracy"/></sup></div>
                                                                </div>
                                                        <div className='row ps-3'><b style={{"padding":"0"}}>{"N/A"}</b></div>
                                                        </div>
                                                        </div>
                                                <div className='row pt-2 pb-3'>
                                                        <div className='col'>
                                                                <div className='row pt-2'><div className='col' style={{"color":"#8A8A93"}}>Description</div></div>
                                                                <div className='row'><div className='col'><b>{patientData?.description}</b></div></div>
                                                        </div>
                                                </div> 

                                                <div className='row pt-3'>
                                                        <div className='col-md-6' style={{ "cursor": "pointer" }}>
                                                                <span className='d-inline-block mr-3 text-bold' onClick={() => { setIsDashboard(true) }} 
                                                                style={{ 'border-bottom': isDashboard ? "2px solid black" : "none" }}>
                                                                                <p style={{"fontWeight":isDashboard ? "bold":"normal"}}>Dashboard</p>
                                                                </span>

                                                                <span className='d-inline-block text-bold' onClick={() => { setIsDashboard(false) }} 
                                                                style={{ 'border-bottom': isDashboard ? "none" : "2px solid black" }}>
                                                                                <p style={{"fontWeight":isDashboard ? "normal":"bold","marginLeft":"10px"}}>Sessions</p>
                                                                        </span>
                                                        </div>
                                                </div>
                                                 
                                                <div className='row mt-5'>
                                                        {
                                                        isDashboard ? <Patientdashboard />: <Patientsession patientData={patientData}/>
                                                        }
                                                </div>
                                                <div className='row'>
                                                        <div>
                                                                <Modal size="lg" show={showBci} onHide={handleBciClose}>
                                                                        <Modal.Header closeButton style={{'border-color':'#FFFFFF'}}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>BCI Calibration</h5></Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                                        <div>
                                                                                                <Bci handleBciClose={handleBciClose} patientId={patientId}/>
                                                                                        </div>
                                                                        </Modal.Body>
                                                                       {/*  <Modal.Footer>
                                                                        <Button variant="secondary" onClick={handleBciClose}>
                                                                                Close
                                                                        </Button>
                                                                        <Button variant="primary" onClick={handleBciClose}>
                                                                                Save Changes
                                                                        </Button>
                                                                        </Modal.Footer> */}
                                                                </Modal>
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                        <div>
                                                                <Modal show={show} onHide={handleClose}>
                                                                        <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }}>
                                                                                <Modal.Title><h5 className='pt-3 ps-2'>Add New Session</h5></Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                                <div>
                                                                                        <AddNewSessionForm handleClose={handleClose}/>
                                                                                </div>
                                                                        </Modal.Body>

                                                                </Modal>
                                                        </div>
                                                </div>
                                        <div className='row'>
                                                        <div>
                                                        <Modal size='lg' show={showAssess} onHide={handleAssessClose} >
                                                                <Modal.Header closeButton style={{'border-color':'#FFFFFF'}} >
                                                                <Modal.Title><h5 className='pt-3 ps-2'>Assessments</h5></Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                <div>
                                                                        <TakeAssessmentForm MIA={MIA} onChildClick={handleChildClick} patientData={patientData}/>
                                                                </div>
                                                                </Modal.Body>
                                                        
                                                        </Modal>
                                                        </div>
                                                </div>
                                        </div>

                                        <div className='row'>
                                                        <div>
                                                                <Modal show={showRecoveryModal} onHide={handleRecoveryClose} centered>
                                                                        <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }}>
                                                                                <Modal.Title><h5 className='pt-3 ps-2'>Patient Recovered?</h5></Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                        <div className='row px-6 py-0 pb-2'>
                                                                                <div className='col-2' style={{"borderRight": "2px solid grey"}}>
                                                                                        <div className='row ps-3' style={{"color":"#8A8A93"}}><h5 style={{"padding":"0"}}>MIA</h5></div>
                                                                                        <div className='row ps-3'><b style={{"padding":"0"}}>{MIA==0 ? 'N/A' : `${MIA}%`}</b></div>
                                                                                </div>
                                                                                <div className='col-4 borderLeft' style={{"borderRight": "2px solid grey"}}>
                                                                                        <div className='row ps-3' style={{"color":"#8A8A93"}}><h5 style={{"padding":"0"}}>Date Started</h5></div>
                                                                                        <div className='row ps-3'><b style={{"padding":"0"}}>{firstSession?.date || '--'}</b></div>
                                                                                </div>
                                                                                <div className='col-6 borderLeft'>
                                                                                        <div className='row ps-3' style={{"color":"#8A8A93"}}><h5 style={{"padding":"0"}}>Sessions Attended</h5></div>
                                                                                        <div className='row ps-3'><b style={{"padding":"0"}}>{patientsessions?.items?.length}</b></div>
                                                                                </div>
                                                                        </div>
                                                                        <div className='row pt-2' style={{"paddingLeft":"16px"}}>Are you sure, you want to mark this patient as recovered?</div>

                                                                        <div className='row pt-3'>
                                                                                <div className='col'>
                                                                                <div className="form-outline text-start mb-2" style={{'paddingLeft':'6%'}}>
                                                                                        <Button variant="secondary" onClick={handleRecoveryClose} style={{'width':'100%','backgroundColor':'#FFFFFF','color':'#006666','borderColor':'#006666'}}>
                                                                                        Cancle
                                                                                        </Button>
                                                                                </div>
                                                                                </div>
                                                                                <div className='col'>
                                                                                <div className="form-outline text-start mb-2" style={{'paddingRight':'6%'}}>
                                                                                {/* <Link to={`/trialmain/${numberOfLoop}`}>
                                                                                        <Button variant="primary" style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF',}}>
                                                                                        Continue
                                                                                        </Button>
                                                                                </Link> */}
                                                                                <Button variant="primary" onClick={handleRecoveryclick} style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF',}}>
                                                                                        Mark as Recovered
                                                                                </Button>
                                                                                </div>
                                                                                </div>
                                                                        </div>
                                                                        </Modal.Body>
                                                                </Modal>
                                                        </div>
                                        </div>
                        </main>
            </div>
        </>
    );
}


export default Individualpatient;