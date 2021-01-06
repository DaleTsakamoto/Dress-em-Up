import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import '../HomePage/HomePage.css'; 

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <button onClick={() => setShowModal(true)} className="homepage-buttons log-in">
            <p>LOG IN</p>
            </button>
            <Modal open={showModal} onClose={() => setShowModal(false)} >
                <LoginForm open={showModal} />
            </Modal>
        </>
    );
}

export default LoginFormModal;


