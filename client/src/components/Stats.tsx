import React, { useEffect, useState } from 'react'
import { trpcClient } from '../trpc'
import type { PlayerStats } from '../types'

export function Stats({ refreshKey }: { refreshKey: number }) {
  const [stats, setStats] = useState<PlayerStats>([])

  useEffect(() => {
    trpcClient.stats.query().then(setStats)
  }, [refreshKey])

  if (!stats.length) return null 

  return (
    <div className='mt-12 w-full max-w-sm'>
      <h2 className='font-bold text-lg mb-3'>Leaderboard</h2>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b-2 border-gray-900 text-left'>
            <th className='pb-2'>Player</th>
            <th className='pb-2 text-center'>W</th>
            <th className='pb-2 text-center'>L</th>
            <th className='pb-2 text-center'>D</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(({ player, wins, losses, draws }) => (
            <tr key={player.id} className='border-b border-gray-100'>
              <td className='py-1.5'>{player.displayName}</td>
              <td className='py-1.5 text-center font-semibold text-green-600'>{wins}</td>
              <td className='py-1.5 text-center text-red-500'>{losses}</td>
              <td className='py-1.5 text-center text-gray-400'>{draws}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
