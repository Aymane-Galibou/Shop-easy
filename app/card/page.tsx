import React from "react";
import { cookies } from "next/headers";
import GetLoggedCard from "./getLoggedCard";

async function Card() {
  const CookiesStore = await cookies();

  const token = CookiesStore.get("auth_token")?.value;

  return (
    <>
        <GetLoggedCard session={`${token}`} />
    </>
  );
}

export default Card;
