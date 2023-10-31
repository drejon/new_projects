import { describe, expect, test } from 'vitest'
import { UserGame } from '../userGame'
import { Water } from '../Water'
import { Module } from '../Module'
import { Ship } from '../Ship'

describe('Battleship', () => {
  test('Should generate a board', () => {
    const userGame = new UserGame()
    const result = userGame.board.length

    const expected = 49

    expect(result).toBe(expected)
  })

  test('The user should be able to put a module of a ship in one position', () => {
    const userGame = new UserGame()
    const position = {x: 1, y: 1}
    const ship = new Module('C', position)

    userGame._placeShip(position, ship)

    const result = userGame.board[8]
    const expected = new Module('C', {x:1, y:1})
    expect(result).toStrictEqual(expected)
  })

  test('The user should be able to put a full ship in a given orientation in one position', () => {
    const userGame = new UserGame()
    const initialPosition = {x: 1, y: 1}
    const ship = new Module('C', 5)

    userGame._placeShip(initialPosition, ship)
    const result = userGame.board[8]
    const result2 = userGame.board[9]
    const result3 = userGame.board[10]
    const result4 = userGame.board[11]
    const result5 = userGame.board[12]

    const expected = new Module('C', {x:1, y:1})
    const expected2 = new Module('C', {x:2, y:1})
    const expected3 = new Module('C', {x:3, y:1})
    const expected4 = new Module('C', {x:4, y:1})
    const expected5 = new Module('C', {x:5, y:1})

    expect(result).toStrictEqual(expected)
    expect(result2).toStrictEqual(expected2)
    expect(result3).toStrictEqual(expected3)
    expect(result4).toStrictEqual(expected4)
    expect(result5).toStrictEqual(expected5)
  })
})
