import react,{useState} from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Endparadigm = () => {

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
                <Modal.Header closeButton>
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
                </Modal.Body>
                <Modal.Footer>
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
                </Modal.Footer>
            </Modal>
        
        </>
    );
}


export default Endparadigm;