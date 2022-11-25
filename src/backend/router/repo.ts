import { z } from "zod";
import mapRepository, { Repository } from "../repository/repository";
import { createRouter } from "./context";

export const repoRouter = createRouter()
  .query("fetch-repo", {
    input: z.object({
      repository: z.string(),
    }),
    async resolve({ input }): Promise<Repository> {

      const open_issues: Promise<Response<GithubIssue[]>> = fetch('https://api.github.com/search/issues?q=repo:' + input.repository + '+type:issue+state:open+sort:updated-desc')
        .then(res => res.json())
        .catch(err => console.error(err));

      const closed_issues: Promise<Response<GithubIssue[]>> = fetch('https://api.github.com/search/issues?q=repo:' + input.repository + '+type:issue+state:closed+sort:updated-desc')
        .then(res => res.json())
        .catch(err => console.error(err));

      const pulls: Promise<PullRequest[]> = fetch('https://api.github.com/repos/' + input.repository + '/pulls')
        .then(res => res.json())
        .catch(err => console.error(err));
      
      const commits: Promise<Commit[]> = fetch('https://api.github.com/repos/' + input.repository + '/commits')
        .then(res => res.json())
        .catch(err => console.error(err));
      
      const contributors: Promise<number> = fetch('https://api.github.com/repos/' + input.repository + '/contributors?per_page=1&anon=true')
        .then(res => Number(res.headers.get('link')?.split(',')?.find(x => x.includes('rel="last"'))?.split('&page=')[1]?.split('>')[0] ?? 0))
        .catch(err => {
          console.error(err);
          return 0;
        });

      const repometa: Promise<Meta> = fetch('https://api.github.com/repos/' + input.repository)
        .then(res => res.json())
        .catch(err => console.error(err))

      const [repo, open_iss, closed_iss, pull, com, con] = await Promise.all([repometa, open_issues, closed_issues, pulls, commits, contributors]);

      const github: GitHubRepository = {
        closed_issues: closed_iss,
        commits: com,
        meta: repo,
        open_issues: open_iss,
        pulls: pull,
        contributors: con,
      }

      return mapRepository(github);
    },
  });

  export type GitHubRepository = {
    meta: Meta;
    contributors: number;
    open_issues: Response<GithubIssue[]>;
    closed_issues: Response<GithubIssue[]>;
    commits: Commit[];
    pulls: PullRequest[];
  }

  export type Response<T> = {
    total_count: number;
    incomplete_results: boolean;
    items: T;
  }

  export type GithubIssue = {
    created_at: string;
    closed_at: string;
  }

  export type PullRequest = {
    state: string;
    created_at: string;
    closed_at: string;
  }

  export type Commit = {
    commit: {
      author: {
        name: string;
        date: string;
      },
      message: string;
    },
    author?: {
      login: string;
    }
  }

  export type Meta = {
    name: string;
    full_name: string;
    description: string;
    archived: boolean;
    stargazers_count: number;
    forks_count: number;
  }