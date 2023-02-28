import react,{useState} from 'react';
import { useEffect } from 'react';
import brainAlive from "../../assets/brainalive_contact_8.png"
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const TrialPage04 = () => {

    useEffect(()=>{
            setTimeout(() => {
                    handleShow();
            }, 5000)
    },[])

    const [show, setShow] = useState(false);
    const [showEP, setShowEP] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEPClose = () => setShowEP(false);
    const handleEPShow = () => setShowEP(true);

    return (
        <>
        
            <div className='container-fluid'>
                        <div className='row'>
                                <div className='col'></div>
                                <div className='col text-center'><h3>Trial 04</h3></div>
                                <div className='col text-end'><img src={brainAlive} width="252px" /></div>
                        </div>
                        <div className='row'>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }}>
                                    <Modal.Title>Saved Successfully</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className='row'>
                                                    <div className='col'>
                                                            <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                    <Link to="/trialmain">

                                                                            <Button variant="secondary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
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
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton style={{ 'border-color': '#FFFFFF' }} >
                                    <Modal.Title>End Paradigm</Modal.Title>
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
                                                    />
                                            </div>
                                        </form>

                                        <div className='row'>
                                                    <div className='col'>
                                                            <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                                                    <Link to="/trialmain">

                                                                            <Button variant="secondary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
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
                                    {/* <Modal.Footer>
                                        <Link to="/trialmain">
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Run more paradigm
                                                </Button>
                                        </Link>
                                        <Link to="/trialsave">
                                                <Button type="submit" variant="primary" onClick={handleClose}>
                                                    Save Feedback
                                                </Button>
                                        </Link>
                                    </Modal.Footer> */}
                                </Modal>
                        </div>
            </div>

        </>
    );
}


export default TrialPage04;