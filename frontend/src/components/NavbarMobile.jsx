import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './NavbarMobile.css'

const NavbarMobile = () => {
  return (
    <div className='navbar-mobile'>
      <Link to='/'>
        <div className='navbar-mobile_item'>
            <FontAwesomeIcon icon={faHome} className='navbar-mobile-icon'/>
            Home
        </div>
        </Link>
        <Link to='/automations'>
        <div className='navbar-mobile_item'>
        <FontAwesomeIcon icon={faTachometerAlt} className='navbar-mobile-icon' />
            Automation
        </div>
        </Link>
        <Link to='/settings'>
        <div className='navbar-mobile_item'>
        <FontAwesomeIcon icon={faCog} className='navbar-mobile-icon'/>
            Settings
        </div>
      </Link>
        
        
        
    </div>
  )
}

export default NavbarMobile