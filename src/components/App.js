import React, { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassowrd";
import Signup from "./Signup";
import Home from "./Home";
import Navbar from "./navbar/Navigation";
import Comida from "./Comida";
import Comercio from "./Comercio";
import { AuthProvider, useAuth } from "./auth";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const LoginContainer = () => {
    return (
      <div>
        {/* <PrivateRoute exact path="/" component={Home} /> */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </div>
    );
  };

  const DefaultContainer = () => {
    return (
      <div>
        <Navbar />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/comida" component={Comida} />
        <PrivateRoute exact path="/comercio" component={Comercio} />
      </div>
    );
  };

  const PageNotFound = () => {
    return (
      <div className="container">
        <h1
          className="d-flex align-items-center justify-content-center"
          style={{ marginTop: "50px" }}
        >
          PAGE NOT FOUND
        </h1>
      </div>
    );
  };

  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path={"/login"} component={LoginContainer} />
          <Route exact path={"/signup"} component={LoginContainer} />
          <Route exact path={"/forgot-password"} component={LoginContainer} />
          <Route exact path={"/"} component={DefaultContainer} />
          <Route exact path={"/home"} component={DefaultContainer} />
          <Route exact path={"/comida"} component={DefaultContainer} />
          <Route exact path={"/comercio"} component={DefaultContainer} />
          <Route component={PageNotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
