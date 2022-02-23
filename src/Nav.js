import React from "react"
import './App.css';
import logo from './logo.png';

function Nav() {
  return (
    <nav className="Nav">
     <img className="Logo" src={logo} alt="Logo" />
    </nav>
  );
}

export default Nav;
