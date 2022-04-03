import React from 'react'
import {useState, useEffect, useRef} from 'react'
import './BoardGame.css'
import './App.css'
import {Link} from 'react-router-dom'

function SinglePlayerHd(){
  const [piecesOnBoard, setpiecesOnBoard] = useState([])
  const [pieceColor, setpieceColor] = useState('#D90000')
  const [winner, setWinner] = useState()
  const [activateAI, setactivateAI] = useState(0)
  const [draw, setDraw] = useState()
  const ref = useRef(null);

  useEffect(() => {
    conquerPiece()
    checkForOrizWin()
    checkForVertWin()
    checkForDiag1Win()
    checkForDiag2Win()
    checkForDraw()
  }, [piecesOnBoard])

  useEffect(() => {
    if (activateAI)
      setTimeout(() =>{ref.current.click()}, 1000)
    }, [activateAI])

  const restartGame = () => {
    setpiecesOnBoard([])
    setpieceColor('#D90000')
    setWinner()
    setactivateAI(0)
    setDraw()
  }

  const getPiece = (col, row) => {
    for(let element = 0; element < piecesOnBoard.length; element++)
      if(piecesOnBoard[element].col === col && piecesOnBoard[element].row === row)
        return (piecesOnBoard[element])
  }

  const getCopyPiece = (col, row, boardy) => {
    for(let element = 0; element < boardy.length; element++)
      if(boardy[element].col === col && boardy[element].row === row)
        return (boardy[element])
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
      setactivateAI(activateAI + 1)}
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
      let col = alphabeta(piecesOnBoard, 6, -99999999, 99999999, true)[0]
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

  const addAlphaBetaPiece = (col, row, boardy, color) => {
    return boardy.concat({col, row : row, color : color})
  }

  const scoreOnMove = (boardy) => {
    let score = 0
    const AI = '#FFF000'
    const PL = '#D90000'
    
    for(let r = 0; r < 6; r++){
      let piece = getCopyPiece(3, r, boardy)
      if(piece && piece.color === AI) 
        score = score + 3
    }

    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 6; r++){
        let piece1 = getCopyPiece(c, r, boardy)
        let piece2 = getCopyPiece(c + 1, r, boardy)
        let piece3 = getCopyPiece(c + 2, r, boardy)
        let piece4 = getCopyPiece(c + 3, r, boardy)
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === AI
          && piece3.color === AI  
          && piece4.color === AI ))
            score = score + 5
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === AI
          && piece3.color === AI  
          && piece4.color === AI ))
            score = score + 5
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece2.color === AI 
          && piece4.color === AI))
            score = score + 5
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === AI
          && piece2.color === AI 
          && piece3.color === AI))
            score = score + 5
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === PL
          && piece3.color === PL 
          && piece4.color === PL ))
            score = score - 4
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === PL
          && piece3.color === PL 
          && piece4.color === PL ))
            score = score - 4
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === PL
          && piece2.color === PL 
          && piece4.color === PL))
            score = score - 4
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === PL
          && piece2.color === PL 
          && piece3.color === PL))
            score = score - 4
        if((piece1 && piece2 && piece3 == null && piece4 == null) 
          && (piece1.color === AI
          && piece2.color === AI))
            score = score + 2
        if((piece1 && piece2 == null && piece3 && piece4 == null) 
          && (piece1.color === AI
          && piece3.color === AI))
            score = score + 2
        if((piece1 && piece2 == null && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece4.color === AI))
            score = score + 2
        if((piece1 == null && piece2 && piece3 && piece4 == null) 
          && (piece2.color === AI
          && piece3.color === AI))
            score = score + 2
        if((piece1 == null && piece2 && piece3 == null && piece4) 
          && (piece2.color === AI
          && piece4.color === AI))
            score = score + 2
        if((piece1 == null && piece2 == null && piece3 && piece4) 
          && (piece3.color === AI
          && piece4.color === AI))
            score = score + 2
      }
    
    for(let c = 0; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getCopyPiece(c, r, boardy)
        let piece2 = getCopyPiece(c, r + 1, boardy)
        let piece3 = getCopyPiece(c, r + 2, boardy)
        let piece4 = getCopyPiece(c, r + 3, boardy)
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === AI
          && piece3.color === AI  
          && piece4.color === AI ))
            score = score + 5
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === AI
          && piece3.color === AI  
          && piece4.color === AI ))
            score = score + 5
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece2.color === AI 
          && piece4.color === AI))
            score = score + 5
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === AI
          && piece2.color === AI 
          && piece3.color === AI))
            score = score + 5
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === PL
          && piece3.color === PL 
          && piece4.color === PL ))
            score = score - 4
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === PL
          && piece3.color === PL  
          && piece4.color === PL ))
            score = score - 4
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === PL
          && piece2.color === PL 
          && piece4.color === PL))
            score = score - 4
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === PL
          && piece2.color === PL
          && piece3.color === PL))
            score = score - 4
        if((piece1 && piece2 && piece3 == null && piece4 == null) 
          && (piece1.color === AI
          && piece2.color === AI))
            score = score + 2
        if((piece1 && piece2 == null && piece3 && piece4 == null) 
          && (piece1.color === AI
          && piece3.color === AI))
            score = score + 2
        if((piece1 && piece2 == null && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece4.color === AI))
            score = score + 2
        if((piece1 == null && piece2 && piece3 && piece4 == null) 
          && (piece2.color === AI
          && piece3.color === AI))
            score = score + 2
        if((piece1 == null && piece2 && piece3 == null && piece4) 
          && (piece2.color === AI
          && piece4.color === AI))
            score = score + 2
        if((piece1 == null && piece2 == null && piece3 && piece4) 
          && (piece3.color === AI
          && piece4.color === AI))
            score = score + 2
      }

    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getCopyPiece(c, r, boardy)
        let piece2 = getCopyPiece(c + 1, r + 1, boardy)
        let piece3 = getCopyPiece(c + 2, r + 2, boardy)
        let piece4 = getCopyPiece(c + 3, r + 3, boardy)
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === AI
          && piece3.color === AI  
          && piece4.color === AI ))
            score = score + 5
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === AI
          && piece3.color === AI  
          && piece4.color === AI ))
            score = score + 5
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece2.color === AI 
          && piece4.color === AI))
            score = score + 5
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === AI
          && piece2.color === AI 
          && piece3.color === AI))
            score = score + 5
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === PL
          && piece3.color === PL
          && piece4.color === PL ))
            score = score - 4
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === PL
          && piece3.color === PL  
          && piece4.color === PL ))
            score = score - 4
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === PL
          && piece2.color === PL 
          && piece4.color === PL))
            score = score - 4
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === PL
          && piece2.color === PL
          && piece3.color === PL))
            score = score - 4
        if((piece1 && piece2 && piece3 == null && piece4 == null) 
          && (piece1.color === AI
          && piece2.color === AI))
            score = score + 2
        if((piece1 && piece2 == null && piece3 && piece4 == null) 
          && (piece1.color === AI
          && piece3.color === AI))
            score = score + 2
        if((piece1 && piece2 == null && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece4.color === AI))
            score = score + 2
        if((piece1 == null && piece2 && piece3 && piece4 == null) 
          && (piece2.color === AI
          && piece3.color === AI))
            score = score + 2
        if((piece1 == null && piece2 && piece3 == null && piece4) 
          && (piece2.color === AI
          && piece4.color === AI))
            score = score + 2
        if((piece1 == null && piece2 == null && piece3 && piece4) 
          && (piece3.color === AI
          && piece4.color === AI))
            score = score + 2
      }

    for(let c = 3; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getCopyPiece(c, r, boardy)
        let piece2 = getCopyPiece(c + 1, r - 1, boardy)
        let piece3 = getCopyPiece(c + 2, r - 2, boardy)
        let piece4 = getCopyPiece(c + 3, r - 3, boardy)
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === AI
          && piece3.color === AI  
          && piece4.color === AI ))
            score = score + 5
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === AI
          && piece3.color === AI  
          && piece4.color === AI ))
            score = score + 5
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece2.color === AI 
          && piece4.color === AI))
            score = score + 5
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === AI
          && piece2.color === AI 
          && piece3.color === AI))
            score = score + 5
        if((piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === PL
          && piece3.color === PL  
          && piece4.color === PL ))
            score = score - 4
        if((piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === PL
          && piece3.color === PL 
          && piece4.color === PL ))
            score = score - 4
        if((piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === PL
          && piece2.color === PL 
          && piece4.color === PL))
            score = score - 4
        if((piece1 && piece2 && piece3 && piece4 == null) 
          && (piece1.color === PL
          && piece2.color === PL 
          && piece3.color === PL))
            score = score - 4
        if((piece1 && piece2 && piece3 == null && piece4 == null) 
          && (piece1.color === AI
          && piece2.color === AI))
            score = score + 2
        if((piece1 && piece2 == null && piece3 && piece4 == null) 
          && (piece1.color === AI
          && piece3.color === AI))
            score = score + 2
        if((piece1 && piece2 == null && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece4.color === AI))
            score = score + 2
        if((piece1 == null && piece2 && piece3 && piece4 == null) 
          && (piece2.color === AI
          && piece3.color === AI))
            score = score + 2
        if((piece1 == null && piece2 && piece3 == null && piece4) 
          && (piece2.color === AI
          && piece4.color === AI))
            score = score + 2
        if((piece1 == null && piece2 == null && piece3 && piece4) 
          && (piece3.color === AI
          && piece4.color === AI))
            score = score + 2
      }
    
    for(let c = 1; c < 6; c++)
      for(let r = 1; r < 4; r++){
        let piece = getCopyPiece(c, r, boardy)
        let piece1 = getCopyPiece(c, r - 1, boardy)
        let piece2 = getCopyPiece(c - 1, r, boardy)
        let piece3 = getCopyPiece(c + 1, r, boardy)
        let piece4 = getCopyPiece(c, r + 1, boardy)
        let piece5 = getCopyPiece(c, r + 2, boardy)
        if((piece && piece1 && piece2 && piece3 && piece4 && piece5) 
          && (piece1.color === AI
          && piece2.color === AI
          && piece3.color === AI
          && piece4.color === AI
          && piece5.color === AI  
          && piece.color !== AI))
            score = score + 800
        if((piece && piece1 && piece2 && piece3 && piece4 && piece5) 
          && (piece1.color === PL
          && piece2.color === PL
          && piece3.color === PL
          && piece4.color === PL
          && piece5.color === PL  
          && piece.color !== PL))
            score = score - 800
      }

    for(let c = 1; c < 5; c++)
      for(let r = 1; r < 5; r++){
        let piece = getCopyPiece(c, r, boardy)
        let piece1 = getCopyPiece(c, r - 1, boardy)
        let piece2 = getCopyPiece(c - 1, r, boardy)
        let piece3 = getCopyPiece(c + 1, r, boardy)
        let piece4 = getCopyPiece(c, r + 1, boardy)
        let piece5 = getCopyPiece(c + 2, r, boardy)
        if((piece && piece1 && piece2 && piece3 && piece4 && piece5) 
          && (piece1.color === AI
          && piece2.color === AI
          && piece3.color === AI
          && piece4.color === AI
          && piece5.color === AI  
          && piece.color !== AI))
            score = score + 800
        if((piece && piece1 && piece2 && piece3 && piece4 && piece5) 
          && (piece1.color === PL
          && piece2.color === PL
          && piece3.color === PL
          && piece4.color === PL
          && piece5.color === PL  
          && piece.color !== PL))
            score = score - 800
      }

    for(let c = 2; c < 6; c++)
      for(let r = 1; r < 5; r++){
        let piece = getCopyPiece(c, r, boardy)
        let piece1 = getCopyPiece(c, r - 1, boardy)
        let piece2 = getCopyPiece(c - 1, r, boardy)
        let piece3 = getCopyPiece(c + 1, r, boardy)
        let piece4 = getCopyPiece(c, r + 1, boardy)
        let piece5 = getCopyPiece(c - 2, r, boardy)
        if((piece && piece1 && piece2 && piece3 && piece4 && piece5) 
          && (piece1.color === AI
          && piece2.color === AI
          && piece3.color === AI
          && piece4.color === AI
          && piece5.color === AI  
          && piece.color !== AI))
            score = score + 800
        if((piece && piece1 && piece2 && piece3 && piece4 && piece5) 
          && (piece1.color === PL
          && piece2.color === PL
          && piece3.color === PL
          && piece4.color === PL
          && piece5.color === PL  
          && piece.color !== PL))
            score = score - 800
      }

    
    for(let c = 1; c < 6; c++)
      for(let r = 2; r < 5; r++){
        let piece = getCopyPiece(c, r, boardy)
        let piece1 = getCopyPiece(c, r - 1, boardy)
        let piece2 = getCopyPiece(c - 1, r, boardy)
        let piece3 = getCopyPiece(c + 1, r, boardy)
        let piece4 = getCopyPiece(c, r + 1, boardy)
        let piece5 = getCopyPiece(c, r + 2, boardy)
        if((piece && piece1 && piece2 && piece3 && piece4 && piece5) 
          && (piece1.color === AI
          && piece2.color === AI
          && piece3.color === AI
          && piece4.color === AI
          && piece5.color === AI  
          && piece.color !== AI))
            score = score + 800
        if((piece && piece1 && piece2 && piece3 && piece4 && piece5) 
          && (piece1.color === PL
          && piece2.color === PL
          && piece3.color === PL
          && piece4.color === PL
          && piece5.color === PL  
          && piece.color !== PL))
            score = score - 800
      }
    
    for(let c = 1; c < 6; c++)
      for(let r = 1; r < 5; r++){
        let piece = getCopyPiece(c, r, boardy)
        let piece1 = getCopyPiece(c, r - 1, boardy)
        let piece2 = getCopyPiece(c - 1, r, boardy)
        let piece3 = getCopyPiece(c + 1, r, boardy)
        let piece4 = getCopyPiece(c, r + 1, boardy)
        if((piece && piece1 && piece2 && piece3 && piece4) 
          && (piece1.color === AI
          && piece2.color === AI
          && piece3.color === AI
          && piece4.color === AI  
          && piece.color !== AI))
            score = score + 15
        if((piece && piece1 && piece2 && piece3 && piece4) 
          && (piece1.color === PL
          && piece2.color === PL
          && piece3.color === PL
          && piece4.color === PL  
          && piece.color !== PL))
            score = score - 10
      }

    for(let c = 1; c < 6; c++)
      for(let r = 1; r < 5; r++){
        let piece = getCopyPiece(c, r, boardy)
        let piece1 = getCopyPiece(c, r - 1, boardy)
        let piece2 = getCopyPiece(c - 1, r, boardy)
        let piece3 = getCopyPiece(c + 1, r, boardy)
        let piece4 = getCopyPiece(c, r + 1, boardy)
        if((piece && piece1 && piece2 == null && piece3 && piece4) 
          && (piece1.color === AI
          && piece3.color === AI
          && piece4.color === AI  
          && piece.color !== AI))
            score = score + 4
        if((piece && piece1 && piece2 && piece3 == null && piece4) 
          && (piece1.color === AI
          && piece2.color === AI
          && piece4.color === AI  
          && piece.color !== AI))
            score = score + 4
        if((piece && piece1 == null && piece2 && piece3 && piece4) 
          && (piece2.color === AI
          && piece3.color === AI
          && piece4.color === AI  
          && piece.color !== AI))
            score = score + 4
      }
    
    return score
  }

  const alphabeta = (boardy, depth, alpha, beta, maximizingPlayer) =>{

    const AI = '#FFF000'
    const PL = '#D90000'

    if(checkForCopyOrizWin(boardy)[0] || checkForCopyVertWin(boardy)[0] 
    || checkForCopyDiag1Win(boardy)[0] || checkForCopyDiag2Win(boardy)[0]
    || checkForCopyDraw(boardy) || depth === 0){
      if((checkForCopyOrizWin(boardy)[0] && checkForCopyOrizWin(boardy)[1] === PL)
      || (checkForCopyVertWin(boardy)[0] && checkForCopyVertWin(boardy)[1] === PL)
      || (checkForCopyDiag1Win(boardy)[0] && checkForCopyDiag1Win(boardy)[1] === PL)
      || (checkForCopyDiag2Win(boardy)[0] && checkForCopyDiag2Win(boardy)[1] === PL))
        return ([null, -10000000 - depth])
      else if((checkForCopyOrizWin(boardy)[0] && checkForCopyOrizWin(boardy)[1] === AI)
      || (checkForCopyVertWin(boardy)[0] && checkForCopyVertWin(boardy)[1] === AI)
      || (checkForCopyDiag1Win(boardy)[0] && checkForCopyDiag1Win(boardy)[1] === AI)
      || (checkForCopyDiag2Win(boardy)[0] && checkForCopyDiag2Win(boardy)[1] === AI))
        return ([null, 10000000 +  depth])
      else if(checkForCopyDraw(boardy))
        return ([null, 0])
      else
        return ([null, scoreOnMove(boardy)])
    }

    if(maximizingPlayer){
      let score = -99999999
      let col = Math.floor(Math.random() * 7)
      let row = null
      for( let c = 0; c < 7; c++){
        for(let r = 5; r >= 0; r--){
          if(getCopyPiece(c, r, boardy) == null ){
            row = r
            break
          }
        }
        if(row !== null){
          let boardCopy = boardy
          let boardAddPiece = addAlphaBetaPiece(c, row, boardCopy, AI)
          let newScore = alphabeta(boardAddPiece, depth - 1, alpha, beta, false)[1]
          if(newScore > score){
            score = newScore
            col = c
          }
          if(score > alpha)
            alpha = score
          
          if(score >= beta)
            break
        }
      }
      return ([col, score])
    }

    else{
      let score = 99999999
      let col = Math.floor(Math.random() * 7)
      let row = null
      for( let c = 0; c < 7; c++){
        for(let r = 5; r >= 0; r--){
          if(getCopyPiece(c, r, boardy) == null ){
            row = r
            break
          }
        }
        if(row !== null){
          let boardCopy = boardy
          let boardAddPiece = addAlphaBetaPiece(c, row, boardCopy, PL)
          let newScore = alphabeta(boardAddPiece, depth - 1, alpha, beta, true)[1]
          if(newScore < score){
            score = newScore
            col = c
          }
          if(score < beta)
            beta = score
          
          if(alpha >= score)
            break  
        }
      }
      return ([col, score])
    }
  }

  const checkForCopyOrizWin = (boardy) => {
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 6; r++){
        let piece1 = getCopyPiece(c, r, boardy)
        let piece2 = getCopyPiece(c + 1, r, boardy)
        let piece3 = getCopyPiece(c + 2, r, boardy)
        let piece4 = getCopyPiece(c + 3, r, boardy)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            return ([true, piece1.color])
        }
      }
    return [false, null] 
  }

  const checkForCopyVertWin = (boardy) => {
    for(let c = 0; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getCopyPiece(c, r, boardy)
        let piece2 = getCopyPiece(c, r + 1, boardy)
        let piece3 = getCopyPiece(c, r + 2, boardy)
        let piece4 = getCopyPiece(c, r + 3, boardy)
        if((piece1 && piece2 && piece3 && piece4) 
          && (piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            return [true, piece1.color]
          }
      }
    return [false, null] 
  }

  const checkForCopyDiag1Win = (boardy) => {
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r, boardy)
        let piece2 = getPiece(c + 1, r + 1, boardy)
        let piece3 = getPiece(c + 2, r + 2, boardy)
        let piece4 = getPiece(c + 3, r + 3, boardy)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            return [true, piece1.color]
          }
      }
    return [false, null]   
  }

  const checkForCopyDiag2Win = (boardy) => {
    for(let c = 3; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getCopyPiece(c, r, boardy)
        let piece2 = getCopyPiece(c - 1, r + 1, boardy)
        let piece3 = getCopyPiece(c - 2, r + 2, boardy)
        let piece4 = getCopyPiece(c - 3, r + 3, boardy)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            return [true, piece1.color]
          }
      }
    return [false, null] 
  }

  const checkForCopyDraw = (boardy) =>{
    for(let c = 0; c < 7; c++)
      for(let r = 0; r < 6; r++){
        if(getCopyPiece(c, r, boardy) == null)
          return false
      }
    return true
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
        let piece2 = getPiece(c + 1, r)
        let piece3 = getPiece(c + 2, r)
        let piece4 = getPiece(c + 3, r)
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

export default SinglePlayerHd;

