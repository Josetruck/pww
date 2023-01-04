import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../context/UserContext';
import Badge from 'react-bootstrap/esm/Badge';



function ModalReq(props) {
    const { user } = useContext(UserContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [requests, setRequests] = useState([])
    const [reqload, setReqload] = useState(false)

    useEffect(() => {
        if (!reqload) {
            fetch(`/getUserRequestIn/${user.id}`).then(res => res.json()).then(async (res) => {
                const requestInfo = await res.filter(request => {
                    if (!request.status) {
                        const requestModif = request;
                        fetch(`/getUserById/${request.fk_id_from}`).then(e => e.json()).then(e => {
                            requestModif.user_name = e.user_name
                        })
                        return requestModif
                    }
                })
                console.log(requestInfo)
                setRequests(requestInfo)
                setReqload(true)
            })
        }
    })

    const handleAccept = (id) => {
        fetch("/requestResponse", {
            method: "post",
            body: JSON.stringify({ id: id, response: "accepted" }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            if (res) {
                setRequests([])
                setReqload(false)
            }
        })
        props.setLoad(false)
    }
    const handleDeny = (id) => {
        fetch("/requestResponse", {
            method: "post",
            body: JSON.stringify({ id: id, response: "denied" }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            if (res) {
                setRequests([])
                setReqload(false)
            }
        })
        props.setLoad(false)
    }


    return (
        <>
            <div onClick={handleShow}>
                Solicitudes{props.numNotifications > 0 && (
                    <Badge pill bg="danger">{props.numNotifications}</Badge>
                )}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {requests && requests.map((request, i) => {
                        if (!request.req_status) {
                            return <div key={i}>
                                <a href={`/profile/${request.fk_id_from}`}><h4>{request.user_name}</h4></a>
                                <p>{request.req_date}</p>
                                <button className='btn btn-success' onClick={() => handleAccept(request.id)}>Aceptar</button>
                                <button className='btn btn-danger' onClick={() => handleDeny(request.id)}>Rechazar</button>
                            </div>
                        }
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalReq