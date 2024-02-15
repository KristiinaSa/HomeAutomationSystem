import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import './NavbarMobile.css'

const NavbarMobile = () => {
  return (
    <div className='navbar-mobile'>
        <div className='navbar-mobile_item'>
            <FontAwesomeIcon icon={faHome} className='navbar-mobile-icon'/>
            Home
        </div>
        <div className='navbar-mobile_item'>
        <FontAwesomeIcon icon={faTachometerAlt} className='navbar-mobile-icon' />
            Automation
        </div>
        <div className='navbar-mobile_item'>
        <FontAwesomeIcon icon={faCog} className='navbar-mobile-icon'/>
            Settings
        </div>
        
        
        
    </div>
  )
}

export default NavbarMobile