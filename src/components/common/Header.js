"use client";
import React from "react";
// import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Logout from "@/components/common/Logout";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex justify-between p-8">
      <div className="LogoName">
        <Image src="./images/logo.svg" width={50} height={50} alt="Logo" />
      </div>
      <ul className="flex gap-4 items-center">
        <li className="border border-1 border-black rounded-sm px-2">
          <Link href="/">Home</Link>
        </li>
        <li className="border border-1 border-black rounded-sm px-2">
          <Link href="/profile">Profile</Link>
        </li>
        {session?.user?.id ? (
          <li>
            <Logout />
          </li>
        ) : (
          <>
            <li className="border border-1 border-black rounded-sm px-2">
              <Link href="/login">Login</Link>
            </li>
            <li className="border border-1 border-black rounded-sm px-2">
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
