import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./containers/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/actions";
import { ClipLoader } from "react-spinners";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated === undefined ? (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
          <ClipLoader color="#b7a986" size={150} loading={true} />
        </div>
      ) : (
        <Router>
          <Routes />
        </Router>
      )}
    </>
  );
}

export default App;
