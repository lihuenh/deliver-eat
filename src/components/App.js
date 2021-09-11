import React, { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassowrd";
import Signup from "./Signup";
import Home from "./Home";
import Navbar from "./navbar/Navigation";
import Comida from "./Comida";
import Comercio from "./Comercio";
import ShopCart from "./ShopCart";
import LoQueSea from "./LoQueSea";
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
import Footer from "./footer/Footer";

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
        <PrivateRoute exact path="/shopcart" component={ShopCart} />
        <PrivateRoute exact path="/loquesea" component={LoQueSea} />
        <Footer />
      </div>
    );
  };

  const PageNotFound = () => {
    return (
      <div className="container">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ marginTop: "30vh" }}
        >
          <h1 style={{ fontSize: "120px" }}>404</h1>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <h1>OPPS! PAGE NOT FOUND</h1>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <p>
            Sorry, the page you're looking for doesn't exist. If you think
            something is broken, report a problem.
          </p>
        </div>
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
          <Route exact path={"/shopcart"} component={DefaultContainer} />
          <Route exact path={"/loquesea"} component={DefaultContainer} />
          <Route component={PageNotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
