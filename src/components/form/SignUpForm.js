"use client";
import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "./SubmitButton";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// yup schema
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .min(4, "Name is too short!")
      .required("Name is Required!"),
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
    confirm_password: yup
      .string()
      .required("Confirm your password!")
      .oneOf([yup.ref("password")], "Passwords do not match."),
  })
  .required();
const SignUpForm = () => {
  const [myError, setMyError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const serverUrl =
    process.env.NEXT_PUBLIC__SERVER_URL || "http://localhost:3000";

  // useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // handle submit
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      const data = await fetch(`${serverUrl}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      const response = await data.json();
      if (response.status === 200) {
        router.push(`/login?msg=${response.message}`);
      } else {
        setMyError(response.message);
      }
    } catch (err) {
      console.log(err);
      setMyError("Sorry, something went wong!");
    }
  };
  // reset form data
  useEffect(() => {
    isSubmitSuccessful &&
      reset({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="text"
        placeholder="Enter full name"
        name="name"
        register={register}
        errors={errors}
      />
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
      <InputField
        type="password"
        placeholder="Confirm password"
        name="confirm_password"
        register={register}
        errors={errors}
      />
      <SubmitButton label="Register" disabled={isSubmitting} />
    </form>
  );
};

export default SignUpForm;
