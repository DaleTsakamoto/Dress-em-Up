import React from 'react'
import NewRequestModal from '../NewRequest/index.js'

import './Header.css'

const Header = () => {

  return (
    <div className='header-container pattern-cross-dots-lg'>
      <NewRequestModal />
    </div>
  );
}

export default Header;