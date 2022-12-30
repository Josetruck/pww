import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { defaultFetch } from '../helpers/defaultFetch';
import UserContext from '../context/UserContext';



function ModalImg(props) {
    const user = useContext(UserContext)
    const image = props.img
    const coments = image.coments
    console.log(image)
    console.log(coments)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [address, setAddress] = useState(null);
    const [text, setText] = useState("")
    console.log(image)
    console.log(user)

    const fetchAddress = async (coordinates) => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[0]}&lon=${coordinates[1]}`
        );
        const data = await response.json();
        setAddress(data.display_name);
    };

    fetchAddress(image.location)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.length > 0){
            const datos = {
                _id:image._id,
                id_user: user.user.id,
                user_name: user.user.user_name,
                text: text
            }
            defaultFetch("/addComment","POST",datos).then(res=>console.log(res))
        }

    }

    function deleteComent(_id, _id_coment){
        const body = {_id, _id_coment}
        defaultFetch("/deleteComent","POST", body)
    }

    return (
        <>
            <div onClick={handleShow}>
                <img className="imgMap" src={`http://localhost:5000/Images/${image.id_user}/${image.url}`} alt={image.alt} />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <img className='imgModal' src={`http://localhost:5000/Images/${image.id_user}/${image.url}`} alt={image.alt} />
                    <div className='imgFoot'>
                        <h4>{image.date}</h4>
                        <p>{address}</p>
                    </div>
                    {coments && <div>
                        {coments.map((comment) => {
                            return <div>
                                <a href={`/profile/${comment.id_user}`}><h4>{comment.user_name}</h4></a>
                                <h6>{comment.date}</h6>

                                <p>{comment.text}</p>
                                {user.user.id == comment.id_user&& <div><button className='btn btn-secondary' onClick={()=>{deleteComent(image._id, comment._id)}}>Borrar comentario</button></div>}
                            </div>
                        })}
                    </div>}
                    {
                        <form id="coment" onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input className="form-control marginadoTop" type="text" onChange={(e)=>setText(e.target.value)}/>
                            <button  className="btn btn-primary marginadoTop" type='submit'>comentar</button>
                        </div>
                        </form>
                    }




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

export default ModalImg