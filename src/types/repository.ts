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

export type Response<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: T;
};
