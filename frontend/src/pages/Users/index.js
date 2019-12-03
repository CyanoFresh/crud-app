import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Users from './Users';
import User from './User';

export default () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <User/>
      </Route>
      <Route path={match.path}>
        <Users/>
      </Route>
    </Switch>
  );
}
