import { GitHubRepository, GithubIssue, Response } from "../router/repo";

export type Repository = {
  score: number;

  name: string;
  full_name: string;
  description: string;
  archived: boolean;

  stars: number;
  forks: number;

  issues_stat: Issues;

  commits_stat: Commits;

  contributors: number;
};

export type Issues = {
  open_issues: number;
  closed_issues: number;
  average_time_open: number;
  time_since_last_closed: number;
};

export type Issue = {
  created_at: Date;
  closed_at?: Date;
};

export type Commits = {
  time_since_last_commit: number;
};

export type Commit = {
  author: string;
  date: string;
  message: string;
};

export type PullRequest = {
  state: "open" | "closed";
  created_at: Date;
  closed_at?: Date;
};


export default function mapRepository(repo: GitHubRepository): Repository {
  return {
    name: repo.meta.name,
    full_name: repo.meta.full_name,
    description: repo.meta.description,
    archived: repo.meta.archived,

    stars: repo.meta.stargazers_count,
    forks: repo.meta.forks_count,

    issues_stat: {
      open_issues: repo.open_issues.total_count,
      closed_issues: repo.closed_issues.total_count,
      average_time_open: averageTimeOpen(repo.closed_issues, repo.open_issues),
      time_since_last_closed: daysSince(repo.closed_issues.items
        .map((x) => x.closed_at)
        .sort((a, b) => delta(a,b))[0], -1)
    },

    contributors: repo.contributors,

    commits_stat: {
      time_since_last_commit: daysSince(repo.commits[0]?.commit.author?.date)
    },

    score: 0,
  };
}

function averageTimeOpen(closed: Response<GithubIssue[]>, open: Response<GithubIssue[]>): number {
  if (closed.items.length > 0) {
    return Math.round(closed.items
      .map((x) => daysBetween(x.created_at, x.closed_at))
      .reduce((sum, x) => sum + x, 0) / closed.total_count);
  }
  
  if (open.items.length > 0) {
    return Math.round(open.items
      .map((x) => daysSince(x.created_at, 100))
      .reduce((sum, x) => sum + x, 0) / open.total_count)
  }

  return -1;
}

function delta(a: string | null, b: string | null): number {
  if (!a && !b) {
    return 0
  } else if (!a) {
    return 1
  } else if (!b) {
    return -1
  }

  return new Date(b).getTime() - new Date(a).getTime()
}

function daysBetween(start: string, end: string): number {
  const delta = new Date(end).getTime() - new Date(start).getTime();

  return Math.round(delta / (1000*3600*24));
}

function daysSince(date?: string | null, defaultValue: number = 0): number {
  if (!date) {
    return defaultValue;
  }

  const delta = new Date().getTime() - new Date(date).getTime();

  return Math.round(delta / (1000*3600*24));
}