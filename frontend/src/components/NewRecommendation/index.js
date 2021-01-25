import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Modal } from '../../context/Modal';
import NewRecommendation from './NewRecommendation';
import '../Header/Header.css'; 

import * as userActions from '../../store/users';

function NewRecommendationModal() {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false); 
    const sessionUser = useSelector(state => state.session.user)
    // const [hidden, setHidden] = useState(true);

    return(
        <div className='header-new-recommendation-container'>
            <div className='header-text-logo-container'>
                <img className="header-text-logo" src="./images/Text-Logo-02.png" />
            </div>
            <a className='header-new-recommendation-navlinks' href="https://github.com/DaleTsakamoto/Dress-em-Up">
            <div className='github-logo-container'>
                <i class="fab fa-github" />
                <p>Repo</p>
                </div>
            </a>
            <Modal open={showModal} onClose={() => setShowModal(false)} >
                    <NewRecommendation open={showModal} onClose={() => setShowModal(false)} />
            </Modal>
            <div onClick={() => {
                setShowModal(true)
            }} className='header-description-category'>
              <i class="fas fa-sticky-note"></i>
              <p>Recommend</p>
                    </div>
        </div>
    );
}

export default NewRecommendationModal;


