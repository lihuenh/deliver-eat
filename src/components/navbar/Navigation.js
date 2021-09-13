// import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  Brand,
  ButtonLogout,
  ButtonCart,
  ImgCart,
} from "./NavbarElements";
import { BiCartAlt, BiCart } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import logo from "../../images/icono_01.png";
import { useAuth } from "../auth";
import "../../estilo.css";

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
          <NavLink to="/comida">Comidas</NavLink>
          <NavLink to="/comercio">Comercios</NavLink>
          <NavLink to="/loquesea">Lo que sea</NavLink>
        </NavMenu>
        <NavBtn>
          <span style={{ marginRight: "30px", color: "#fff" }}>
            {user != null ? user.email : ""}
          </span>
          <ButtonLogout className="btn" onClick={() => handleLogout()}>
            Cerrar sesion
          </ButtonLogout>
          <NavLink to="/shopcart">
            <ButtonCart className="btn">
              <BiCart size={22} style={{ transform: "rotate(353deg)" }} /> 0
            </ButtonCart>
          </NavLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
