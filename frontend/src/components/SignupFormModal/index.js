import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import '../SplashPage/SplashPage.css'; 

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false); 
    const [hidden, setHidden] = useState(true)

    return (
        <>
            <button onClick={() => setShowModal(true)} className="homepage-buttons log-in">
            <p>SIGN UP</p>
            </button>
            <Modal open={showModal} onClose={() => {
                if (hidden) {
                    setHidden(false)
                }
                setShowModal(false)
                }
            }
            >
                <SignupForm hidden={hidden} setHidden={setHidden} open={showModal} />
            </Modal>
        </>
    );
}

export default SignupFormModal;


