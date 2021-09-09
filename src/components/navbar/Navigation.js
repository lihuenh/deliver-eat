// import React, { useState } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn } from "./NavbarElements";
import { useHistory } from "react-router-dom";
import logo from "../../images/icono_01.png";
import { useAuth } from "../auth";

const Navbar = () => {
  const auth = useAuth();
  const history = useHistory();
  const { user } = useAuth();

  async function handleLogout() {
    await auth.logout();
    history.push("/login");
  }

  return (
    <>
      <Nav>
        <NavLink to="/home">
          <img src={logo} alt="logo" style={{ height: "50px" }} />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/comida">Comidas</NavLink>
          <NavLink to="/comercio">Comercios</NavLink>
        </NavMenu>
        <NavBtn>
          <span style={{ marginRight: "25px", color: "#fff" }}>
            {user != null ? user.email : ""}
          </span>
          <button className="btn btn-primary" onClick={() => handleLogout()}>
            Logout
          </button>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
