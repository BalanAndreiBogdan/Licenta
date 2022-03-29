import React from 'react'
import {useState, useEffect, useRef} from 'react'
import './BoardGame.css'
import './App.css'
import {Link} from 'react-router-dom'

function SinglePlayerNo(){
  const [piecesOnBoard, setpiecesOnBoard] = useState([])
  // const [boardCopy, setBoardCopy] = useState([])
  const [pieceColor, setpieceColor] = useState('#D90000')
  const [winner, setWinner] = useState()
  const [activateRandom, setActivateRandom] = useState(0)
  const ref = useRef(null);
  const [draw, setDraw] = useState()
  var boardCopy = []

  useEffect(() => {
    conquerPiece()
    checkForOrizWin()
    checkForVertWin()
    checkForDiag1Win()
    checkForDiag2Win()
    checkForDraw()
  }, [piecesOnBoard])

  useEffect(() => {
    if (activateRandom)
      setTimeout(() =>{ref.current.click()}, 1500)
    }, [activateRandom])

  const restartGame = () => {
    setpiecesOnBoard([])
    setWinner()
    setpieceColor('#D90000')
    activateRandom(0)
    setDraw()
  }

  const getPiece = (col, row) => {
    for(let element = 0; element < piecesOnBoard.length; element++)
      if(piecesOnBoard[element].col === col && piecesOnBoard[element].row === row)
        return (piecesOnBoard[element])
  }

  const getCopyPiece = (col, row) => {
    for(let element = 0; element < boardCopy.length; element++)
      if(boardCopy[element].col === col && boardCopy[element].row === row)
        return (boardCopy[element])
  }

  const addPiece = (col) => {
    let row = null
    for(let r = 5; r >= 0; r--)
      if(getPiece(col, r) == null ){
        row = r
        break
      }
    if(row !== null){
      setpiecesOnBoard(piecesOnBoard.concat({col, row : row, color : pieceColor}))
      if(!winner){
      const nextPieceColor = pieceColor === '#D90000' ? '#FFF000' : '#D90000'
      setpieceColor(nextPieceColor)
      setActivateRandom(activateRandom + 1)}
    }
  }

  const getAIRow = (col) =>{
    for(let r = 5; r >= 0; r--)
      if(getPiece(col, r) == null )
        return(r)
    return(7)
    }

  const addAIPiece = () => {
    let coloana = null
    let row = null
    while(true){
      let col = AIPick()
      let getrow = getAIRow(col)
      if(getPiece(col, getrow) == null && getrow < 7){
        coloana = col
        row = getrow
        break
      }
    }
    if(row !== null && winner == null){
      setpiecesOnBoard(piecesOnBoard.concat({col : coloana, row : row, color : pieceColor}))
      const nextPieceColor = pieceColor === '#D90000' ? '#FFF000' : '#D90000'
      setpieceColor(nextPieceColor)
    }
  }

  const addCopyPiece = (col, row) => {
    boardCopy.concat({col, row : row, color : pieceColor})
    console.log(boardCopy)
  }

  const scoreOnMove = () => {
    let score = 0
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 6; r++){
        let piece1 = getCopyPiece(c, r)
        let piece2 = getCopyPiece(c+1, r)
        let piece3 = getCopyPiece(c+2, r)
        let piece4 = getCopyPiece(c+3, r)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === pieceColor 
          && piece2.color === pieceColor
          && piece3.color === pieceColor 
          && piece4.color === pieceColor ))
            score = score + 100
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === pieceColor
          && piece3.color === pieceColor  
          && piece4.color === pieceColor ))
            score = score + 10
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === pieceColor
          && piece3.color === pieceColor  
          && piece4.color === pieceColor ))
            score = score + 10
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === pieceColor
          && piece2.color === pieceColor 
          && piece4.color === pieceColor))
            score = score + 10
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === pieceColor
          && piece2.color === pieceColor 
          && piece3.color === pieceColor))
            score = score + 10
      }
    return score
  }

  const AIPick = () => {
    let maxScore = 0
    let AIcol = Math.floor(Math.random() * 7)
    console.log(piecesOnBoard)
    for(let c = 0; c < 7; c++){
      let row = null
      boardCopy = piecesOnBoard
      console.log("intra")
      for(let r = 5; r >= 0; r--){
        if(getCopyPiece(c, r) == null ){
          row = r
          console.log(row)
          break
        }
      }
      if(row !== null){
        addCopyPiece(console.log("intra2"))
        let score = scoreOnMove()
        if(score > maxScore){
          maxScore = score
          AIcol = c
        }
      }
    }
    return AIcol    
  }

  const conquerPiece = () => {
    for(let c = 1; c < 6; c++)
      for(let r = 1; r < 5; r++){
        let piece = getPiece(c, r)
        let piece1 = getPiece(c, r - 1)
        let piece2 = getPiece(c - 1, r)
        let piece3 = getPiece(c + 1, r)
        let piece4 = getPiece(c, r + 1)
        if((piece && piece1 && piece2 && piece3 && piece4) 
          && (piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color 
          && piece.color !== piece1.color)){
            const nextPieceColor = piece.color === '#D90000' ? '#FFF000' : '#D90000'
            let newpiecesOnBoard = piecesOnBoard.map(element => {
              if(element.col === c && element.row === r)
                return {col: c, row: r, color: nextPieceColor}
              else
                return element
            })
            setpiecesOnBoard(newpiecesOnBoard)
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
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            const winner = piece1.color === '#D90000' ? 'Red' : 'Yellow'
            setWinner(winner)
        }
      } 
  }

  const checkForVertWin = () => {
    for(let c = 0; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c, r + 1)
        let piece3 = getPiece(c, r + 2)
        let piece4 = getPiece(c, r + 3)
        if((piece1 && piece2 && piece3 && piece4) 
          && (piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            const winner = piece1.color === '#D90000' ? 'Red' : 'Yellow'
            setWinner(winner)
          }
      } 
  }

  const checkForDiag1Win = () => {
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c + 1, r + 1)
        let piece3 = getPiece(c + 2, r + 2)
        let piece4 = getPiece(c + 3, r + 3)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            const winner = piece1.color === '#D90000' ? 'Red' : 'Yellow'
            setWinner(winner)
          }
      } 
  }

  const checkForDiag2Win = () => {
    for(let c = 3; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c - 1, r + 1)
        let piece3 = getPiece(c - 2, r + 2)
        let piece4 = getPiece(c - 3, r + 3)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            const winner = piece1.color === '#D90000' ? 'Red' : 'Yellow'
            setWinner(winner)
          }
      } 
  }

  const checkForDraw = () =>{
    let empty = 0
    for(let c = 0; c < 7; c++)
      for(let r = 0; r < 6; r++){
        if(getPiece(c, r) == null)
          ++empty
      }
    setDraw(empty)
  }

  const boardCreation = () =>{
    let rowCreations = []
    for (let r = 0; r < 6; r++){
      let columnCreations = []
      for (let c = 0; c < 7; c++){
        const piece = getPiece(c, r)
        columnCreations.push(
          <div className = "square" onClick = {() => {addPiece(c)}}>
            <div className = "circle">
              {piece ? <div className = "coloredCircle" style={{backgroundColor : piece.color}}/> : null}
            </div>
          </div>
        )
      }
      rowCreations.push(<div className = "column">{columnCreations}</div>)
    }
    return(
      <div className = "round-border">
        <div className = "board">
          {winner ? <div className = 'winner'>{winner + ' wins!'}</div> : null}
          {(pieceColor === '#FFF000' && !winner) ? <div className = 'waiting'>Waiting...</div> : null}
          {!draw ? <div className = 'winner'>Draw</div> : null}
          {rowCreations}
        </div>
      </div>
    )
  }

  return (
    <div className = "BoardGame">
        {boardCreation()}
        <div className = "Buttons2">
          <div>
            <button onClick = {restartGame} className = "ButtonsBoard">Restart</button>
          </div>
          <Link to = "/SinglePlayerMenu">
            <div>
              <button className = "ButtonsBoard">Back</button>
            </div>
          </Link>
          <div>
            <button style = {{display: 'none'}} ref = {ref} 
            onClick = {() => addAIPiece()}>Random Move</button>
          </div>
        </div>
    </div>
  )
}

export default SinglePlayerNo;

