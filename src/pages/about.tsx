import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col">
      <Head>
        <title>About | ROSA</title>
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

      <main className="w-9/12 max-w-prose mt-16 flex justify-center flex-col">
        <h1 className="text-xl mb-4">About</h1>
        <p className="text-sm">
          ROSA stands for <i>Risk of Open Source Assessment</i> and is a tool
          for analysing the dependencies in your codebase.
        </p>
        <p className="text-sm mt-4">
          It extract the dependencies of your github project and ranks them
          based on a number of parameters such as activity, issues, maintainers,
          and so on.
        </p>
      </main>
    </div>
  );
}
