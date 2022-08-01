import Head from "next/head";
import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";

export default function Home() {
  const [repo, setRepo] = React.useState("jonaskarlssondev/rosa");

  let { data, refetch, isLoading } = trpc.useQuery(
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
    <div className="w-screen min-h-screen flex items-center flex-col">
      <Head>
        <title>Home | ROSA</title>
      </Head>

      <header className="w-screen p-2 flex self-start justify-between">
        <Link href="/">
          <a className="text-2xl">ROSA</a>
        </Link>
        <nav className="flex flex-row">
          <Link href="/">
            <a className="mr-4">analyse</a>
          </Link>
          <Link href="/about">
            <a className="mr-4">about</a>
          </Link>
        </nav>
      </header>

      <main className="w-fit mt-96 justify-center">
        <span className="text-xl">Enter Github profile/repository</span>
        <form className="mt-2 flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="rounded w-96 h-12 p-4 text-zinc-600 focus:outline-none"
            value={repo}
            onChange={handleChange}
          />
          <input
            type="submit"
            className="w-24 h-12 ml-2 rounded bg-emerald-600 text-slate-100 cursor-pointer"
            value={isLoading ? "Loading..." : "Analyse"}
          />
        </form>
      </main>

      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
