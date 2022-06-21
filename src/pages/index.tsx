import Head from "next/head";
import Link from "next/link";

export default function Home() {
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
          <Link href="/about">
            <a className="mr-4">about</a>
          </Link>
        </nav>
      </header>

      <main className="w-fit mt-96 justify-center">
        <span className="text-xl">Enter Github profile/repository</span>
        <div className="mt-2  flex">
          <input
            className="rounded w-96 h-12 p-4 text-zinc-600 focus:outline-none"
            placeholder="jonaskarlssondev/rosa"
          />
          <button className="w-24 h-12 ml-2 rounded bg-emerald-600 text-slate-100">
            Analyze
          </button>
        </div>
      </main>
    </div>
  );
}
