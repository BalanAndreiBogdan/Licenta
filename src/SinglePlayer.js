import React from "react"
import './App.css';
import './SinglePlayer.css';

function SinglePlayer() {

  const BoardCreation = () =>{
    const rowViews = []
    for (let r = 0; r < 6; r++) {
      const columnViews = []
      for (let c = 0; c < 7; c++) {
        columnViews.push(
          <div className="square">
            <div className="circle"></div>
          </div>
        )
      }
      rowViews.push(
        <div className="column">{columnViews}</div>
      );
    }

    return(
      <div className="round-border">
        <div className="board">
          {rowViews}
        </div>
      </div>
    )
  }

  return (
    <div className="SinglePlayer">
      <div>
        {BoardCreation()}
      </div>
    </div>
  );
}

export default SinglePlayer;
