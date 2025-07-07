"use client";

import { CardContext } from "@/Context/cardContext";
import { LoginContext } from "@/Context/Loginauthentication";
import axios from "axios";
import { useContext } from "react";

export default function useaddProduct() {
  const { setloadingcart  } = useContext(CardContext);
    const { setcartitemscount } = useContext(LoginContext);
  
  return async function addproduct(session: string, productId: string) {
    try {
      setloadingcart(true);

      const response =await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: session,
          },
        }
      );
      setcartitemscount(response.data.numOfCartItems)
    } catch (err) {
      console.log(err);
    } finally {
      setloadingcart(false);
    }
  };
}
