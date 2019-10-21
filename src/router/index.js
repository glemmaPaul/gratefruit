import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history'

// Pages
import GratefulForm from "../pages/GratefulPage";
import Log from "../pages/PastLogsPage";

export const history = createBrowserHistory();

// Todo - setup private/public routes
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" component={GratefulForm} />
      <Route path="/logs" component={Log} />
    </div>
  </Router>
);

export default AppRouter;
