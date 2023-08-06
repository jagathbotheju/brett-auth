"use client";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false })
      .then((cb) => {
        if (cb?.ok && !cb.error) {
          toast.success("Sign in Successfully");
          router.push("/");
        }
        if (cb?.error) {
          console.log(cb.error);
          toast.error(cb.error);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error");
      });
  };

  return (
    <div className="flex flex-col px-10 mx-auto w-full">
      <h2 className="text-2xl font-bold my-5">Login with Next Auth</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[500px]">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="outline-none p-2 border-amber-500 rounded border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="border outline-none border-amber-500 rounded p-2"
        />

        <div>
          <button
            type="submit"
            className="btn bg-amber-500 py-2 px-4 mt-10 rounded-md"
          >
            LogIn
          </button>
        </div>
      </form>

      <div className="mt-5 gap-2 flex flex-col w-fit">
        <Button
          className="gap-2"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <BsGithub size={20} />
          Login with Github
        </Button>
        <Button
          className="gap-2"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <FcGoogle size={20} />
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
