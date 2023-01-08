import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../context/UserContext';
import Badge from 'react-bootstrap/esm/Badge';
import { defaultFetch } from '../helpers/defaultFetch';
import ModalConfirmFriend from './ModalConfirmFriend';



function ModalFriends(props) {
    const { user, setUser } = useContext(UserContext)
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [friends, setFriends] = useState([])
    const [friendsData, setFriendsData] = useState(null)

    useEffect(() => {
        const friendList = user._doc.friend_list
        setFriends(friendList)
    }, [])

    useEffect(() => {
        defaultFetch("/getUserNames", "POST", { "ids": friends }).then((res) => {
            setFriendsData(res)
            setLoad(true)
        })
    }, [load])

    const update = (id) => {
        if (id) {
            var newFriends = friends.filter((e) => e != id)
            setFriends(newFriends)
            user._doc.friend_list = newFriends;
            setUser(user)
        }
    }


    return (
        <>
            <div onClick={handleShow}>
                Amigos
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {friendsData && friendsData.map((friend, i) => {
                        return <div key={i} className="titleAndDelete">
                            <h4>{friend.user_name}</h4>
                            <button className='btn btn-secondary'><ModalConfirmFriend id={friend.id} setLoad={setLoad} update={update} /></button>
                        </div>
                    })}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalFriends