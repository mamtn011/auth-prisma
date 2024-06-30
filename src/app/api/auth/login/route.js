import { NextResponse } from "next/server";
import { compareSync } from "bcryptjs";
import prisma from "@/DB/db.config";
export async function POST(request) {
  try {
    const payload = await request.json();

    // check whether user exist or not
    const findUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!findUser) {
      return NextResponse.json({
        status: 400,
        message: "No account found with this email!",
      });
    }

    // check password using bcryptjs
    const checkPassword = compareSync(payload.password, findUser.password);
    if (checkPassword) {
      return NextResponse.json({
        status: 200,
        msg: "User logged in successfully!",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Invalid credential!",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Input Error!",
    });
  }
}
