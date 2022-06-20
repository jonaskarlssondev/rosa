import { trpc } from "../utils/trpc";

export default function Home() {
  const {data, isLoading} = trpc.useQuery(["hello"]);

  if (isLoading)
    return (
      <p>Loading</p>
    );

  return (
    <div>
      <p>{data?.greeting}</p>
    </div>
  );
}