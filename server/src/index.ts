
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';
import cors from 'cors'

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors({ origin: 'http://localhost:3001' }),
});

server.listen(3000);