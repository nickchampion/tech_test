import React, { useState } from 'react'
import type { GameState } from './types'
import { Setup } from './components/Setup'
import { GameView } from './components/GameView'
import { Stats } from './components/Stats'

export function Main() {
  const [game, setGame] = useState<GameState | null>(null)
  const [statsKey, setStatsKey] = useState(0)

  return (
    <div className='min-h-screen flex flex-col items-center pt-12 px-4'>
      <h1 className='font-bold text-3xl mb-10'>Tic Tac Toe</h1>
      {game
        ? <GameView
            game={game}
            setGame={setGame}
            onNewGame={() => setGame(null)}
            onComplete={() => setStatsKey(k => k + 1)}
          />
        : <Setup onStart={setGame} />
      }
      <Stats refreshKey={statsKey} />
    </div>
  )
}
