import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { ROUTER_PATH } from '../constants';
import Accounts from '../components/Accounts/Accounts';
import Incomes from '../components/Incomes/Incomes';
import Costs from '../components/Costs/Costs';
import Graph from '../components/Graph/Graph';
import ErrorPage from '../components/ErrorPage';

export default () => (
  <Router>
    <Switch>
      <Route exact path={ROUTER_PATH[0].url} component={Accounts} />
      <Route exact path={ROUTER_PATH[1].url} component={Incomes} />
      <Route exact path={ROUTER_PATH[2].url} component={Costs} />
      <Route exact path={ROUTER_PATH[3].url} component={Graph} />
      <Route component={ErrorPage} />			
    </Switch>
  </Router>
);

// <Route component={ErrorPage} />
// <Redirect to={ROUTER_PATH[0].url} />