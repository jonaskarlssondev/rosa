import { z } from "zod";
import { createRouter } from "./context";

export const repoRouter = createRouter()
  .query("fetch-repo", {
    input: z.object({
      repository: z.string(),
    }),
    async resolve({ input }) {
      return fetch('https://api.github.com/repos/' + input.repository)
      .then(res => res.json())
      .catch(err => {
        console.error(err);
      })
    },
  });