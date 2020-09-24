import React from "react";
import { Route, Switch } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
// import DashboardPage from "../DashboardPage";
import PublicLayout from "../layouts/PublicLayout";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={PublicLayout} />
      {/* <PrivateRoute
        exact
        path="/dashboard"
        component={DashboardPage}
        isAuthenticated={true}
      /> */}
    </Switch>
  );
};

export default Routes;
