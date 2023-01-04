import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ModalConfirm(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deleteImage(_id) {
        fetch(`/image/${_id}`, "DELETE").then(res=>res.json()).then(res=>console.log(res))
    }


    return (
        <>


            <Button className='btn btn-secondary'
                onClick={handleShow}><FontAwesomeIcon icon={faTrash} /></Button>


            <Modal 
            show={show} 
            onHide={handleClose} 
            backdrop="static"
                keyboard={false}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90w"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Seguro que quieres eliminar esta foto?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { deleteImage(props.image._id) }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm