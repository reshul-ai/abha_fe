import react,{useState, useEffect} from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

import Brianimg from '../brianimg/brainimg';

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
                                <div className='col text-center'><h3>Calibration Trial</h3></div>
                                <div className='col text-end'> <Brianimg /> </div>
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
                                                                            
                                                                                    <Button variant="secondary" onClick={() => {window.location.reload()}} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
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