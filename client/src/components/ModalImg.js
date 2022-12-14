import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { defaultFetch } from '../helpers/defaultFetch';
import UserContext from '../context/UserContext';
import { faL, faLocationCrosshairs, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalConfirm from './ModalConfirm';



function ModalImg(props) {
    const {user} = useContext(UserContext)
    const image = props.img
    const coments = image.coments
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [text, setText] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.length > 0) {
            const datos = {
                _id: image._id,
                id_user: user.id,
                user_name: user.user_name,
                text: text
            }
            defaultFetch("/addComment", "POST", datos).then(()=>props.setLoad(false)).then(()=>{
                props.setLoad(false)
            })
        }
        setText("");

    }

    function deleteComent(_id, _id_coment) {
        const body = { _id, _id_coment }
        defaultFetch("/deleteComent", "POST", body).then(props.setLoad(false))

    }

    return (
        <>
            <div onClick={handleShow}>
                <img className={props.classImg} src={`http://localhost:5000/Images/${image.id_user}/${image.url}`} alt={image.alt} />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <img className='imgModal' src={`http://localhost:5000/Images/${image.id_user}/${image.url}`} alt={image.alt} />
                    <div className='imgFoot'>
                        <div className='titleAndDelete'>
                            <h3>{image.title}</h3>
                        {user.id == image.id_user && <ModalConfirm image={image} setImgShow={setShow} setLoad={props.setLoad}/> }
                        </div>
                        <h6>{image.date}</h6>
                        <div className='rowaddres'>
                        <FontAwesomeIcon icon={faLocationDot} className="iconito"/>
                        <p>{image.address}</p></div>
                    </div>
                    {coments && <div>
                        {coments.map((comment, i) => {
                            return <div key={i} className="comentario">
                                <div className='flexrow'>
                                <a href={`/profile/${comment.id_user}`}><h4>{comment.user_name}</h4></a>
                                <p className='subcomentario'>{comment.date}</p>
                                </div>
                                <p>{comment.text}</p>
                                {user.id == comment.id_user && <div className='align-right'>
                                    <a className='borrarcomentario'
                                        onClick={() => { deleteComent(image._id, comment._id) }}>Borrar comentario</a>
                                </div>}
                            </div>
                        })}
                    </div>}
                    {
                        <form id="coment" onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <input className="form-control marginadoTop" 
                                type="text" 
                                onChange={(e) => setText(e.target.value)} 
                                value={text} />
                                <button className="btn btn-secondary marginadoTop" type='submit'>comentar</button>
                            </div>
                        </form>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalImg