import react,{useState, useEffect} from 'react';
import { BsTelephone } from "react-icons/bs";
import { FaRegEnvelope } from "react-icons/fa";
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


const Individualpatient = () => {

        const location = useLocation();

        // console.log(urlPath)

    const { collapseSidebar } = useProSidebar();

    let patientData = null;

    let current_page_url =location.pathname.split("/")[2];
        
    // console.log(current_page_url)
        
    Pdata.map(i => {
        if( i.id ==  current_page_url){
                patientData = i;
        }
    })     


    console.log(`patientData : ${patientData}`)

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
                                                                        <p style={{"padding":"0","margin":"0"}}><span><b>{patientData.name}</b></span> ({patientData.id})</p> 
                                                                </div>
                                                                <div className='row pt-1 pb-1'>
                                                                        <span>
                                                                        {patientData.age} &nbsp; &#x2022; &nbsp;{patientData.gender} &nbsp; &#x2022;&nbsp; {patientData.marital}
                                                                        </span>
                                                                </div>
                                                                <div className='row pt-1 pb-1'>
                                                                        <div className='col-1' style={{"width":"12px"}}><BsTelephone /></div>
                                                                        <div className='col'>{patientData.contact}</div>
                                                                </div>
                                                                <div className='row pt-1 pb-1'>
                                                                        <div className='col-1' style={{"width":"12px"}}><FaRegEnvelope /></div>
                                                                        <div className='col'>{patientData.email}</div>
                                                                </div>
                                                                <div className='row pt-1 pb-1'>
                                                                        <div className='col-1' style={{"width":"12px"}}><RiMapPinLine /></div>
                                                                        <div className='col'>{patientData.address}</div>
                                                                </div>

                                                        </div>
                                                        <div className='col'>
                                                                <div className='row pb-2'>
                                                                <button className='btn btn-success' onClick={handleShow}>Add New Session</button>
                                                                </div>
                                                                <div className='row pb-2'>
                                                                <button className='btn btn-outline-success' onClick={handleSetShowAssess}>Take Assessment</button>
                                                                </div>
                                                                <div className='row pb-2'>
                                                                <button className='btn btn-outline-success' onClick={() => {handleBciShow()}}>Re-Caliberate BCI</button>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div className='row pt-3 pb-2'>
                                                        <div className='col' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row' style={{"color":"#8A8A93"}}><div className='col'>Last calibration on</div></div>
                                                                <div className='row'><div className='col'><b style={{"padding":"0"}}>{patientData.BCI}</b></div></div>
                                                        </div>
                                                        <div className='col' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3' style={{"color":"#8A8A93"}}>Sessions Attended</div>
                                                                <div className='row ps-3'><b style={{"padding":"0"}}>{patientData.sessionsAttended}</b></div>
                                                        </div>
                                                        <div className='col' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3' style={{"color":"#8A8A93"}}>MI Accuracy</div>
                                                                <div className='row ps-3'><b style={{"padding":"0"}}>{patientData.MIAccuracy}</b></div>
                                                        </div>
                                                        <div className='col border-left' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3' style={{"color":"#8A8A93"}}>MIA vs ARAT</div>
                                                                <div className='row ps-3'><b style={{"padding":"0"}}>{patientData.MIVSARAT}</b></div>
                                                        </div>
                                                        <div className='col border-left'>
                                                                <div className='row ps-3' style={{"color":"#8A8A93"}}>MIA vs GS</div>
                                                                <div className='row ps-3'><b style={{"padding":"0"}}>{patientData.MIAVSGS}</b></div>
                                                        </div>
                                                </div>
                                                <div className='row pt-2 pb-3'>
                                                        <div className='col'>
                                                                <div className='row pt-2'><div className='col' style={{"color":"#8A8A93"}}>Medical Condition Description</div></div>
                                                                <div className='row'><div className='col'><b>{patientData.medicaldescription}</b></div></div>
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
                                                        isDashboard ? <Patientdashboard />: <Patientsession />
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
                                                                                                <Bci />
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
                                                                                <AddNewSessionForm />
                                                                        </div>
                                                                        <div className='row'>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                                                <Button variant="secondary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                                        Cancel
                                                                                                </Button>
                                                                                        </div></div>
                                                                                <div className='col'>
                                                                                        <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                                                <Button variant="primary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                                        Add Session
                                                                                                </Button>
                                                                                        </div></div></div>

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
                                        <TakeAssessmentForm />
                                    </div>
                                    <div className='row'>
                                                <div className='col'>
                                                    <div className="form-outline text-start mb-4">
                                            <Button variant="secondary" onClick={handleAssessClose} style={{'width':'100%','background-color':'#FFFFFF','color':'#006666','border-color':'#006666'}}>
                                                                                Cancel
                                                                        </Button>
                                                                        </div></div>
                                                                        <div className='col'>
                                                    <div className="form-outline text-start mb-4" >
                                                                        <Button variant="primary" onClick={handleAssessClose} style={{'width':'100%','background-color':'#006666','color':'#FFFFFF',}}>
                                                                        Save
                                                                        </Button>
                                           </div></div></div>
                                </Modal.Body>
                               
                            </Modal>
                        </div>
                    </div>
                                        </div>


                        </main>
            </div>
        </>
    );
}


export default Individualpatient;