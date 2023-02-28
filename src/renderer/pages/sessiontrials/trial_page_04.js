import react,{useState} from 'react';
import { useEffect } from 'react';
import brainAlive from "../../assets/brainalive_contact_8.png"
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import SessionBci from './SessionBci';
import Brianimg from '../brianimg/brainimg';

const TrialPage04 = () => {

    useEffect(()=>{
            setTimeout(() => {
                    handleShow();
                    // handleEPShow()
                    // handleSSShow();
            }, 5000)
    },[])

    const [show, setShow] = useState(false);
    const [showEP, setShowEP] = useState(false);
    const [showSS, setShowSS] = useState(false);
    const [showRMP, setShowRMP] = useState(false);
    

    const handleClose = () => {
        setShow(false);
        handleEPShow();
    }
    const handleShow = () => setShow(true);

    const handleEPClose = () => {
        setShowEP(false);
        handleSSShow()
    }
    const handleEPShow = () => setShowEP(true);

    const handleSSClose = () => setShowSS(false);
    const handleSSShow = () => setShowSS(true);

    const handleRMPClose = () => setShowRMP(false);
    const handleRMPShow = () => setShowRMP(true);

    // End paradigm
    const [feedback, setFeedback] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Feedback submitted');
    }

    return (
        <>
        
            <div className='container-fluid'>
                        <div className='row'>
                                <div className='col'></div>
                                <div className='col text-center'></div>
                                <div className='col text-end'><Brianimg /></div>
                        </div>
                        <div className='row'>
                                <Modal show={show} onHide={handleClose} centered>
                                    <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }}>
                                    <Modal.Title><h5 className='pt-3 ps-2'>Save Paradigm?</h5></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{"padding":0, "margin":0}}>
                                        <div className='row ps-3 pe-3'>
                                                    <div className='col'>
                                                            <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                    <Link to="/trialmain">

                                                                            <Button variant="secondary" onClick={() => {window.location.reload(false);}} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                Re-run paradigm
                                                                            </Button>

                                                                    </Link>
                                                            </div></div>
                                                    <div className='col'>
                                                            <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                    <Button variant="primary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                        <small>End paradigm & Save Data</small>
                                                                    </Button>
                                                            </div></div></div>
                                    </Modal.Body>

                                </Modal>
                        </div>

                        <div className='row'>
                                <Modal show={showEP} onHide={handleEPClose} centered >
                                    <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }} >
                                    <Modal.Title><h5 className='pt-3 ps-2'>End Paradigm</h5></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleSubmit}>
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
                                                        placeholder="Therapist's feedback or comments"
                                                    />
                                            </div>
                                        </form>

                                        <div className='row'>
                                                    <div className='col'>
                                                            <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                    
                                                                            <Button variant="secondary" onClick={handleRMPShow} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                Run more paradigm
                                                                            </Button>
                                                                  
                                                            </div></div>
                                                    <div className='col'>
                                                            <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                   
                                                                            <Button variant="primary" onClick={handleEPClose} style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                Save Feedback
                                                                            </Button>
                                                                    
                                                            </div></div></div>
                                    </Modal.Body>
                                </Modal>
                        </div>


                        <div className='row'>
                                <Modal show={showSS} onHide={handleSSClose} centered >
                                    <Modal.Header closeButton style={{"borderColor":"#fff"}}>
                                    <Modal.Title><h5 className='pt-3 ps-2'>Saved Successfully</h5></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{"padding":0, "margin":0}}>
                                                <div className='row'>
                                                        <div className='col'>
                                                                <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                        <Link to="/patients">
                                                                                <Button variant="secondary" style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                Patient Dashboard
                                                                                </Button>
                                                                        </Link>
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

                        <div className='row'>
                        <Modal size="lg" show={showRMP} onHide={handleRMPClose}>
                                                                        <Modal.Header closeButton style={{'border-color':'#FFFFFF'}}>
                                                                        <Modal.Title><h5 className='pt-3 ps-2'>Upcomming Session-SES112</h5></Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body style={{"padding":0, "margin":0}}><div >
                                                                        <div className='row pt-3 pb-2 px-3'>
                                                        <div className='col Assessments-label' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row'><div className='col'>Session ID</div></div>
                                                                <div className='row Assessments-labelValue'><div className='col'>SES112</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3'>Patient</div>
                                                                <div className='row Assessments-labelValue ps-3'>Patient 01</div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3'>Start Time</div>
                                                                <div className='row Assessments-labelValue ps-3'>4:00 PM</div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "2px solid grey"}}>
                                                                <div className='row ps-3'>Duration</div>
                                                                <div className='row Assessments-labelValue ps-3'>60 mins</div>
                                                        </div>
                                                        <div className='col Assessments-label border-left'>
                                                                <div className='row ps-3'>MI Accuracy</div>
                                                                <div className='row Assessments-labelValue ps-3'>--</div>
                                                        </div>
                                                </div>   <div className='row pt-3 pb-2 px-3'>
                                                        <div className='col Assessments-label' >
                                                                <div className='row'><div className='col'>Choose and run a Paradigm:</div></div>
                                                                
                                                        </div></div>
                                                                        </div>
                                                                                        <div>
                                                                                                <SessionBci />
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

        </>
    );
}


export default TrialPage04;