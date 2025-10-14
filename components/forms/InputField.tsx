import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
  validation,
  value,
  disabled,
}: FormInputProps) => {

  
  return (
    <div className="space-y-2 ">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        {...register(name, validation)}
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className={cn("form-inputs", {
          "opacity-50 cursor-not-allowed": disabled,
        })}
      />

      {error && <p className="text-sm text-red-500">{error.message}</p> }
     </div>
  );
};

export default InputField;
