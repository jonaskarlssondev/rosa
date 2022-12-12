import { router } from "../trpc";
import { repoRouter } from "./repo";

export const appRouter = router({
  repo: repoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
