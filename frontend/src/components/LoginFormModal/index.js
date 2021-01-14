import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import '../SplashPage/SplashPage.css'; 

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false); 
    const [hidden, setHidden] = useState(true)

    return (
        <>
            <button onClick={() => setShowModal(true)} className="homepage-buttons log-in">
            <p>LOG IN</p>
            </button>
            <Modal open={showModal} onClose={() => {
                if (hidden) {
                    setHidden(false)
                }
                setShowModal(false)
                }
            }
            >
                <LoginForm hidden={hidden} setHidden={setHidden} open={showModal} />
            </Modal>
        </>
    );
}

export default LoginFormModal;


