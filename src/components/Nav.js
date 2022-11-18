import React from "react";
import { Link, Navigate } from "react-router-dom";

const Nav = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const logout = () => {
    localStorage.clear();
    Navigate("/login");
  };
  return (
    <div className="text-center">
      {token ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/company">Companies</Link>
          </li>
          <li>
            <Link to="/car">Cars</Link>
          </li>
          <li>
            <Link to="/device">Devices</Link>
          </li>
          <li>
            <Link to="/manager">Managers</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
