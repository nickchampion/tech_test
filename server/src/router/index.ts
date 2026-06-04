import { initTRPC } from '@trpc/server';
import * as service from '../game-service';
import { completeGameSchema, createGameSchema } from './schema';

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

export const appRouter = router({
  game: router({
    create: publicProcedure
      .input(createGameSchema)
      .mutation(({ input }) => {
        const playerX = service.findOrCreatePlayer(input.nameX);
        const playerO = service.findOrCreatePlayer(input.nameO);

        return service.createGame(playerX, playerO, input.boardSize);
      }),

    complete: publicProcedure
      .input(completeGameSchema)
      .mutation(({ input }) => service.completeGame(input)),
  }),

  stats: publicProcedure
    .query(() => service.playerStats()),
});

export type AppRouter = typeof appRouter;
