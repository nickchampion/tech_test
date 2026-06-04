import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@server/router'

export const trpcClient = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:3000' })],
})

export type RouterOutputs = inferRouterOutputs<AppRouter>
export type RouterInputs  = inferRouterInputs<AppRouter>
