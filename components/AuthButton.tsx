"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "./ui/button";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div>
      {session && session.user ? (
        <>
          <Button
            className="gap-2"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <AiOutlineLogout size={20} />
            LogOut
          </Button>
        </>
      ) : (
        <>
          <Button
            className="gap-2"
            onClick={() => {
              router.push("/login");
            }}
          >
            <AiOutlineLogin size={20} />
            LogIn
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButton;
