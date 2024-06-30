import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const InputField = ({ register, type, placeholder, name, errors }) => {
  return (
    <div className="mt-5">
      <Label htmlFor={name} className="capitalize">
        {name.split("_").join(" ")}
      </Label>
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        id={name}
      />
      <p className="text-red-500">
        {errors[name]?.message && <span>{errors[name]?.message}</span>}
      </p>
    </div>
  );
};

export default InputField;
