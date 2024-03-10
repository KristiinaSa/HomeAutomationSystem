import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import './NavbarMobile.css'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const NavbarMobile = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
    }
  }

  return (
    <div className='navbar-mobile'>
      <NavLink to='/' className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}
      onClick={(e) => {handleClick(e)}}
      >
        <div className='navbar-mobile_item'>
            <FontAwesomeIcon icon={faHome} className='navbar-mobile-icon'/>
            Home
        </div>
        </NavLink>
        <NavLink to='/automations' className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}
      onClick={(e) => {handleClick(e)}}
      >
        <div className='navbar-mobile_item'>
        <FontAwesomeIcon icon={faTachometerAlt} className='navbar-mobile-icon' />
            Automation
        </div>
        </NavLink>
        <NavLink to='/settings' className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}
      onClick={(e) => {handleClick(e)}}
      >
        <div className='navbar-mobile_item'>
        <FontAwesomeIcon icon={faCog} className='navbar-mobile-icon'/>
            Settings
        </div>
      </NavLink>
        
        
        
    </div>
  )
}

export default NavbarMobile