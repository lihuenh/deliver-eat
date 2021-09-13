import { FaBars, BiCartAlt } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #5e60ce;
  // background: #00486b;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((10vw - 100px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const Brand = styled.span`
  color: #fff;
  pointer-events: none;
  font-size: 40px;
  font-family: "Lobster", cursive;
  //font-family: "Righteous", cursive;
  margin-left: 20px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const Brand2 = styled.span`
  // color: #ff7b4e;
  color: #f7efdb;
  pointer-events: none;
  font-size: 100px;
  font-family: "Lobster", cursive;
  //font-family: "Righteous", cursive;
  // margin-left: 20px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: 500;
  &.active {
    // color: #5eb3db;
    color: #000;
  }
  &:hover {
    color: #fff;
  }
  font-size: 15px;
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 800px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -50px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const ButtonLogout = styled.button`
  background-color: #fff;
  // color: #00486b;
  color: #5e60ce;
  margin-right: 40px;
  font-weight: 600;
  transition: background-color ease 300ms, border-color ease 300ms;

  &:hover {
    // background-color: #00486b;
    background-color: #5e60ce;
    border-color: #fff;
    color: #fff;
  }
`;

export const ButtonCart = styled.button`
  background-color: #fff;
  color: #5e60ce;
  // color: #00486b;
  font-weight: 600;
  transition: background-color ease 300ms, border-color ease 300ms;
  height: 38px;
  padding: 5px 15px;
  &:hover {
    // background-color: #00486b;
    background-color: #5e60ce;
    border-color: #fff;
    color: #fff;
  }
`;

// export const ImgCart = styled.img`
//   height: "20px";
//   margin-right: "10px";
//   transform: "rotate(353deg)";
// `;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
