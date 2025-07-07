"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo1 from "../../public/logo1.png";
import { FaUser } from "react-icons/fa";
import {  IoPhoneLandscape } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function Chekout({card_id,session}:{card_id:string,session:string}) {

  const router = useRouter();

  type SigninForme = {
    details: string;
    phone: string;
    city: string;
  };

  const [loadingcheck, setloadingcheck] = useState<boolean>(false);

  async function handlesignin(data: SigninForme) {

    try {
  setloadingcheck(true)

        const response =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${card_id}?url=http://localhost:3000`,{
            shippingAddress:{
                details:data.details,
                phone:data.phone,
                city:data.city
            }
        },
        {
            headers:{
                "token":session
            }
        })
        // console.log(response.data)
        if(response.data.status==="success"){

          router.push(response.data.session.url)
        }
}catch(err){
  console.log("the erroe is " + err)
}finally{
  setloadingcheck(false)
}
  }

  // chek out form

  let formik1 = useFormik<SigninForme>({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handlesignin,
  });

  //simobimo@gmail.com sasasa

  return (
    <>
      <div className="background_signin  min-h-screen flex items-center justify-center">
        <div className="w-full">
          <div className="flex justify-center">
            <h1 className="flex justify-center items-center tracking-[0.2rem] titre text-[30px]">
              Traveling to chek out
            </h1>
          </div>

          <div className="flex justify-center items-center">
            <div className="bg-white mt-4 px-4 py-2 flex flex-col w-[90%] sm:max-w-md  min-h-[400px] max-h-[600px] rounded-lg">
              <div className="flex gap-20 justify-center items-center">
                <Image src={logo1} width={80} height={80} alt="website logo" />
                <h1 className="flex-1 text-[20px] tracking-[0.2rem] font-semibold sm:text-[30px] text-gray-700 ">
                  Check Out{" "}
                </h1>
              </div>

              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={formik1.handleSubmit} className="space-y-6">
                  {/* block details  */}

                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-5">
                      <FaUser />
                      <label
                        htmlFor="email"
                        className="block  text-[15px] font-bold text-gray-900"
                      >
                        Details{" "}
                      </label>
                    </span>

                    <div className="mt-2">
                      <input
                        type="text"
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        name="details"
                        value={formik1.values.details}
                        id="details"
                        placeholder="Anything"
                        required
                        className="block w-full border border-gray-400  rounded-md bg-white p-3 md:p-1.5 text-base text-gray-900  outline-none placeholder:text-gray-400 focus:border-orange-600 transition-all duration-300 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* block phone  */}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-5">
                        <IoPhoneLandscape />
                        <label
                          htmlFor="phone"
                          className="block text-[15px] font-bold text-gray-900"
                        >
                          Phone
                        </label>
                      </span>
                    </div>

                    <div className="mt-2">
                      <input
                        type="text"
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        value={formik1.values.phone}
                        name="phone"
                        id="phone"
                        placeholder="phone Number"
                        required
                        className="block w-full border border-gray-400  rounded-md bg-white p-3 md:p-1.5 text-base text-gray-900  outline-none placeholder:text-gray-400 focus:border-orange-600 transition-all duration-300 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  {/* city block */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-5">
                        <FaCity />
                        <label
                          htmlFor="city"
                          className="block text-[15px] font-bold text-gray-900"
                        >
                          City
                        </label>
                      </span>
                    </div>

                    <div className="mt-2">
                      <input
                        type="text"
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        value={formik1.values.city}
                        name="city"
                        id="city"
                        placeholder="Your city"
                        required
                        className="block w-full border border-gray-400  rounded-md bg-white p-3 md:p-1.5 text-base text-gray-900  outline-none placeholder:text-gray-400 focus:border-orange-600 transition-all duration-300 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center px-3 py-1.5 rounded-md bg-orange-600 md:text-sm/6 font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-300"
                    >
                      {loadingcheck ? (
                        <p className="animate-spin w-[30px] h-[30px] border-white border-t-2 rounded-full"></p>
                      ) : (
                        <p>Check Now</p>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
