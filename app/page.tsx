import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "@/components/User";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="h-full w-full justify-between mt-10 px-10">
      <h1>Home</h1>
      <h1>Server side rendered</h1>
      <p className="mb-10">{JSON.stringify(session)}</p>

      <h1>Client side rendered</h1>
      <User />
    </main>
  );
}
