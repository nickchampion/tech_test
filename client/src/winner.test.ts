import { checkWinner } from './winner'

const X = 'X' as const
const O = 'O' as const
const _ = null

describe('checkWinner', () => {
  describe('3×3 board', () => {
    test('returns null for an empty board', () => {
      expect(checkWinner([
        _, _, _,
        _, _, _,
        _, _, _,
      ], 3)).toBeNull()
    })

    test('detects a horizontal win', () => {
      expect(checkWinner([
        X, X, X,
        O, O, _,
        _, _, _,
      ], 3)).toBe('X')
    })

    test('detects a vertical win', () => {
      expect(checkWinner([
        O, X, _,
        O, X, _,
        O, _, X,
      ], 3)).toBe('O')
    })

    test('detects a diagonal win (top-left to bottom-right)', () => {
      expect(checkWinner([
        X, O, O,
        _, X, O,
        _, _, X,
      ], 3)).toBe('X')
    })

    test('detects an anti-diagonal win (top-right to bottom-left)', () => {
      expect(checkWinner([
        O, O, X,
        O, X, _,
        X, _, _,
      ], 3)).toBe('X')
    })

    test('returns null for a draw', () => {
      expect(checkWinner([
        X, O, X,
        X, O, O,
        O, X, X,
      ], 3)).toBeNull()
    })

    test('returns null mid-game with no winner', () => {
      expect(checkWinner([
        X, O, _,
        _, X, _,
        O, _, _,
      ], 3)).toBeNull()
    })
  })

  describe('Gomoku rules (boards ≥ 5×5 require 5 in a row)', () => {
    test('4 in a row does not win on a 5×5 board', () => {
      expect(checkWinner([
        X, X, X, X, _,
        O, O, O, _, _,
        _, _, _, _, _,
        _, _, _, _, _,
        _, _, _, _, _,
      ], 5)).toBeNull()
    })

    test('5 in a row wins on a 5×5 board', () => {
      expect(checkWinner([
        X, X, X, X, X,
        O, O, O, O, _,
        _, _, _, _, _,
        _, _, _, _, _,
        _, _, _, _, _,
      ], 5)).toBe('X')
    })

    test('5 in a row wins on a board larger than 5', () => {
      expect(checkWinner([
        X, X, X, X, X, _,
        O, O, O, O, _, _,
        _, _, _, _, _, _,
        _, _, _, _, _, _,
        _, _, _, _, _, _,
        _, _, _, _, _, _,
      ], 6)).toBe('X')
    })

    test('5 in a row wins diagonally on a 6×6 board', () => {
      expect(checkWinner([
        X, _, _, _, _, _,
        _, X, _, _, _, _,
        _, _, X, _, _, _,
        _, _, _, X, _, _,
        _, _, _, _, X, _,
        _, _, _, _, _, _,
      ], 6)).toBe('X')
    })
  })
})
