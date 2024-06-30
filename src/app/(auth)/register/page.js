import React from "react";
import Image from "next/image";

import Link from "next/link";
import SignUpForm from "@/components/form/SignUpForm";

const RegisterPage = () => {
  return (
    <div className="bg-background">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image src="./images/logo.svg" width={50} height={50} alt="Logo" />
          </div>
          <h1 className="text-2xl font-bold capitalize">Sign Up</h1>
          <p className="capitalize">welcome back</p>
          <SignUpForm />
          <div className="mt-5">
            <span>Do you have an account ?</span>
            <Link href="/login" className="text-orange-400 font-bold ml-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
