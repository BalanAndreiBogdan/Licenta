import React from "react"
import './App.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav className="Nav">
      <Link to="/">
        <img className="Logo" src={logo} alt="Logo" />
      </Link>
    </nav>
  );
}

export default Nav;
