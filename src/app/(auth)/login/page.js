import React from "react";
import Image from "next/image";

import Link from "next/link";
import SignInForm from "@/components/form/SignInForm";

const LoginPage = ({ searchParams }) => {
  return (
    <div className="bg-background">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image src="./images/logo.svg" width={50} height={50} alt="Logo" />
          </div>
          {searchParams?.msg && (
            <div className="bg-green-500 rounded-lg my-4 p-4">
              <strong>Success! </strong> {searchParams?.msg}
            </div>
          )}

          <h1 className="text-2xl font-bold capitalize">login</h1>
          <p className="capitalize">welcome back</p>
          <SignInForm />
          <div className="mt-5">
            <span>Don't have an account ?</span>
            <Link href="/register" className="text-orange-400 font-bold ml-2">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
