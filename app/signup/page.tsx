"use client";
import React, { useState } from "react";
import { Label } from "../../Components/ui/label";
import { Input } from "../../Components/ui/input";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
  IconBrandFacebook,
} from "@tabler/icons-react";

export default function Signup() {
  type FormValues = {
    name: string;
    phone: string;
    email: string;
    password: string;
    rePassword: string;
  };

  type Formerrors = {
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    rePassword?: string;
  };

  const router = useRouter();
  const [loadingsignup, setloadingsignup] = useState<boolean>(false);

  const validateuser = (data: FormValues) => {
    const error: Formerrors = {};

    if (!data.name.trim()) {
      error.name = "Full name is required";
    } else if (data.name.length < 3) {
      error.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      error.email = "Email address is required";
    } else if (!emailRegex.test(data.email)) {
      error.email = "Please enter a valid email";
    }

    const egyptPhoneRegex = /^01[0125][0-9]{8}$/;
    if (!data.phone) {
      error.phone = "Phone number is required";
    } else if (!egyptPhoneRegex.test(data.phone)) {
      error.phone = "Must be a valid Egyptian number (010, 011, 012, 015)";
    }

    if (!data.password) {
      error.password = "Password is required";
    } else if (data.password.length < 6) {
      error.password = "Min 6 characters required";
    }

    if (data.rePassword !== data.password) {
      error.rePassword = "Passwords do not match";
    }

    return error;
  };

  async function handleregister(data: FormValues) {
    setloadingsignup(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data
      );
      if (response.data.message === "success") {
        router.push("/signin");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      alert(errorMessage);
    } finally {
      setloadingsignup(false);
    }
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: handleregister,
    validate: validateuser,
  });

  // Reusable Error Component to keep code clean
  const ErrorMsg = ({ name }: { name: keyof FormValues }) => (
    formik.errors[name] && formik.touched[name] ? (
      <p className="text-[12px] text-red-500 font-bold mt-1 ml-1 animate-pulse">
        {formik.errors[name]}
      </p>
    ) : null
  );

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden pb-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white  uppercase tracking-tighter">
        Join the <span className="text-orange-600 italic">Evolution</span>
      </h1>

      <div className="sm:max-w-md sm:w-full w-[90%] flex flex-col gap-3 mx-auto md:rounded-2xl bg-white dark:bg-zinc-950 rounded-xl p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-zinc-800">
        <h2 className="font-bold text-xl text-neutral-900 dark:text-white">
          Shop <span className="text-orange-600">Easy</span> Registration
        </h2>
        <p className="text-gray-500 text-sm dark:text-neutral-400">
          Created for the Nº1 Agency in Morocco.
        </p>

        <form className="flex flex-col gap-4 mt-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <LabelInputContainer>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                placeholder="John Doe"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMsg name="name" />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formik.values.phone}
                placeholder="01012345678"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMsg name="phone" />
            </LabelInputContainer>
          </div>

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              placeholder="agency@shopeasy.com"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMsg name="email" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              value={formik.values.password}
              placeholder="••••••••"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMsg name="password" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="rePassword">Confirm Password</Label>
            <Input
              id="rePassword"
              name="rePassword"
              value={formik.values.rePassword}
              placeholder="••••••••"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMsg name="rePassword" />
          </LabelInputContainer>

          <button
            disabled={loadingsignup}
            className={cn(
              "bg-gradient-to-br relative flex justify-center group/btn from-black dark:from-orange-600 dark:to-orange-700 to-neutral-600 items-center w-full text-white rounded-md h-12 font-bold shadow-xl transition-all",
              loadingsignup ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
            )}
            type="submit"
          >
            {loadingsignup ? (
              <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              "CREATE ACCOUNT"
            )}
            <BottomGradient />
          </button>

          <div className="relative my-4">
             <div className="absolute inset-0 flex items-center"><span className="w-full border-t dark:border-zinc-800"></span></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-zinc-950 px-2 text-gray-500">Or continue with</span></div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <SocialBtn icon={<IconBrandGithub />} />
            <SocialBtn icon={<IconBrandGoogle />} color="hover:bg-red-500" />
            <SocialBtn icon={<IconBrandFacebook />} color="hover:bg-blue-600" />
          </div>
        </form>
      </div>
    </div>
  );
}

// Helpers
const SocialBtn = ({ icon, color }: { icon: React.ReactNode, color?: string }) => (
  <button className={cn("p-3 bg-gray-50 dark:bg-zinc-900 rounded-full border border-gray-100 dark:border-zinc-800 transition-all", color || "hover:bg-slate-900 hover:text-white")}>
    {icon}
  </button>
);

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string; }) => (
  <div className={cn("flex flex-col space-y-1 w-full", className)}>{children}</div>
);