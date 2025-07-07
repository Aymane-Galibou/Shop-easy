"use server"
import { cookies } from 'next/headers'
import React from 'react'


async function Logout() {


const cookiesStore=await cookies()

cookiesStore.set("auth_token","",{
    path:"/",
    expires:new Date(0)
})
}

export default Logout