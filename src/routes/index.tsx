import React from "react";
import { Switch } from "react-router";
import { Route } from 'react-router-dom';
import { NotFound } from "../components/NotFound";
import Routes from "./urls";

const routes = (
  <Switch>
    <Route
      exact
      path={Routes.Home}
      component={NotFound}
    />

    <Route
      path={Routes.All}
      component={NotFound}
    />
  </Switch>
);

export default routes;
