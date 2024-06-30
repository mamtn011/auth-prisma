import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcryptjs";
import prisma from "@/DB/db.config";
export async function POST(request) {
  try {
    const payload = await request.json();

    // check whether user exist or not
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (isUserExist) {
      return NextResponse.json({
        status: 400,
        message: "Email already taken! Try another one.",
      });
    }

    // encrypt password using bcryptjs
    const salt = genSaltSync(10);
    payload.password = hashSync(payload.password, salt);

    // insert user to database
    await prisma.user.create({
      data: payload,
    });

    return NextResponse.json({
      status: 200,
      message: "Account created successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Input Error!",
    });
  }
}
