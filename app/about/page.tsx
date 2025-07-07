"use client"
import { GlobeDemo } from "@/Components/ui/globeDemo";
import { Spotlight } from "@/Components/ui/Spotlight";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import React from "react";
import  Lottie from 'lottie-react';
import animation from '../../public/Animation/Contact.json';
import { useForm } from '@formspree/react';
import Success from "@/Components/submitionsuccessfuly/Success";


function About() {

  const [state, handleSubmit, reset] = useForm('mkgbadrg');

  if(state.succeeded){
    return <>
   <Success/>
    </>
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <Spotlight className="-top-32 left-10 md:-top-20" fill="black" />
        <Spotlight className="top-32 left-16" fill="orange" />

  {/*  item1 */}
        <div className="w-full mt-10 text-left">
          <TextGenerateEffect
            className="px-2 text-[40px] md:text-5xl lg:text-6xl text-center"
            words="You Can Contact us Here"
          />
        </div>

  {/* item-2 */}

        <div className="flex flex-col sm:flex-row w-full items-center sm:justify-around mt-5">

          {/* the form */}

          <div className="sm:w-1/2 w-[90%] border border-blue-500 dark:border-white px-3 py-1.5 h-[450px] rounded-lg bg-gray-200 dark:bg-black ml-2">
           
            <form action={handleSubmit} >

                            <div className="flex flex-col p-2">
                <label
                  htmlFor="email"
                  className="p-2 -tracking-tight text-black font-extrabold dark:text-white"
                >
                  Your Name:
                </label>
                <input
                name="full name"
                  type="text"
                  className="py-3 px-2 outline-none focus:border-2 w-full rounded-lg  focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col p-2">
                <label
                  htmlFor="email"
                  className="p-2 -tracking-tight text-black font-extrabold dark:text-white"
                >
                  Your Email:
                </label>
                <input
                  name="email"
                  type="email"
                  className="py-3 px-2 outline-none focus:border-2 w-full rounded-lg  focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col p-2">
                <label
                  htmlFor="email"
                  className="p-2 -tracking-tight text-black font-extrabold dark:text-white"
                >
                  Your message:
                </label>
                <textarea name="Content message" 
                  className="py-3 px-2 outline-none focus:border-2 w-full rounded-lg  focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div className="flex justify-end w-[90%] mx-auto">
                <button type="submit" className="outline-1 px-3 py-1.5 bg-orange-500 rounded-lg text-white flex items-center gap-3">
                  <p>Send</p>
                </button>
              </div>
            </form>

          </div>


<div className="h-auto sm:w-1/4 w-[90%]">
<Lottie  className='w-full' animationData={animation}/>
</div>

        </div>


            {/* globe */}
          <div className="global">
            <GlobeDemo />
          </div>

        {/*  item2 */}
      </div>
    </>
  );
}

export default About;
