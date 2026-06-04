import { Cell, Side } from "./types"

export function checkWinner(board: Cell[], boardSize: number): Side | null {
  const winLength = Math.min(boardSize, 5)

  // Converts (row, col) to a flat index; returns null for out-of-bounds coordinates
  const cellAt = (row: number, col: number): Cell =>
    row >= 0 && row < boardSize && col >= 0 && col < boardSize
      ? board[row * boardSize + col]
      : null

  // Only 4 directions needed — opposites are covered when we reach those cells as a start point
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]]

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const side = cellAt(row, col)
      if (!side) continue

      for (const [deltaRow, deltaCol] of directions) {
        // Count how many consecutive matching cells extend from this position in this direction
        let consecutive = 1
        while (cellAt(row + deltaRow * consecutive, col + deltaCol * consecutive) === side) {
          consecutive++
        }
        if (consecutive >= winLength) return side
      }
    }
  }
  return null
}
