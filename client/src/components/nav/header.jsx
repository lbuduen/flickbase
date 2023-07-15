import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import SideDrawer from './sidenav';

const Header = () => {
  const site = useSelector(state => state.site);

  return (
    <>
      <nav className={`navbar fixed-top ${site.layout}`}>
        <Link to="/" className='navbar-brand d-flex align-items-center fredoka_ff'>
          Flickbase
        </Link>
        <SideDrawer />
      </nav>
    </>
  )
}

export default Header;