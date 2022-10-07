import React from "react";
import "./SidebarMenu.scss";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import IconButton from "./IconButton";
import Icon from "./Icon";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu__wrap">
        <Link to="/" className="sidebar-menu__home-link">
          <img src={logo} alt="logo" />
        </Link>
        <IconButton onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <Icon name="bx bx-menu" size="medium" />
          ) : (
            <Icon name="bx bx-x" size="medium" />
          )}
        </IconButton>
      </div>

      <div className={`sidebar-menu__list ${isOpen ? "is-open" : ""}`}>
        <Link
          to="/"
          className="sidebar-menu__home-link"
          onClick={() => setIsOpen(false)}
        >
          <img src={logo} alt="logo" />
        </Link>

        <ul className="sidebar-menu__list-wrap">
          <li>
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              <Icon name="bx bxs-dashboard" size="medium" />
              Summary Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/diff" onClick={() => setIsOpen(false)}>
              <Icon name="bx bx-sun" size="medium" />
              Temperature Difference
            </NavLink>
          </li>
        </ul>
      </div>
      <button
        className={`sidebar-menu__close ${isOpen ? "is-active" : ""}`}
        onClick={() => setIsOpen(false)}
      ></button>
    </div>
  );
};

export default SidebarMenu;
