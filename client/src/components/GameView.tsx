import React from 'react'
import { trpcClient } from '../trpc'
import { checkWinner } from '../winner'
import type { GameState, GameStatus } from '../types'

export function GameView({ game, setGame, onNewGame, onComplete }: {
  game: GameState
  setGame: (g: GameState) => void
  onNewGame: () => void
  onComplete:() => void
}) {
  const handleClick = async (pos: number) => {
    if (game.status !== 'in_progress' || game.board[pos]) return

    const board  = [...game.board]
    board[pos] = game.currentSide

    const winner = checkWinner(board, game.boardSize)
    const isDraw = !winner && board.every(Boolean)
    const status: GameStatus = winner ? 'won' : isDraw ? 'draw' : 'in_progress'

    const next: GameState = { ...game, board, currentSide: game.currentSide === 'X' ? 'O' : 'X', status, winner }
    
    setGame(next)

    if (status !== 'in_progress') {
      await trpcClient.game.complete.mutate(next)
      onComplete()
    }
  }

  const cellPx = Math.floor(480 / game.boardSize)
  const fontPx = Math.max(12, Math.floor(cellPx * 0.55))

  const statusLine = game.status === 'won'  ? `${game.winner === 'X' ? game.playerX.displayName : game.playerO.displayName} wins!`
    : game.status === 'draw' ? "It's a draw!"
    : `${game.currentSide === 'X' ? game.playerX.displayName : game.playerO.displayName}'s turn (${game.currentSide})`

  return (
    <div className='flex flex-col items-center gap-5'>
      <div className='text-center'>
        <p className='font-semibold'>
          <span className='text-blue-600'>{game.playerX.displayName}</span>{' vs '}<span className='text-red-500'>{game.playerO.displayName}</span>
        </p>
        <p className='mt-1 text-sm text-gray-600'>{statusLine}</p>
      </div>

      <div className='border-2 border-gray-900'
        style={{ display: 'grid', gridTemplateColumns: `repeat(${game.boardSize}, ${cellPx}px)` }}>
        {game.board.map((cell, pos) => (
          <div key={pos} onClick={() => handleClick(pos)}
            style={{ width: cellPx, height: cellPx, fontSize: fontPx }}
            className={[
              'border border-gray-200 flex items-center justify-center font-bold select-none',
              game.status === 'in_progress' && !cell ? 'cursor-pointer hover:bg-gray-100' : '',
              cell === 'X' ? 'text-blue-600' : cell === 'O' ? 'text-red-500' : '',
            ].join(' ')}>
            {cell}
          </div>
        ))}
      </div>

      {game.status !== 'in_progress' && (
        <button onClick={onNewGame}
          className='bg-gray-900 text-white rounded px-6 py-2 font-semibold hover:bg-gray-700'>
          New Game
        </button>
      )}
    </div>
  )
}
