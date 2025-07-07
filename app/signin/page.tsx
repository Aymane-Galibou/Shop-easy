"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo1 from "../../public/logo1.png";
import { FaUser } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();

  type SigninForme = {
    email: string;
    password: string;
  };

  type ErrorSigninForme = {
    email?: string;
    password?: string;
  };

  let error: ErrorSigninForme = {};
  const [apiError, setApiError] = useState<string | null>(null);
  const [loadingsign, setloadingsign] = useState<boolean>(false);

  async function handlesignin(data: SigninForme) {
    try {
      setloadingsign(true);
      let feedback = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        data
      );

      if (feedback.data.message === "success") {
        // localStorage.setItem("token", feedback.data.token);
        document.cookie = `auth_token=${feedback.data.token}; path=/; max-age=${
          60 * 60 * 12
        };  samesite=strict`;
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setApiError(err.response?.data?.message);
    } finally {
      setloadingsign(false);
    }
  }

  function handlevalidate(data: SigninForme) {
    if (data.email === "") {
      error.email = "Email is Required ";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data.email
      )
    ) {
      error.email = "Email is not valide ";
    }

    if (data.password === "") {
      error.password = "Password is Required";
    } else if (!/^[a-z][a-z]{3,5}$/.test(data.password)) {
      error.password = "password is not strong";
    }
    return error;
  }

  // sign in forme

  let formik1 = useFormik<SigninForme>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handlesignin,
    validate: handlevalidate,
  });

  //simobimo@gmail.com sasasa

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="flex justify-center">
            <h1 className="flex mt-6 gap-3 items-center tracking-[0.2rem] titre text-[30px] dark:text-white">
              <span> Good To see </span> <span className="text-orange-600"> You</span>
            </h1>
          </div>

          <div className="flex justify-center items-center">
            <div className="bg-white shadow-[2px_4px_6px_4px_gray] dark:bg-black mt-4 px-4 flex flex-col w-[90%] sm:max-w-md  min-h-[400px] max-h-[600px] rounded-lg">
              <div className="flex gap-20 justify-center items-center">
                <Image src={logo1} width={80} height={80} alt="website logo" />
                <h1 className="flex-1 text-[20px] tracking-[0.2rem] font-semibold sm:text-[30px] text-gray-700 dark:text-white">
                  Sign In
                </h1>
              </div>

              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik1.handleSubmit} className="space-y-6">
                  {/* block email  */}

                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-5">
                      <FaUser />
                      <label
                        htmlFor="email"
                        className="block  text-[15px] font-bold text-gray-900 dark:text-white"
                      >
                        Email address
                      </label>
                    </span>

                    <div className="mt-2">
                      <input
                        type="email"
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        name="email"
                        value={formik1.values.email}
                        id="email"
                        placeholder="example@email.com"
                        required
                        className="block  w-full border border-gray-400 dark:text-white  rounded-md bg-white dark:bg-[#27272A] p-3 md:p-1.5 text-base text-gray-900  outline-none placeholder:text-gray-400 focus:border-orange-600 transition-all duration-300 sm:text-sm/6"
                      />
                    </div>
                    {formik1.errors.email && formik1.touched.email ? (
                      <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        <span className="font-medium">Danger alert!</span>
                        {formik1.errors.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* block password  */}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-5">
                        <IoKey />
                        <label
                          htmlFor="password"
                          className="block text-[15px] font-bold text-gray-900 dark:text-white"
                        >
                          Password
                        </label>
                      </span>

                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-orange-600 hover:border-b-2  hover:border-b-black transition-all duration-300"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>

                    <div className="mt-2">
                      <input
                        type="password"
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        value={formik1.values.password}
                        name="password"
                        id="password"
                        placeholder="***********"
                        required
                        className="block w-full border dark:text-white border-gray-400  rounded-md bg-white dark:bg-[#27272A] p-3 md:p-1.5 text-base text-gray-900  outline-none placeholder:text-gray-400 focus:border-orange-600 transition-all duration-300 sm:text-sm/6"
                      />
                    </div>

                    {formik1.errors.password && formik1.touched.password ? (
                      <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        <span className="font-medium">Danger alert!</span>
                        {formik1.errors.password}
                      </div>
                    ) : (
                      ""
                    )}

                    {apiError && (
                      <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        <span className="font-medium">Danger alert!</span>
                        {apiError}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center px-3 py-1.5 rounded-md bg-orange-600 md:text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-300"
                    >
                      {loadingsign ? (
                        <p className="animate-spin w-[30px] h-[30px] border-white border-t-2 rounded-full"></p>
                      ) : (
                        <p>Sign In</p>
                      )}
                    </button>
                  </div>
                </form>

                <p className="mt-10 mb-4 text-center text-sm/6 text-gray-500 flex gap-4">
                  <span>you don't have an account?</span>
                  <Link
                    href={"/signup"}
                    className="font-semibold text-orange-600 hover:text-orange-500 hover:border-b-2  hover:border-b-black transition-all duration-300"
                  >
                    Sign-up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
