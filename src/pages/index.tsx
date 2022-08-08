import Head from "next/head";
import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";
import { Analysis } from "./analysis";

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
    refetch().then((response) => {
      console.log(response.data);
    });
  };

  const handleChange = (e: any) => {
    setRepo(e.target.value);
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <Head>
        <title>Home | ROSA</title>
      </Head>

      <header className="w-screen h-12 p-2 flex justify-between">
        <Link href="/">
          <a className="text-2xl">ROSA</a>
        </Link>
        <nav className="flex">
          <Link href="/">
            <a className="mt-1 mr-4">analyse</a>
          </Link>
          <Link href="/about">
            <a className="mt-1 mr-4">about</a>
          </Link>
        </nav>
      </header>

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
          {data != null && <Analysis repository={data} />}
        </div>
      </main>
    </div>
  );
}
