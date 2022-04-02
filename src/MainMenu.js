import React from 'react';
import './App.css';
import fundal from './fundal.png';
import {Link} from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className = "MainMenu">
      <div className = "MainPage">
        <div className = "Menu">
          <div className = "Title">
            <h3>Connect 4:</h3>
            <h4>Conquest</h4>
          </div>
          <div className = "Buttons">
            <Link to = "/SinglePlayerMenu">
                <button className = "ButtonStyle">Single-Player</button>
            </Link>
            <Link to = "/LoMultiplayer">
            <button className = "ButtonStyle">Local Multiplayer</button>
            </Link>
          </div>
        </div>
        <div className = "TableImage">
          <img className = "Fundal" src = {fundal} alt = "Fundal" />
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
