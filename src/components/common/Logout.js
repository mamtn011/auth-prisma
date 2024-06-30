"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Logout = () => {
  return (
    <Button
      className="text-orange-400 font-bold ml-2"
      onClick={async () => await signOut({ redirectTo: "/" })}
    >
      Logout
    </Button>
  );
};

export default Logout;
