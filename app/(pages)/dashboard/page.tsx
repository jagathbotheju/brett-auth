"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useState } from "react";

const DashboardPage = () => {
  const [newName, setNewName] = useState("");
  const { data: session, status, update } = useSession();
  console.log(`useSession session`, session);

  return (
    <div className="mt-10 px-10 flex flex-col">
      <h1>Dashboard</h1>
      <h2>Hi, {session && session.user ? session?.user.name : "Guest"}</h2>
      <div className="mt-10 gap-4 flex flex-col">
        <Input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button onClick={() => update({ name: newName })}>Update Name</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
