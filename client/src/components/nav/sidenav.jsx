import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { signOut } from '../../store/reducers/users';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DehazeIcon from '@mui/icons-material/Dehaze';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

const SideDrawer = () => {
  const [state, setState] = useState(false);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <>
      <DehazeIcon className='drawer_btn' onClick={() => setState(true)} />

      <Drawer anchor='right' open={state} onClose={() => setState(false)}>
        <Box sx={{ width: 200 }}>
          <List>
            <ListItem button component={RouterLink} to="/" onClick={() => setState(false)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button component={RouterLink} to="/contact" onClick={() => setState(false)}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>

            {!users.auth ?
              <ListItem button component={RouterLink} to="/auth" onClick={() => setState(false)}>
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Sign in" />
              </ListItem>
              :
              <ListItem button onClick={() => {
                dispatch(signOut());
                setState(false);
                navigate("/");
              }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItem>
            }
            <>
              <Divider />
              {users.auth ?
                <ListItem button component={RouterLink} to="/dashboard" onClick={() => setState(false)}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                : null}
            </>
          </List>
        </Box>
      </Drawer >
    </>
  )
}

export default SideDrawer;