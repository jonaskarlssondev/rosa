import Head from "next/head";
import React from "react";
import { trpc } from "../utils/trpc";
import { Analyse } from "./analysis";
import { Header } from "./header";

export default function Home() {
  const [repo, setRepo] = React.useState("jonaskarlssondev/rosa");

  const { data, refetch, isLoading } = trpc.useQuery(
    ["fetch-repo", { repository: repo }],
    {
      enabled: false,
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    refetch();
  };

  const handleChange = (e: any) => {
    setRepo(e.target.value);
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <Head>
        <title>Home | ROSA</title>
      </Head>

      <Header />

      <main className="flex flex-col items-center pt-28 w-screen">
        <div>
          <span className="text-l">Enter Github profile/repository</span>
          <form className="mt-2 flex w-fit" onSubmit={handleSubmit}>
            <input
              type="text"
              className="text-sm rounded w-[40vw] max-w-lg h-10 p-4 text-zinc-600 focus:outline-none"
              value={repo}
              onChange={handleChange}
            />
            <input
              type="submit"
              className="text-sm max-w-24 h-10 px-3 ml-2 rounded bg-emerald-600 text-slate-100 cursor-pointer"
              value={isLoading ? "Loading..." : "Analyse"}
            />
          </form>
        </div>

        <div className="mt-8">
          <Analyse data={data} />
        </div>
      </main>
    </div>
  );
}
