import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const players = sqliteTable('players', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), // normalised (lookup key)
  displayName: text('display_name').notNull(),  // original casing for display
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

// Only completed games are stored — winnerId null means draw
export const games = sqliteTable('games', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  boardSize: integer('board_size').notNull(),
  playerXId: integer('player_x_id').notNull().references(() => players.id),
  playerOId: integer('player_o_id').notNull().references(() => players.id),
  winnerId: integer('winner_id').references(() => players.id),
  board: text('board').notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});
