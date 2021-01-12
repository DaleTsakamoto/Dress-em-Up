import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Modal } from '../../context/Modal';
import NewRequest from './NewRequest';
import '../Header/Header.css'; 

import * as userActions from '../../store/users';

function NewRequestModal() {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false); 
    const [designerId, setDesignerId] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
  
    const activateDesigners = async() => {
          dispatch(userActions.searchDesigners())
            .then((res) => {
              console.log("THIS IS THE RES!!??!!?!?!?!??!", res)
              setDesignerId(Object.values(res.data.designers)[0].id)
            })
}

    return(
        <>
            <div onClick={() => {
                activateDesigners()
                setShowModal(true)
            }} className='header-home-category'>
              <i className="fab fa-shopify"></i>
              <p>Request</p>
            </div>
            <Modal open={showModal} onClose={() => setShowModal(false)} >
                <NewRequest open={showModal} onClose={() => setShowModal(false)} designerId={designerId} setDesignerId={ setDesignerId}/>
            </Modal>
        </>
    );
}

export default NewRequestModal;


