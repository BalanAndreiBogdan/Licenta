import React from 'react';
import './App.css';
import fundal from './fundal.png';
import {Link} from 'react-router-dom';

const SinglePlayerMenu = () => {
  return (
    <div className = "MainMenu">
      <div className = "MainPage">
        <div className = "Menu2">
          <div className = "Title">
            <h3>Connect 4:</h3>
            <h4>Conquest</h4>
          </div>
          <div className = "Buttons">
            <Link to = "/SinglePlayerEz">
                <button className = "ButtonStyle">Easy Mode</button>
            </Link>
            <Link to = "/SinglePlayerNo">
            <button className = "ButtonStyle">Normal Mode</button>
            </Link>
            <Link to = "/SinglePlayerHd">
            <button className = "ButtonStyle">Hard Mode</button>
            </Link>
            <Link to = "/">
            <button className = "ButtonStyle2">Back</button>
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

export default SinglePlayerMenu;
