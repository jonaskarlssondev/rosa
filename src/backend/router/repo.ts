import { z } from "zod";
import { createRouter } from "./context";

export const repoRouter = createRouter()
  .query("fetch-repo", {
    input: z.object({
      repository: z.string(),
    }),
    async resolve({ input }): Promise<Repository> {
      const issues = await fetch('https://api.github.com/repos/' + input.repository + '/issues')
        .then(res => res.json())
        .catch(err => console.error(err));

      const repo = await fetch('https://api.github.com/repos/' + input.repository)
        .then(res => res.json())
        .catch(err => console.error(err))

      const 
    },
  });

  export type Repository = {
    name: string;
    full_name: string;
    description: string;
  
    contributors: number;
    issues: Issue[];
    commits: Commit[];
    pullrequests: PullRequest[];
  
    archived: boolean;
  
    // fetch
    contributers_url: string;
    issues_url: string;
    commits_url: string;
    pulls_url: string;
    merges_url: string;
  };
  
  export type Contributor = {
    login: string;
    contributions: number;
  };
  
  export type Issue = {
    created_at: Date;
    closed_at?: Date;
  };
  
  export type Commit = {
    author: string;
    date: string;
    message: string;
  };
  
  export type PullRequest = {};