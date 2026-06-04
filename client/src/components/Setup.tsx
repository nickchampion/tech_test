import React, { useState } from 'react'
import { trpcClient } from '../trpc'
import type { GameState } from '../types'

export function Setup({ onStart }: { onStart: (g: GameState) => void }) {
  const [nameX, setNameX] = useState('')
  const [nameO, setNameO] = useState('')
  const [size, setSize]   = useState(3)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const game = await trpcClient.game.create.mutate({ nameX: nameX, nameO: nameO, boardSize: size })
      onStart(game)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-72'>
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-semibold'>Player X</label>
        <input value={nameX} onChange={e => setNameX(e.target.value)} placeholder='Name' required
          className='border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800' />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-semibold'>Player O</label>
        <input value={nameO} onChange={e => setNameO(e.target.value)} placeholder='Name' required
          className='border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800' />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-semibold'>Board size: {size}×{size}</label>
        <input type='range' min={3} max={15} value={size} onChange={e => setSize(+e.target.value)} />
        <div className='flex justify-between text-xs text-gray-400'><span>3</span><span>15</span></div>
      </div>
      <button type='submit' disabled={loading}
        className='bg-gray-900 text-white rounded py-2 font-semibold hover:bg-gray-700 disabled:opacity-50'>
        {loading ? 'Starting…' : 'Start Game'}
      </button>
    </form>
  )
}
