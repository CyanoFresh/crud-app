import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { socketConnect, socketDisconnect } from '../redux/actions/socket';
import Home from '../pages/Home';
import Users from '../pages/Users';
import TopMenu from './TopMenu';
import Drawer from './Drawer';
import NoMatch from './NoMatch';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  toolbar: theme.mixins.toolbar,
}));

const PrivateApp = ({ socketConnect, socketDisconnect }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    socketConnect();

    return () => socketDisconnect();
  }, [socketConnect, socketDisconnect]);

  return (
    <div className={classes.root}>
      <TopMenu handleDrawerToggle={handleDrawerToggle}/>
      <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>

      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/users">
            <Users/>
          </Route>
          <Route component={NoMatch}/>
        </Switch>
      </main>
    </div>
  );
};

export default connect(null, { socketConnect, socketDisconnect })(PrivateApp);
