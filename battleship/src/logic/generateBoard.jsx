import { Tile } from "../components/Tile";
import { SHIPS, WATER } from "../consts/ships";

const SIZE = 7
const COLOR = 'none'
export function generateBoard() {
  const board = emptyBoard()
  let index = 0

  do {
    let position = getRandomPosition()
    const isValid = isPositionValid(SHIPS[index], board, position)
    if (isValid) {
      placeShip(SHIPS[index], board, position)
      index++
    } else {
      const newPosition = getRandomPosition()
      position = newPosition
    }
  } while (index != 5)
  return board
}

function emptyBoard() {
  const emptyBoard = []
  
  for (let x = 0; x < SIZE; x++) {
    emptyBoard[x] = [];
    for (let y = 0; y < SIZE; y++) {
      emptyBoard[x][y] = <Tile color={COLOR} key={[y, x]} position={[y, x]}>{WATER}</Tile>
    }
  }
  return emptyBoard
}

function getTile(board, position) {
  const X = position[0]
  const Y = position[1]

  return board[X][Y].props.children.symbol
}

function setTile(ship, board, position) {
  const X = position[0]
  const Y = position[1]

  board[X][Y] = <Tile color={COLOR} key={[Y, X]} position={[Y, X]}>{ship}</Tile>
}

function checkVertical(ship, board, position) {
  const vertical = position[1] + ship.size <= board.length

  if(vertical) {
    let tilesAvailable = 0

    for (let row = position[1]; row < position[1] + ship.size; row++) {
      const tileContent = getTile(board, [position[0], row])

      if(tileContent === WATER.symbol) {tilesAvailable++}
    }

    return tilesAvailable === ship.size
  }
}

function checkHorizontal(ship, board, position) {
  const fitsHorizontal = position[0] + ship.size <= board.length
  
  if(fitsHorizontal) {
    let tilesAvailable = 0

    for (let column = position[0]; column < position[0] + ship.size; column++) {
      const tileContent = getTile(board, [column, position[1]])
      if(tileContent === WATER.symbol) {tilesAvailable++}
    }
    return tilesAvailable === ship.size
  } 
}

function isPositionValid(ship, board, position) {
  const fitsHorizontal = checkHorizontal(ship, board, position)
  const fitsVertical = checkVertical(ship, board, position)

  if(fitsHorizontal && fitsVertical) {
    const orientations = ['vertical', 'horizontal']
    const orientation = Math.floor(Math.random()*2)

    ship.orientation = orientations[orientation]
    return true
  }

  if(fitsHorizontal) {
    ship.orientation = 'vertical'
    return true
  }

  if(fitsVertical) {
    ship.orientation = 'horizontal'
    return true
  }

  return false
}

function placeShip(ship, board, position) {
  
  if(isPositionValid(ship, board, position)) {
    if (ship.orientation === 'vertical') {
      for (let column = position[0]; column <= position[0] + ship.size - 1; column++) {
        setTile(ship, board, [column, position[1]])
      }
      return true
    }

    if (ship.orientation === 'horizontal') {
      for (let row = position[1]; row <= position[1] + ship.size - 1; row++) {
        setTile(ship, board, [position[0], row])
      }
      return true
    }
  }
}

function getRandomPosition() {
  const X = Math.round(Math.random()*6)
  const Y = Math.round(Math.random()*6)

  return [X, Y]
}