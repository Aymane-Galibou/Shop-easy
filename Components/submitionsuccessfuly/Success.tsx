import React from 'react'
import { IoMdDoneAll } from 'react-icons/io'
import SmartLink from '../SmartLink/SmartLink'

function Success() {



  return   <>
  
  <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-green-600">201</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
Here you can find your message Status          </h1>
          <span className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 flex items-center justify-center">
            <p>
              
              Here we go, Your message has been sent successfuly.
              </p>
            
             <IoMdDoneAll className="text-green-500 text-2xl font-extrabold"/>
          </span>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <SmartLink
              href="/"
              >
                <span
                  className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >

              Go back home
                </span>
            </SmartLink>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
                </>
}

export default Success