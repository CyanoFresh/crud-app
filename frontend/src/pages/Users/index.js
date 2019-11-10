import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UsersPage from './UsersPage';
import UserPage from './UserPage';

function UsersIndexPage() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <UserPage/>
      </Route>
      <Route path={match.path}>
        <UsersPage/>
      </Route>
    </Switch>
  );
}

export default UsersIndexPage;
