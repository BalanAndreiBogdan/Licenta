import React from "react"
import {useState, useEffect} from "react"
import './App.css';
import './SinglePlayer.css';

function SinglePlayer() {

  const [moves, setMoves] = useState([])
  const [playerTurn, setplayerTurn] = useState('#D90000')
  const [winner, setWinner] = useState()

  const conquer = () => {
    for(let c = 1; c < 6; c++)
      for(let r = 1; r < 5; r++){
        let piece = getPiece(c, r)
        let piece1 = getPiece(c, r - 1)
        let piece2 = getPiece(c - 1, r)
        let piece3 = getPiece(c + 1, r)
        let piece4 = getPiece(c, r + 1)
        if((piece && piece1 && piece2 && piece3 && piece4) && 
        (piece1.player === piece2.player && piece2.player === piece3.player && piece3.player === piece4.player && piece.player != piece1.player))
          {
            const nextPlayerTurn = piece.player === '#D90000' ? '#FFF000' : '#D90000'
            let newMoves = moves.map(element => {
              if (element.x == c && element.y == r){
                return {x: c, y: r, player: nextPlayerTurn};
              }
              else{
                return element;
              }
            })
            setMoves(newMoves)
          }
      } 
  }

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

  const checkForDiag1Win = () => {
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c + 1, r + 1)
        let piece3 = getPiece(c + 2, r + 2)
        let piece4 = getPiece(c + 3, r + 3)
        if((piece1 && piece2 && piece3 && piece4) && (piece1.player === piece2.player && piece2.player === piece3.player && piece3.player === piece4.player))
          setWinner(piece1.player + ' wins')
      } 
  }

  const checkForDiag2Win = () => {
    for(let c = 3; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c - 1, r + 1)
        let piece3 = getPiece(c - 2, r + 2)
        let piece4 = getPiece(c - 3, r + 3)
        if((piece1 && piece2 && piece3 && piece4) && (piece1.player === piece2.player && piece2.player === piece3.player && piece3.player === piece4.player))
          setWinner(piece1.player + ' wins')
      } 
  }

  useEffect(() => {
    conquer()
    checkForOrizWin()
    checkForVertWin()
    checkForDiag1Win()
    checkForDiag2Win()
  }, [moves]);

  const resetBoard = () =>{
    setMoves([])
    setWinner()
    setplayerTurn('#D90000')
  }

  const getPiece = (x, y) => {
    const list = moves.filter((item) => {
      return (item.x === x && item.y === y)
    })
    return list[0]
  }

  const AddMove = (x, y) => {
    const nextPlayerTurn = playerTurn === '#D90000' ? '#FFF000' : '#D90000'
    let availableYPosition = null
    for( let position = 5; position >= 0; position--){
      if(!getPiece(x,position)){
        availableYPosition = position
        break;
      }
    }
    if(availableYPosition!==null)
    {setMoves(moves.concat({x, y:availableYPosition, player:playerTurn}))
    setplayerTurn(nextPlayerTurn)}
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
          {winner && <div onClick={resetBoard} style={{position:'absolute', left:0, 
          right:0, bottom:0, top:0, zIndex:3, backgroundColor: 'black', opacity: '0.5', 
          display: 'flex', justifyContent:'center', alignItems: 'center', color: 'white', 
          fontWeight: '200', fontSize: '8VW', borderRadius: '60px'}}>{winner}</div>}
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
