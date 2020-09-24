import React from "react";
import PublicNavbar from "../PublicNavbar";
// import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import RankingPage from "../RankingPage";
import SearchResultPage from "../SearchResultPage";
import EventPage from "../EventPage";
import ShopDetailPage from "../ShopDetailPage";
import EventDetailPage from "../EventDetailPage";
import AddEditEventPage from "../AddEditEventPage";
import GearsPage from "../GearsPage";
import BeansPage from "../BeansPage";
import TastePage from "../TastePage";
import MasterPage from "../MasterPage";
import CompanyPage from "../CompanyPage";
import PublicFooter from "../PublicFooter";
import AddEditShopPage from "../AddEditShopPage";
import PrivateRoute from "../Routes/PrivateRoute";
import AlertMsg from "./AlertMsg";
import NotFoundPage from "../../containers/layouts/NotFoundPage";
import DashboardPage from "../../containers/DashboardPage";
import { useSelector } from "react-redux";

const PublicLayout = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth.isAuthenticated);
  return (
    <>
      <PublicNavbar />
      {/* <Container> */}
      <AlertMsg />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />

        <Route exact path="/ranking" component={RankingPage} />
        <Route exact path="/shops/:id" component={ShopDetailPage} />

        <Route exact path="/events" component={EventPage} />
        <Route exact path="/events/:id" component={EventDetailPage} />

        <Route exact path="/search" component={SearchResultPage} />

        <Route exact path="/gears" component={GearsPage} />
        <Route exact path="/taste" component={TastePage} />
        <Route exact path="/beans" component={BeansPage} />
        <Route exact path="/master" component={MasterPage} />

        <Route exact path="/ourcompany" component={CompanyPage} />

        <PrivateRoute
          exact
          path="/dashboard"
          isAuthenticated={auth.isAuthenticated}
          component={DashboardPage}
        />

        <PrivateRoute
          exact
          path="/shop/add"
          isAuthenticated={auth.isAuthenticated}
          component={AddEditShopPage}
        />
        <PrivateRoute
          exact
          path="/shop/edit/:id"
          isAuthenticated={auth.isAuthenticated}
          component={AddEditShopPage}
        />

        <PrivateRoute
          exact
          path="/event/add"
          isAuthenticated={auth.isAuthenticated}
          component={AddEditEventPage}
        />

        <PrivateRoute
          exact
          path="/event/edit/:id"
          isAuthenticated={auth.isAuthenticated}
          component={AddEditEventPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
      {/* </Container> */}
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
