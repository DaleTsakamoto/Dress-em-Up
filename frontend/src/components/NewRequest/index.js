import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewRequest from './NewRequest';
import '../Header/Header.css'; 

function NewRequestModal() {
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <div onClick={() => setShowModal(true)} className='header-home-category'>
              <i className="fab fa-shopify"></i>
              <p>Request</p>
            </div>
            <Modal open={showModal} onClose={() => setShowModal(false)} >
                <NewRequest open={showModal} onClose={() => setShowModal(false)} />
            </Modal>
        </>
    );
}

export default NewRequestModal;


