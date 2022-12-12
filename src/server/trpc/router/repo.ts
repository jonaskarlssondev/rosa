import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import mapRepository from "../../common/mappings";
import { Repository, Response } from "../../../types/repository";

export const repoRouter = router({
  fetch: publicProcedure
    .input(z.object({ repository: z.string() }))
    .query(async ({ input }): Promise<Repository | Number> => {
      let err = 0;

      const open_issues: Promise<Response<GithubIssue[]>> = fetch(
        "https://api.github.com/search/issues?q=repo:" +
          input.repository +
          "+type:issue+state:open+sort:updated-desc"
      ).then((res) => {
        return res.json();
      });

      const closed_issues: Promise<Response<GithubIssue[]>> = fetch(
        "https://api.github.com/search/issues?q=repo:" +
          input.repository +
          "+type:issue+state:closed+sort:updated-desc"
      ).then((res) => {
        if (res.status != 200) {
          err = res.status;
        }
        return res.json();
      });

      const pulls: Promise<PullRequest[]> = fetch(
        "https://api.github.com/repos/" + input.repository + "/pulls"
      ).then((res) => {
        if (res.status != 200) {
          err = res.status;
        }
        return res.json();
      });

      const commits: Promise<Commit[]> = fetch(
        "https://api.github.com/repos/" + input.repository + "/commits"
      ).then((res) => {
        if (res.status != 200) {
          err = res.status;
        }
        return res.json();
      });

      const contributors: Promise<number> = fetch(
        "https://api.github.com/repos/" +
          input.repository +
          "/contributors?per_page=1&anon=true"
      ).then((res) => {
        if (res.status != 200) {
          err = res.status;
        }
        return Number(
          res.headers
            .get("link")
            ?.split(",")
            ?.find((x) => x.includes('rel="last"'))
            ?.split("&page=")[1]
            ?.split(">")[0] ?? 0
        );
      });

      const repometa: Promise<Meta> = fetch(
        "https://api.github.com/repos/" + input.repository
      ).then((res) => {
        if (res.status != 200) {
          err = res.status;
        }
        return res.json();
      });

      const [repo, open_iss, closed_iss, pull, com, con] = await Promise.all([
        repometa,
        open_issues,
        closed_issues,
        pulls,
        commits,
        contributors,
      ]);

      const github: GitHubRepository = {
        closed_issues: closed_iss,
        commits: com,
        meta: repo,
        open_issues: open_iss,
        pulls: pull,
        contributors: con,
      };

      if (err != 0) {
        return err;
      }

      return mapRepository(github);
    }),
});

export type GitHubRepository = {
  meta: Meta;
  contributors: number;
  open_issues: Response<GithubIssue[]>;
  closed_issues: Response<GithubIssue[]>;
  commits: Commit[];
  pulls: PullRequest[];
};

export type GithubIssue = {
  created_at: string;
  closed_at: string;
};

export type PullRequest = {
  state: string;
  created_at: string;
  closed_at: string;
};

export type Commit = {
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  author?: {
    login: string;
  };
};

export type Meta = {
  name: string;
  full_name: string;
  description: string;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
};
