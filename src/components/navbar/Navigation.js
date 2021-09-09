// import React, { useState } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, Brand } from "./NavbarElements";
import { useHistory } from "react-router-dom";
import logo from "../../images/icono_01.png";
import { useAuth } from "../auth";
import cart from "../../images/shopping-cart-1.png";

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
          <Brand>DeliverEat</Brand>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/comida">Comidas</NavLink>
          <NavLink to="/comercio">Comercios</NavLink>
        </NavMenu>
        <NavBtn>
          <span style={{ marginRight: "30px", color: "#fff" }}>
            {user != null ? user.email : ""}
          </span>
          <button
            className="btn btn-light"
            style={{
              backgroundColor: "#D2D2D2",
              borderColor: "#A8A8A8",
              fontWeight: 500,
              color: "#6D6D6D",
            }}
            onClick={() => handleLogout()}
          >
            Logout
          </button>
          <button
            className="btn btn-light"
            style={{
              marginLeft: "20px",
              backgroundColor: "#D2D2D2",
              borderColor: "#A8A8A8",
              fontWeight: 500,
              color: "#6D6D6D",
            }}
          >
            <img
              src={cart}
              style={{
                height: "20px",
                marginRight: "10px",
                transform: "rotate(353deg)",
              }}
            ></img>
            0
          </button>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
