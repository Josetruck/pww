import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../context/UserContext';


function ModalConfirmFriend(props) {
    const [show, setShow] = useState(false);
    const {user} = useContext(UserContext)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deleteFriend(id) {
        console.log("user:::::",user)
        console.log("ID TO::::::",id)
        fetch(`/friend/id_from/${user.id}/id_to/${id}`, {method: "DELETE"}).then(res=>res.json()).then(res=>{
            console.log(res)
            if(res){
                setShow(false)
                props.setLoad(false)
                props.update(id)
            }})
    }


    return (
        <>


            <Button className='btn btn-secondary'
                onClick={handleShow}>Eliminar</Button>


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
                    <Modal.Title>Borrar Amigo/a</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Seguro que quieres eliminar a este Amigo/a?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                       Cerrar
                    </Button>
                    <Button variant="dark" onClick={() => { deleteFriend(props.id) }}>
                       Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmFriend