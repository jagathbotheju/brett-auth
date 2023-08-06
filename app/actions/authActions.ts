"use server";
import { NextResponse } from "next/server";
import prisma from "../libs/prismadb";
import bcrypt from "bcrypt";

interface Props {
  name: string;
  email: string;
  password: string;
}

export async function signUpWithCredentials({ name, email, password }: Props) {
  console.log("signup with credentials in server");
  try {
    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    //console.log(`exist ${JSON.stringify(exist)}`);
    if (exist) throw new Error("Email already exist");

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    console.log(`user ${user}`);
    //return NextResponse.json(user);
  } catch (error) {
    let message = "";
    if (error instanceof Error) message = error.message;
    else message = String(error);
    //redirect(`/errors?error=${message}`);
    console.log(error);
  }
}
