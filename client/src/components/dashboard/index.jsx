import { List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet, Link as RouterLink } from "react-router-dom";

const Dashboard = () => {
  const users = useSelector(state => state.users);
  return (
    <div className="row adminLayout">
      <nav className='col-md-2 d-none d-md-block sidebar'>
        <div>
          <List>
            <ListItem button component={RouterLink} to="/dashboard/profile">
              <ListItemText primary="Profile" />
            </ListItem>

            {users.data.role === "admin" ?
              <ListItem button component={RouterLink} to="/dashboard/articles">
                <ListItemText primary="Articles" />
              </ListItem>
              : null
            }
          </List>
        </div>
      </nav>
      <main role="main" className='col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard;