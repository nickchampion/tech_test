import type { RouterOutputs } from './trpc'

export type GameState = RouterOutputs['game']['create']
export type Cell = GameState['board'][number]
export type Side = NonNullable<Cell>
export type GameStatus = GameState['status']
export type PlayerStats = RouterOutputs['stats']