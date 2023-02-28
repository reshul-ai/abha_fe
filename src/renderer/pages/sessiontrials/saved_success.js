import react, {useState} from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Savedsuccess = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
        
            <Button variant="primary" onClick={handleShow}>
                Save
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Saved Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Using Modal Body</h1>
                </Modal.Body>
                <Modal.Footer>
                <Link to="/patients">
                
                        <Button variant="secondary" onClick={handleClose}>
                            Patient Dashboard
                        </Button>

                </Link>
                <Link to="/home">
                        <Button variant="primary" onClick={handleClose}>
                            Home
                        </Button>
                </Link>
                </Modal.Footer>
            </Modal>
        
        </>
    );
}


export default Savedsuccess;