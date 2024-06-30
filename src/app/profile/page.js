import React from "react";
import { auth } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Logout from "@/components/common/Logout";
const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <div className="bg-background">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image src="./images/logo.svg" width={50} height={50} alt="Logo" />
          </div>

          <h1 className="text-2xl font-bold capitalize text-center">
            {session?.user?.name}
          </h1>
          <p className="text-center">{session?.user?.email}</p>
          <div className="mt-5 text-center">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
