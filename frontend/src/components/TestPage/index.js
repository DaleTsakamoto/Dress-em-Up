import LoginFormModal from '../LoginFormModal'
import {NavLink} from 'react-router-dom'


const Test = ({ isLoaded }) => {
  return (
    <div className={"nav__container"}>
      <LoginFormModal />
      <div className={"nav__div-home"}>
        <button className={"nav__home-button"}>
          <NavLink exact to="/" >
            Home
              </NavLink>
        </button>
      </div>
    </div>
  )
}

export default Test;