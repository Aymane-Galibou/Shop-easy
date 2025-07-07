"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "./Loginauthentication";

// Context definition
export const CardContext = createContext<{
  loadingcart: boolean;
  setloadingcart: React.Dispatch<React.SetStateAction<boolean>>;
    cartitemscount:number;
  setcartitemscount:React.Dispatch<React.SetStateAction<number>>;

}>({
  loadingcart: false,
  setloadingcart: () => {},
      cartitemscount:0,
  setcartitemscount:() => {},


});

// Context Provider
function CardContextProvider({ children , session }: { children: React.ReactNode,session:string }) {

  const [loadingcart, setloadingcart] = useState<boolean>(false);

  const [cartitemscount, setcartitemscount] = useState<number>(0);

  const {isAuthenticated}=useContext(LoginContext)


  useEffect(()=>{
      async function getourcart() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: session,
        },
      }
    );
    const products=await data.data.products
    setcartitemscount(products.length);

  }
if(isAuthenticated) {getourcart()}
  },[session])



  return (
    <CardContext.Provider value={{ loadingcart, setloadingcart,cartitemscount, setcartitemscount }}>
      {children}
    </CardContext.Provider>
  );
}

export default CardContextProvider;
