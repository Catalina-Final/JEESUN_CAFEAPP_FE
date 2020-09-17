import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "../DashboardPage";
import PublicLayout from "../layouts/PublicLayout";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/dashboard"
        component={DashboardPage}
        isAuthenticated={true}
      />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};

export default Routes;
