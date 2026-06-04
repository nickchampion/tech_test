import { z } from 'zod';

const playerSchema = z.object({
  id: z.number(),
  name: z.string(),
  displayName: z.string(),
  createdAt: z.string(),
});

export const completeGameSchema = z.object({
  playerX: playerSchema,
  playerO: playerSchema,
  boardSize: z.number().int().min(3).max(15),
  board: z.array(z.enum(['X', 'O']).nullable()),
  currentSide: z.enum(['X', 'O']),
  status: z.enum(['in_progress', 'won', 'draw']),
  winner: z.enum(['X', 'O']).nullable(),
});

export const createGameSchema = z.object({ 
  nameX: z.string().min(1), 
  nameO: z.string().min(1), 
  boardSize: z.number().int().min(3).max(15) 
})