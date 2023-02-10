import react,{useState} from 'react';
import { Link } from 'react-router-dom';

// page component imports
import Patienttable from './Ptable';
import Rpatienttable from './Rptable';
import Navbarcommon from '../navbar/Navbar';
import ba_logo from "../login/BrainAlive.svg";
// imports for Modal
import { Button, Modal } from "react-bootstrap";

// Form in Modal 
import Form from './Form';
import Bci from './Bci';
import HCQ from './Hcq';



import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";



const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    

const Patient = () => {

        // Pop up
        const { collapseSidebar } = useProSidebar();

        // Page component rendering
                const [currentPatient, setCurrentPatient] = useState(true);

        // Modal Add New Patient
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        const [showBci, setShowBci] = useState(false);
        const handleBciClose = () => setShowBci(false);
        const handleBciShow = () => setShowBci(true);


        const [showCC, setShowCC] = useState(false);
        const handleCCClose = () => setShowCC(false);
        const handleCCShow = () => setShowCC(true);


         // Sidebar CSS

         const [isHoverHome, setIsHoverHome] = useState(false);
         const [isHoverPatient, setIsHoverPatient] = useState(false);
         const [isHoverSession, setIsHoverSession] = useState(false);
         const [isHoverLogo, setIsHoverLogo] = useState(false);
 
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
                        <Sidebar backgroundColor='black'>
                            <Menu>
                                <MenuItem
                                    icon={<FaBars />}
                                    onClick={() => {
                                    collapseSidebar();                                
                                    }}
                                    
                                    onMouseEnter={handleMouseEnterLogo} 
                                    onMouseLeave={handleMouseLeaveLogo}
                                    style={{color:isHoverLogo ? 'black' : 'white'}}
                                >
                                    <div style={{"color":isHoverLogo ? 'black' : 'white'}}>{" "}
                                    <img width={25} src={ba_logo}></img></div>
                                </MenuItem>
                                <MenuItem icon={<FaHome />} component={<Link to="/home" />} onMouseEnter={handleMouseEnterHome} 
                                    onMouseLeave={handleMouseLeaveHome} style={{color: isHoverHome ? 'black' : 'white'}}> <div style={{color: isHoverHome ? 'black' : 'white'}}>{" "} Home</div></MenuItem>
                                <MenuItem icon={<FaUserFriends />} component={<Link to="/patients" />} onMouseEnter={handleMouseEnterPatients} 
                                    onMouseLeave={handleMouseLeavePatients} style={{color: isHoverPatient ? 'black' : 'white'}}> <div style={{color: isHoverPatient ? 'black' : 'white'}} >{" "} Patients</div></MenuItem>
                                <MenuItem icon={<FaRegCalendarAlt />} component={<Link to="/session" />} onMouseEnter={handleMouseEnterSessions} 
                                    onMouseLeave={handleMouseLeaveSessions} style={{color: isHoverSession ? 'black' : 'white'}}> <div style={{color: isHoverSession ? 'black' : 'white'}}>{" "} Sessions</div></MenuItem>
                            </Menu>
                        </Sidebar>
                        <main style={{"width":"100%"}}>
                                        <div className='container-fluid'>
                                                <div className='row'>
                                                                <Navbarcommon />
                                                </div>
                                                <div className='row pt-3 pb-3'>
                                                        <div className='col-md-6' style={{ "cursor": "pointer" }}>
                                                                <span className='d-inline-block p-2 mr-3 text-bold' onClick={() => { setCurrentPatient(true) }} 
                                                                style={{ 'border-bottom': currentPatient ? "4px solid black" : "none" }}>
                                                                        <b>Patients</b></span>

                                                                <span className='d-inline-block p-2 text-bold' onClick={() => { setCurrentPatient(false) }} 
                                                                style={{ 'border-bottom': currentPatient ? "none" : "4px solid black" }}><b>Recovered Patients</b></span>
                                                        </div>
                                                        <div className='col text-end'>
                                                                <button className='btn btn-success' onClick={handleShow}>Add New Patient</button>
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                        <div className='col'>
                                                                <div>
                                                                        {currentPatient ? <Patienttable /> : <Rpatienttable /> }
                                                                </div>
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                        <div>
                                                                <Modal show={show} onHide={handleClose}>
                                                                        <Modal.Header closeButton>
                                                                        <Modal.Title>Add New Patient</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                                <div>
                                                                                        <Form />
                                                                                </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                        <Button variant="secondary" onClick={handleClose}>
                                                                                Cancel
                                                                        </Button>
                                                                        <Button variant="primary" onClick={handleBciShow}>
                                                                                Add Patients
                                                                        </Button>
                                                                        </Modal.Footer>
                                                                </Modal>
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                        <div>
                                                                <Modal size="lg" show={showBci} onHide={handleBciClose}>
                                                                        <Modal.Header closeButton>
                                                                        <Modal.Title>BCI Caliberation</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                                        <div>
                                                                                                <Bci />
                                                                                        </div>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                        <Button variant="secondary" onClick={handleBciClose}>
                                                                                Close
                                                                        </Button>
                                                                        <Button variant="primary" onClick={handleCCShow}>
                                                                                Save Changes
                                                                        </Button>
                                                                        </Modal.Footer>
                                                                </Modal>
                                                        </div>
                                                </div>
                                                <div className='row'>
                                                        <div>
                                                                <Modal show={showCC} onHide={handleCCClose}>
                                                                        <Modal.Header closeButton>
                                                                        <Modal.Title>Headset Contact Quality</Modal.Title>
                                                                        </Modal.Header>
                                                                                <Modal.Body>
                                                                                                <div>
                                                                                                        <HCQ />
                                                                                                </div>
                                                                                </Modal.Body>
                                                                        <Modal.Footer>
                                                                                <Button variant="secondary" onClick={handleCCClose}>
                                                                                        Show Plot Data
                                                                                </Button>
                                                                                <Link to="/trialmain">
                                                                                        <Button variant="primary">
                                                                                                Continue
                                                                                        </Button>
                                                                                </Link>
                                                                        </Modal.Footer>
                                                                </Modal>
                                                        </div>
                                                </div>
                                        </div>
                        </main>
                </div>

            
        
        </>
    );
}


export default Patient;