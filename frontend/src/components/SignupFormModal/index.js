import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import '../SplashPage/SplashPage.css'; 

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <button onClick={() => setShowModal(true)} className="homepage-buttons log-in">
            <p>SIGN UP</p>
            </button>
            <Modal open={showModal} onClose={() => setShowModal(false)} >
                <SignupForm open={showModal} />
            </Modal>
        </>
    );
}

export default SignupFormModal;


