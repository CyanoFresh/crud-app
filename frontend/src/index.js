import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route, Link,
} from 'react-router-dom';
import store from './store';
import Users from './pages/Users';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <App/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/about">
          <h1>About</h1>
        </Route>
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
