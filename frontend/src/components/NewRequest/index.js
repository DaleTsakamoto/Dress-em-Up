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
    // const [hidden, setHidden] = useState(true);

    return(
        <>
            <div onClick={() => {
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


