import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import UsersIcon from '@material-ui/icons/People';
import UserIcon from '@material-ui/icons/AccountBox';
import ListItemText from '@material-ui/core/ListItemText';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

const DrawerContent = ({ user, logout }) => {
  return (
    <React.Fragment>
      <List>
        <ListItem button component={Link} to={`/`}>
          <ListItemIcon><DashboardIcon/></ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button component={Link} to={`/users`}>
          <ListItemIcon><UsersIcon/></ListItemIcon>
          <ListItemText primary="Users"/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button component={Link} to={`/users/${user.id}`}>
          <ListItemIcon><UserIcon/></ListItemIcon>
          <ListItemText primary="Profile"/>
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon><LogoutIcon/></ListItemIcon>
          <ListItemText primary="Logout"/>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

const mapDispatchToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapDispatchToProps, { logout })(DrawerContent);
