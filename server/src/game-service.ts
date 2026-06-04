import { eq, or, sql } from 'drizzle-orm';
import { db } from './db/db';
import { games, players } from './db/schema';
import type { GameState, Player, PlayerStats } from './types';

export function findOrCreatePlayer(name: string): Player {
  const normalised = name.trim().toLowerCase();
  const existing   = db.select().from(players).where(eq(players.name, normalised)).get();
  
  if (existing) return existing;

  const { lastInsertRowid } = db.insert(players).values({ name: normalised, displayName: name.trim() }).run();
  return db.select().from(players).where(eq(players.id, Number(lastInsertRowid))).get()!;
}

export function createGame(playerX: Player, playerO: Player, boardSize: number): GameState {
  return {
    playerX: playerX,
    playerO: playerO,
    boardSize,
    board: Array(boardSize * boardSize).fill(null),
    currentSide: 'X',
    status: 'in_progress',
    winner: null,
  };
}

export function completeGame(state: GameState): void {
  const winnerId = state.winner === 'X' ? state.playerX.id
    : state.winner === 'O' ? state.playerO.id
    : null;
    
  db.insert(games).values({
    boardSize: state.boardSize,
    playerXId: state.playerX.id,
    playerOId: state.playerO.id,
    winnerId,
    board: JSON.stringify(state.board),
  }).run();
}

export function playerStats(): PlayerStats[] {
  return db
    .select({
      player: players,
      wins: sql<number>`count(case when ${games.winnerId} = ${players.id} then 1 end)`,
      losses: sql<number>`count(case when ${games.winnerId} is not null and ${games.winnerId} != ${players.id} then 1 end)`,
      draws: sql<number>`count(case when ${games.winnerId} is null then 1 end)`,
    })
    .from(players)
    .innerJoin(games, or(eq(games.playerXId, players.id), eq(games.playerOId, players.id)))
    .groupBy(players.id)
    .all() as PlayerStats[];
}
