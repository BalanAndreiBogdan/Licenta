import React from "react";
import './App.css';
import Nav from './Nav.js';
import MainMenu from "./MainMenu.js";
import LoMultiPlayer from "./LoMultiplayer.js";
import SinglePlayer from "./SinglePlayer.js";
import OnMultiplayer from "./OnMultiplayer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path = "/" exact element = {<MainMenu/>} />
          <Route path = "/LoMultiPlayer" element = {<LoMultiPlayer/>} />
          <Route path = "/SinglePlayer" element = {<SinglePlayer/>} />
          <Route path = "/OnMultiplayer" element = {<OnMultiplayer/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
