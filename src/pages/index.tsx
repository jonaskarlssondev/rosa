import Head from "next/head";
import { trpc } from "../utils/trpc";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col">
      <Head>
        <title>Home | ROSA</title>
      </Head>

      <header className="w-screen p-2 flex self-start justify-between">
        <h1 className="text-2xl">ROSA</h1>
        <nav className="flex flex-row">
          <p className="mr-4 cursor-pointer">about</p>
        </nav>
      </header>
      
      <main className="w-fit mt-96 justify-center">
        <span className="text-xl">Enter Github profile/repository</span>
        <div className="mt-2  flex">
          <input className="rounded w-96 h-12 p-4 text-zinc-600 focus:outline-none" placeholder="jonaskarlssondev/rosa"/>
          <button className="w-24 h-12 ml-2 rounded bg-emerald-600">Analyze</button>
        </div>
      </main>
    </div>
  )
}