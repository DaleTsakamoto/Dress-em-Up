import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import { Modal } from '../../context/Modal';
import NewRequest from './NewRequest';
import '../Header/Header.css'; 

function NewRequestModal() {
    const [showModal, setShowModal] = useState(false); 
    const [designerId, setDesignerId] = useState(null)
    const sessionUser = useSelector(state => state.session.user)

    return(
        <div className='header-new-request-container'>
            <div className='header-text-logo-container'>
                <img className="header-text-logo" src="./images/Text-Logo-Grayscale.png" />
            </div>
            <a className='header-new-request-navlinks' href="https://github.com/DaleTsakamoto/Dress-em-Up">
            <div className='github-logo-container'>
                <i class="fab fa-github" />
                <p>Repo</p>
                </div>
            </a>
            {sessionUser.userType ?
            <>
            <Modal open={showModal} onClose={() => setShowModal(false)} >
                <NewRequest open={showModal} onClose={() => setShowModal(false)} designerId={designerId} setDesignerId={ setDesignerId}/>
            </Modal>
            <div onClick={() => {
                setShowModal(true)
            }} className='header-home-category'>
              <i className="fab fa-shopify"></i>
              <p>Request</p>
                    </div>
                </>
                :
                null  
        }
        </div>
    );
}

export default NewRequestModal;


