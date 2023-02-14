import react,{useState} from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Fini = () => {

    const [show, setShow] = useState(false);
    const [feedback, setFeedback] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Feedback submitted');
    }


    return (
        <>
        
            <Button variant="primary" onClick={handleShow}>
                End
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{"borderColor":"white"}} >
                <Modal.Title>Saved Successfully</Modal.Title>
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
                                                                    
                                                                            <Button variant="secondary" onClick={handleRMPShow} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                                                Restart Calibration
                                                                            </Button>
                                                                  
                                                            </div></div>
                                                    <div className='col'>
                                                            <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                                                   
                                                                            <Button variant="primary" onClick={handleEPClose} style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                                                Save Calibration Data
                                                                            </Button>
                                                                    
                                                            </div></div></div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Link to="/tp1">
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
        
        </>
    );
}


export default Fini;