import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import SideDrawer from './sidenav';

const Header = () => {
  const site = useSelector(state => state.site);
  const users = useSelector(state => state.users);

  return (
    <>
      {!users.data.verified && users.auth ?
        <div className="not_verified">
          Not verified
        </div>
        : null}
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