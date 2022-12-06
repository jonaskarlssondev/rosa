import React from "react";
import { Repository } from "../backend/repository/repository";

const Analyse: React.FC<{ data: Repository | Number | undefined }> = ({
  data,
}) => {
  if (data != null) {
    if (typeof data === "number") {
      return <AnalysisError err={data}></AnalysisError>;
    }
    return <Analysis repository={data as Repository} />;
  }

  return <div></div>;
};

export default Analyse;

const AnalysisError: React.FC<{ err: Number }> = ({ err }) => {
  switch (err) {
    case 403:
      return (
        <div>{"Sorry, your requests have been rate limited by github."}</div>
      );
    case 500:
      return <div>{"Sorry, something broke :("}</div>;
    default:
      return <div>{"Sorry, someone made a whoopsie."}</div>;
  }
};

const Analysis: React.FC<{ repository: Repository }> = ({
  repository,
}) => {
  repository.score = score(repository);

  function score(repo: Repository): number {
    let score = 0;
    score += repo.archived ? -75 : 10;
    score += Math.min(repo.stars / 1000, 40);
    score += Math.min(repo.forks / 2000, 10);

    if (repo.issues_stat.closed_issues + repo.issues_stat.open_issues > 0) {
      score +=
        ((repo.issues_stat.closed_issues - repo.issues_stat.open_issues) /
          (repo.issues_stat.closed_issues + repo.issues_stat.open_issues)) *
        10;
    }

    if (repo.issues_stat.average_time_open > 0) {
      score += Math.max(60 - repo.issues_stat.average_time_open, -25);
    }

    if (repo.issues_stat.time_since_last_closed > 0) {
      score -= repo.issues_stat.time_since_last_closed / 10;
    }

    score -= Math.min(repo.commits_stat.time_since_last_commit / 10, 25);

    score += repo.contributors / 50;

    return Math.min(Math.max(Math.round(score), -100), 100);
  }

  return (
    <div className="bg-white w-96 rounded text-zinc-600 flex flex-col p-2">
      <div className="w-full flex flex-col">
        <span className="font-bold h-10 text-4xl">{repository.name}</span>
        <span>{repository.description}</span>
      </div>

      <Section
        title="Score"
        segments={[
          {
            title: "Score",
            value: repository.score,
          },
        ]}
      />

      <Section
        title="General"
        segments={[
          {
            title: "Stars",
            value: repository.stars.toString(),
          },
          {
            title: "Forks",
            value: repository.forks.toString(),
          },
          {
            title: "Archived",
            value: repository.archived.toString(),
          },
        ]}
      />

      <Section
        title="Issues"
        segments={[
          {
            title: "Open issues",
            value: repository.issues_stat.open_issues,
          },
          {
            title: "Closed issues",
            value: repository.issues_stat.closed_issues,
          },
          {
            title: "Average time open (days)",
            value:
              repository.issues_stat.average_time_open > 0
                ? repository.issues_stat.average_time_open
                : "-",
          },
          {
            title: "Time since last closed issue (days)",
            value:
              repository.issues_stat.time_since_last_closed > 0
                ? repository.issues_stat.time_since_last_closed
                : "-",
          },
        ]}
      />

      <Section
        title="Commits"
        segments={[
          {
            title: "Time since last commit (days)",
            value: repository.commits_stat.time_since_last_commit,
          },
        ]}
      />

      <Section
        title="Contributors"
        segments={[
          {
            title: "Total (incl. anon)",
            value: repository.contributors,
          },
        ]}
      />
    </div>
  );
};

const Section: React.FC<{ title: string; segments: Segment[] }> = ({
  title,
  segments,
}) => {
  return (
    <div className="mt-4 w-3/4">
      <span className="font-bold">{title}</span>
      <div className="flex flex-col">
        {segments.map((x) => (
          <Segment title={x.title} value={x.value} key={x.title} />
        ))}
      </div>
    </div>
  );
};

type Segment = {
  title: string;
  value: any;
};

const Segment: React.FC<{ title: string; value: number }> = ({
  title,
  value,
}) => {
  return (
    <div className="flex justify-between">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};
