import * as trpc from "@trpc/server";
import { z } from "zod";

import { helloRouter } from "./hello";
import { createRouter } from "./context";

export const appRouter = createRouter()
  .merge(helloRouter);

// export type definition of API
export type AppRouter = typeof appRouter;