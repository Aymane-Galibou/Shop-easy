"use client";

import React, { createContext, useEffect, useState } from "react";

export const LoginContext = createContext<{
  isAuthenticated: boolean;
  isOpened: boolean;
  setisOpened: React.Dispatch<React.SetStateAction<boolean>>;

}>({
  isAuthenticated: false,
  isOpened: false,
  setisOpened: () => {}, // dummy default

});

function LoginContextProvider({
  children,
  isAuthenticated,
  session,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
  session: string;
}) {
  // we have used also a isOpened even we are in the auhenticaion context

  const [isOpened, setisOpened] = useState<boolean>(false);
  

  useEffect(() => {



  }, []);

  return (
    <>
      <LoginContext.Provider
        value={{
          isAuthenticated,
          isOpened,
          setisOpened,
        }}
      >
        {children}
      </LoginContext.Provider>
    </>
  );
}

export default LoginContextProvider;
