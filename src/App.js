import React from 'react';
import './App.css';
import Nav from './Nav.js';
import MainMenu from './MainMenu.js';
import LoMultiPlayer from './LoMultiplayer.js';
import SinglePlayerMenu from './SinglePlayerMenu.js';
import SinglePlayerEz from './SinglePlayerEz';
import SinglePlayerNo from './SinglePlayerNo';
import SinglePlayerHd from './SinglePlayerHd';
import OnMultiplayer from './OnMultiplayer.js';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path = "/" exact element = {<MainMenu/>} />
          <Route path = "/SinglePlayerMenu" element = {<SinglePlayerMenu/>} />
          <Route path = "/SinglePlayerEz" element = {<SinglePlayerEz/>} />
          <Route path = "/SinglePlayerNo" element = {<SinglePlayerNo/>} />
          <Route path = "/SinglePlayerHd" element = {<SinglePlayerHd/>} />
          <Route path = "/LoMultiPlayer" element = {<LoMultiPlayer/>} />
          <Route path = "/OnMultiplayer" element = {<OnMultiplayer/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
