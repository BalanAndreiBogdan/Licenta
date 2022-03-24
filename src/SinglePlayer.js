import React from "react"
import {useState, useEffect} from "react"
import './App.css';
import './SinglePlayer.css';

function SinglePlayer() {

  const [moves, setMoves] = useState([])
  const [playerTurn, setplayerTurn] = useState('#D90000')
  const [winner, setWinner] = useState("popica")

  const checkForOrizWin = () => {
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 6; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c+1, r)
        let piece3 = getPiece(c+2, r)
        let piece4 = getPiece(c+3, r)
        if((piece1 && piece2 && piece3 && piece4) && (piece1.player === piece2.player && piece2.player === piece3.player && piece3.player === piece4.player))
          setWinner(piece1.player + ' wins')
      } 
  }

  const checkForVertWin = () => {
    for(let c = 0; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c, r + 1)
        let piece3 = getPiece(c, r + 2)
        let piece4 = getPiece(c, r + 3)
        if((piece1 && piece2 && piece3 && piece4) && (piece1.player === piece2.player && piece2.player === piece3.player && piece3.player === piece4.player))
          setWinner(piece1.player + ' wins')
      } 
  }

  useEffect(() => {
    checkForOrizWin()
    checkForVertWin()
  },[moves]);

  const resetBoard = () =>{
    setMoves([])
  }

  const getPiece = (x, y) => {
    const list = moves.filter((item) => {
      return (item.x === x && item.y === y)
    })
    return list[0]
  }

  const AddMove = (x, y) => {
    const nextPlayerTurn = playerTurn === '#D90000' ? '#FFF000' : '#D90000'
    setMoves(moves.concat({x, y, player:playerTurn}))
    console.log(moves)
    setplayerTurn(nextPlayerTurn)
  }

  const BoardCreation = () =>{
    const rowViews = []
    for (let r = 0; r < 6; r++) {
      const columnViews = []
      for (let c = 0; c < 7; c++) {
        const piece = getPiece(c, r)
        columnViews.push(
          <div onClick={()=>{AddMove(c, r)}} className="square">
            <div className="circle">
              {piece ? <div style={{backgroundColor: piece.player, flex: 1, borderRadius: '50%'}}/> : undefined}
            </div>
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
          {winner && <div onClick={resetBoard}>{winner}</div>}
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
