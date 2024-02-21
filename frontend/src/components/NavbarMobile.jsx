import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import './NavbarMobile.css'

const NavbarMobile = () => {
  return (
    <div className='navbar-mobile'>
      <NavLink to='/' className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}>
        <div className='navbar-mobile_item'>
            <FontAwesomeIcon icon={faHome} className='navbar-mobile-icon'/>
            Home
        </div>
        </NavLink>
        <NavLink to='/automations' className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}>
        <div className='navbar-mobile_item'>
        <FontAwesomeIcon icon={faTachometerAlt} className='navbar-mobile-icon' />
            Automation
        </div>
        </NavLink>
        <NavLink to='/settings' className={({ isActive}) => 
      isActive ? "active" : "navbar-link"}>
        <div className='navbar-mobile_item'>
        <FontAwesomeIcon icon={faCog} className='navbar-mobile-icon'/>
            Settings
        </div>
      </NavLink>
        
        
        
    </div>
  )
}

export default NavbarMobile