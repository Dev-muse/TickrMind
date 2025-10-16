import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";

const SelectField = ({
  name,
  control,
  label,
  options,
  placeholder,
  error,
  required = false,
}: SelectFieldProps) => {
  return (
    <div className=" space-y-2 ">
      <Label className="form-label" htmlFor={name}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-white">
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options.map((option) => (
                  <SelectItem className="focus:bg-gray-600 focus:text-white" key={option.label} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
            {error && <p className="text-sm text-red-500">{error.message}</p> }
          </Select>
        )}
      />
    </div>
  );
};

export default SelectField;
