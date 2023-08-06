"use client";
import { signUpWithCredentials } from "@/app/actions/authActions";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
      axios
        .post("/api/register", data)
        .then((response) => {
          console.log(response.data);
          toast.success("User registered successfully");
        })
        .catch(({ response }) => {
          console.log(response.data);
          toast.error(response.data);
        });
    }
  };

  return (
    <div className="flex flex-col px-10 mx-auto w-full">
      <h2 className="text-2xl font-bold my-5">Register with Next Auth</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[500px]">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="outline-none p-2 border-amber-500 rounded border"
        />
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
