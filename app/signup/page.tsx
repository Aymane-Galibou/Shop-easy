"use client";
import React, { useState } from "react";
import { Label } from "../../Components/ui/label";
import { Input } from "../../Components/ui/input";
import { cn } from "@/lib/utils";
import {  useFormik } from "formik";
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
    let error: Formerrors = {};

    if (data.name === "") {
      error.name = "Name is Required";
    } else if (!/^[A-Z][a-z]{3,5}$/.test(data.name)) {
      error.name = "Name is not valide (start by upperCase)";
    }

    if (data.email === "") {
      error.email = "email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data.email
      )
    ) {
      error.email = "Email is not valide";
    }

    return error;
  };

  async function handleregister(data: FormValues) {
    setloadingsignup(true);
    let reponse = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data
    );
    if (reponse.data.message === "success") {
      setloadingsignup(false);
      router.push("/signin");
    } else {
      console.log("we have a probleme in registration");
    }
  }

  let formik = useFormik<FormValues>({
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

  return (
    <div className="w-full flex flex-col items-center justify-center  overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white mt-4">
        Welcome to Sign Up <span className="text-orange-600">Form</span>
      </h1>

      <div className="sm:max-w-md  sm:w-full w-[90%] flex flex-col gap-3 mx-auto md:rounded-2xl bg-white dark:bg-black rounded-xl p-6 md:p-8 mb-5 shadow-[2px_4px_6px_4px_gray]">
        <h2 className="font-bold text-xl text-neutral-900 dark:text-white">
          Welcome to Shop <span className="text-orange-600">Easy</span>
        </h2>

        <p className="text-gray-800 text-sm max-w-sm dark:text-neutral-300">
          Fill the form to create an amazing account, to have access to the best
          ecommerce website.
        </p>

        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">Full Name</Label>
              <Input
                id="firstname"
                name="name"
                value={formik.values.name}
                placeholder="Tyler"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone"
                value={formik.values.phone}
                placeholder="Durden"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </LabelInputContainer>
          </div>

          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.name}
            </div>
          ) : null}

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              placeholder="example@email.com"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </LabelInputContainer>

          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Danger alert!</span>{" "}
              {formik.errors.email}
            </div>
          ) : null}

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
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="twitterpassword">Repeat Password</Label>
            <Input
              id="twitterpassword"
              name="rePassword"
              value={formik.values.rePassword}
              placeholder="••••••••"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative flex justify-center group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 items-center dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {loadingsignup ? (
              <p className="animate-spin w-[30px] h-[30px] border-white border-t-2 rounded-full"></p>
            ) : (
              <p>Sign Up</p>
            )}{" "}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />

          <div className="flex justify-center  mt-3 flex-wrap items-center gap-3">
            <button
              className="relative group/btn flex items-center justify-start px-4 text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            </button>

            <button
              className="relative group/btn hover:bg-red-500 hover:text-white transition-colors duration-500 flex items-center justify-start px-4 text-neutral-800 dark:text-neutral-300 rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4" />
            </button>

            <button
              className="relative group/btn hover:bg-blue-600 hover:text-white transition-colors duration-500 flex items-center justify-start px-4 text-neutral-800 dark:text-neutral-300 rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandFacebook className="h-4 w-4" stroke={2} />
            </button>

            <button
              className="relative group/btn flex items-center justify-start px-4 text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
