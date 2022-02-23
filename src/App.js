import React from "react";
import './App.css';
import Nav from './Nav.js';
import SinglePlayer from "./SinglePlayer.js";
import OnMultiPlayer from "./OnMultiPlayer.js";
import LoMultiPlayer from "./LoMultiplayer.js";
import fundal from "./fundal.png";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="MainPage">
        <div className="Menu">
          <div className="Title">
            <h3>Connect 4:</h3>
            <h4>Conquest</h4>
          </div>
          <div className="Buttons">
            <button className="ButtonStyle">Single-Player</button>
            <button className="ButtonStyle">Local Multiplayer</button>
            <button className="ButtonStyle">Online Multiplayer</button>
          </div>
        </div>
        <div className="TableImage">
          <img className="Fundal" src={fundal} alt="Fundal" />
        </div>
      </div>
    </div>
  );
}

export default App;
