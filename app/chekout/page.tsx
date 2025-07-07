import axios from 'axios';
import { cookies } from 'next/headers'
import React from 'react'
import Chekout from './Mainpage';



export default async function Mainchekout(){



    const CookiesStore=await cookies();
    const session=CookiesStore.get("auth_token")?.value ?? ""


    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: session,
        },
      }
    );
    const cartid=data.data._id
    console.log(cartid);
    
  

    return <>
    
<Chekout card_id={cartid} session={session}/>
    
    </>

}