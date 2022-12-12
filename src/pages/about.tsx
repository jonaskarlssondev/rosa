import Head from "next/head";
import Header from "./header";

export default function About() {
  return (
    <div className="w-screen min-h-screen flex items-center flex-col">
      <Head>
        <title>About | ROSA</title>
      </Head>

      <Header />

      <main className="w-9/12 max-w-prose mt-16 flex justify-center flex-col">
        <h1 className="text-xl mb-4">About</h1>
        <p className="text-sm">
          ROSA stands for <i>Risk of Open Source Assessment</i> and is a tool
          for analysing the dependencies in your codebase.
        </p>
        <p className="text-sm mt-4">
          It extracts the dependencies of your github project and ranks them
          based on a number of parameters such as activity, issues, maintainers,
          and so on.
        </p>
      </main>
    </div>
  ); 
}