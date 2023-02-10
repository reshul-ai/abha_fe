import react from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Saveparadigm = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
        
            <Button variant="primary" onClick={handleShow}>
                Save Paradigm
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Saved Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                <Link to="/tp01">
                
                        <Button variant="secondary" onClick={handleClose}>
                            Re-run paradigm
                        </Button>

                </Link>
                <Link to="/endparadigm">
                        <Button variant="primary" onClick={handleClose}>
                            End paradigm and Save Data
                        </Button>
                </Link>
                </Modal.Footer>
            </Modal>
        
        </>
    );
}


export default Saveparadigm;