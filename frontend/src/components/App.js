import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import PrivateRoute from './PrivateRoute';
import PrivateApp from './PrivateApp';
import SignIn from '../pages/SignIn';
import { connect } from 'react-redux';

function App({isLoggedIn}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Switch>
        <Route path="/login" exact component={SignIn}/>
        <PrivateRoute path="/" component={PrivateApp} auth={isLoggedIn}/>
      </Switch>
    </ThemeProvider>
  );
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
});

export default connect(mapStateToProps)(App);
