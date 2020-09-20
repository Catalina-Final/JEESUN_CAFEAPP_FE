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
import MasterPage from "../MasterPage";
import PublicFooter from "../PublicFooter";
import AddEditShopPage from "../AddEditShopPage";
import PrivateRoute from "../Routes/PrivateRoute";
import AlertMsg from "./AlertMsg";
import NotFoundPage from "../../containers/layouts/NotFoundPage";
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

        <Route exact path="/searchresult" component={SearchResultPage} />

        <Route exact path="/gears" component={GearsPage} />
        <Route exact path="/master" component={MasterPage} />

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
