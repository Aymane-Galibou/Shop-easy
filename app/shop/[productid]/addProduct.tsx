"use client";

import { CardContext } from "@/Context/cardContext";
import axios from "axios";
import { useContext } from "react";

export default function UseaddProduct() {
  const { setloadingcart  } = useContext(CardContext);
  
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
      console.log(response)
    } catch (err) {
      console.log(err);
    } finally {
      setloadingcart(false);
    }
  };
}
