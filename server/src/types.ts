import type { players } from './db/schema';

export type Side = 'X' | 'O';
export type Cell = Side | null;
export type GameStatus = 'in_progress' | 'won' | 'draw';

// Shared between client and server — represents the full in-flight game state
export interface GameState {
  playerX: Player;
  playerO: Player;
  boardSize: number;
  board: Cell[];
  currentSide: Side;
  status: GameStatus;
  winner: Side | null;
}

export type Player = typeof players.$inferSelect;

export type PlayerStats = {
  player: Player; 
  wins: number; 
  losses: number; 
  draws: number 
};
