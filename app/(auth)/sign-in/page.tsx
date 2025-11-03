"use client";

import FooterLinks from "@/components/forms/FooterLinks";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      // SignInWithEmail server action

      const response = await signInWithEmail(data);
      if (response.success) {
        router.push("/");
      }

     } catch (e) {
       toast.error("Sign in failed", {
        description:
          e instanceof Error ? e.message : "failed to sign in",
      });
    }
  };
  return (
    <div>
      <h1 className="form-title">Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label={"Email"}
          placeholder="johndoe@gmail.com"
          register={register}
          type="email"
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
        {/* button here  */}
        <Button
          disabled={isSubmitting}
          type="submit"
          className="yellow-btn w-full mt-5 "
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <FooterLinks
        text="Don't have an account? "
        href="/sign-up"
        linkText="Create an account"
      />
    </div>
  );
};

export default SignIn;
