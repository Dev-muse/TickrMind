"use client";
import { CountrySelectField } from "@/components/forms/CountrySelector";
import FooterLinks from "@/components/forms/FooterLinks";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      riskTolerance: "Medium",
      investmentGoals: "Growth",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("form data", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* inputs here  */}

        <InputField
          name="fullName"
          label={"Full Name"}
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full Name is required", minLength: 2 }}
        />
        <InputField
          name="email"
          label={"Email"}
          placeholder="johndoe@gmail.com"
          register={register}
          type="email"
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^\w+@\w+\.\w+$/,
            message: "Email address is required",
          }}
        />
        <InputField
          name="password"
          label={"Password"}
          placeholder="Enter Strong Password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />

        {/* country field */}
        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        {/* Investment  */}
        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          control={control}
          error={errors.investmentGoals}
          options={INVESTMENT_GOALS}
          placeholder="Select Goal"
          required
        />
        {/* RISK */}
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select Risk Level"
          control={control}
          error={errors.riskTolerance}
          options={RISK_TOLERANCE_OPTIONS}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          control={control}
          error={errors.preferredIndustry}
          options={PREFERRED_INDUSTRIES}
          placeholder="Select Industry"
          required
        />

        {/* button here  */}
        <Button
          disabled={isSubmitting}
          type="submit"
          className="yellow-btn w-full mt-5 "
        >
          {isSubmitting
            ? "Creating Account..."
            : "Start Your Investing Journey"}
        </Button>
      </form>
      <FooterLinks text="Already have an account? "href='/sign-in' linkText="Sign In" />
    </>
  );
};

export default SignUp;
