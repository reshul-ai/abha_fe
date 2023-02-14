import react,{useState, useEffect} from 'react';
import brainAlive from "../QDIC/brainalive_contact_8.png"
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const TrialPage02 = () => {

    useEffect(() => {
            setTimeout(()=> {
                    handleShow();
            }, 5000)
    }, []);
    

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
                                <div className='col'></div>
                                <div className='col text-center'><h3>Caliberation Trial</h3></div>
                                <div className='col text-end'><img src={brainAlive} width="252px" /></div>
                        </div>
                        <div className='row'>

                                    <Modal show={show} onHide={handleClose} centered>
                                            <Modal.Header closeButton style={{"borderColor":"white"}} >
                                                <Modal.Title>Finish Calibration?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className='row'>
                                                            <div className='col'>
                                                                    <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                            
                                                                                    <Button variant="secondary" onClick={() => {window.location.reload()}} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                        Restart Calibration
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
                                                <Modal.Title>Saved Successfully</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
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
            </div>

        </>
    );
}


export default TrialPage02;