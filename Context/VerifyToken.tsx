"use server";
import { cookies } from "next/headers";
import React from "react";
import LoginContextProvider from "./Loginauthentication";
import CardContextProvider from "./cardContext";

async function VerifyToken({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth_token")?.value;
  let isAuthenticated = !!token;

  // or

  //   let isAuthenticated = false; and
  {
    /**
    
    if(token){
    isAuthenticatedd = true}else{
    isAuthenticated = false}
    
    */
  }

  return (
    <>
      <LoginContextProvider isAuthenticated={isAuthenticated} session={token ?? ""}>

        <CardContextProvider session={token ?? ""}>
        {children}
        </CardContextProvider>

      </LoginContextProvider>
    </>
  );
}

export default VerifyToken;
