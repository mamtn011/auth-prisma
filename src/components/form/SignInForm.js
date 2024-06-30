"use client";
import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "./SubmitButton";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
const serverUrl =
  process.env.NEXT_PUBLIC__SERVER_URL || "http://localhost:3000";

// yup schema
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const schema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required("Email Required!")
      .email("Invalid email!")
      .matches(emailRegex, "Invalid email!"),
    password: yup
      .string()
      .min(6, "Password is too short!")
      .required("Enter your password!"),
  })
  .required();

//? component
const SignInForm = () => {
  const [myError, setMyError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  if (session?.user?.id) {
    router.push("/profile");
  }

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // handle submit
  const onSubmit = async (data) => {
    try {
      const result = await fetch(`${serverUrl}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      const res = await result.json();
      if (res.status === 200) {
        const response = await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/profile",
          redirect: true,
        });
      } else if (res.status === 400) {
        setMyError(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {myError && (
        <div className="bg-red-400 rounded-lg my-4 p-4">
          <strong>Failed! </strong> {myError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="email"
          placeholder="Enter email"
          name="email"
          register={register}
          errors={errors}
        />
        <InputField
          type="password"
          placeholder="Enter password"
          name="password"
          register={register}
          errors={errors}
        />
        <SubmitButton label="login" disabled={isSubmitting} />
      </form>
    </>
  );
};

export default SignInForm;
