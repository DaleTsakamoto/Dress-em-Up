import React from 'react';
import './Modal.css'; 

export function Modal({ open, children, onClose }) {
    // if (!open) return null; 

    return (
        <div>
            {open ? 
            <>
                <div className='modal-overlay' onClick={onClose} />
            </>
                :
                null
            }
                <div>
                    {children}
                    </div>
        </div>
    )
}