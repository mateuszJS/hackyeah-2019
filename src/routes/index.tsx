import React from "react";
import { Switch } from "react-router";
import { Route } from 'react-router-dom';
import { NotFound } from "../components/NotFound";
import FiltersView from "../components/Filter";
import Destinations from "../components/Destinations";
import Routes from "./urls";
import Choice from "../components/Choice/Choice";

const routes = (
  <Switch>
    <Route
      exact
      path={Routes.Home}
      component={Choice}
    />

    <Route
      exact
      path={Routes.Home}
      component={Choice}
    />

    <Route
      path={Routes.Filter}
      component={FiltersView}
    />

    <Route
      path={Routes.Destinations}
      component={Destinations}
    />

    <Route
      path={Routes.All}
      component={NotFound}
    />
  </Switch>
);

export default routes;
