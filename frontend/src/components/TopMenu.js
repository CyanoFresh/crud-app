import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BugIcon from '@material-ui/icons/BugReport';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Product Sans',
    fontWeight: 'normal',
  },
  toolbar: theme.mixins.toolbar,
}));

const TopMenu = ({ logout, user, handleDrawerToggle }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          onClick={handleDrawerToggle}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Solomaha Home
        </Typography>
        <div>
          <IconButton
            color="inherit"
            component={Link}
            to={`/debug`}
          >
            <BugIcon/>
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                width: 200,
              },
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem component={Link} to={`/users/${user.id}`}>Profile</MenuItem>
            <MenuItem onClick={logout}>Log Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, { logout })(TopMenu);
