import * as trpc from "@trpc/server";
import { z } from "zod";

import { repoRouter } from "./repo";
import { createRouter } from "./context";

export const appRouter = createRouter()
  .merge(repoRouter);

// export type definition of API
export type AppRouter = typeof appRouter;