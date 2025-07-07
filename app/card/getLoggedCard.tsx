"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import SmartLink from "@/Components/SmartLink/SmartLink";
import { LoginContext } from "@/Context/Loginauthentication";
import { CardContext } from "@/Context/cardContext";

type cartitems = {
  count: number;
  price: number;
  product: {
    imageCover: string;
    quantity: string;
    title: string;
    id: string;
  };
};

function GetLoggedCard({ session }: { session: string }) {
  const router = useRouter();

  const token = session;

  const [Cartitems, setCartitems] = useState<cartitems[]>();

  const [loaddelete, setloaddelete] = useState<string>("");

  const [loadupdate, setloadupdate] = useState<string>("");
  
  const { setcartitemscount } = useContext(CardContext);

  async function getourcart() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: token,
        },
      }
    );
    setCartitems(data.data.products);
    setcartitemscount(data.data.products.length)
    


  }

  async function deleteProduct(pid: string) {
    try {
      setloaddelete(pid);

      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${pid}`,
        {
          headers: {
            token: token,
          },
        }
      );
      // after delete the server return another time the card content
      setCartitems(data.data.products);
      setcartitemscount(data.data.products.length); // updating the number ou cart items


    } catch (err) {
      console.log("the error detected is " + err);
    } finally {
      setloaddelete("");
    }
    router.refresh();
  }

  async function updateproductcount(pid: string, count: number) {

    try {
      setloadupdate(pid);

      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${pid}`,
        {
          count: `${count}`,
        },

        {
          headers: {
            token: session,
          },
        }
      );
      setCartitems(data.data.products);
      setcartitemscount( Cartitems?.length ?? 0); // updating the number ou cart items


    } catch (err) {
      console.log("the error detected is " + err);
    } finally {
      setloadupdate("");
    }
  }

  useEffect(() => {
    getourcart();
  }, []);

  return (
    <>
      <div className="w-full py-5 flex flex-col gap-4">
        <TextGenerateEffect
          className="px-2 py-1 text-[1.5rem] sm:text-[3rem]  text-center"
          words="Your Shooping Cart"
        />

        <div className="w-full overflow-auto">
          <table className="w-[90%] mx-auto">
            <thead className="border-2 border-black dark:border-white">
              <tr>
                <th
                  scope="col"
                  className="px-3 border-gray-900 dark:border-gray-400 border py-2"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-3 border-gray-900 dark:border-gray-400 border py-2"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-3 border-gray-900 dark:border-gray-400 border py-2"
                >
                  Qty
                </th>
                <th
                  scope="col"
                  className="px-3 border-gray-900 dark:border-gray-400 border py-2"
                >
                  Price/1
                </th>
                <th
                  scope="col"
                  className="px-3 border-gray-900 dark:border-gray-400 border py-2"
                >
                  Action
                </th>
              </tr>

              {/* tr === new line whatever in header or body */}
            </thead>

            <tbody className="border-2 border-black dark:border-white">
              {Array.isArray(Cartitems) && Cartitems.length > 0 ? (
                <>
                  {Cartitems?.map((item: cartitems, index) => (
                    <tr key={index}>
                      <td className="flex items-center justify-center">
                        <Image
                          quality={75}
                          priority={false}
                          width={80}
                          height={80}
                          src={item.product.imageCover}
                          alt="321"
                        />
                      </td>

                      <td className="border-gray-400 border-1 text-center font-extrabold">
                        {item.product.title}
                      </td>

                      <td className="border-gray-400 border px-6 py-4">
                        <div className="flex items-center justify-center">
                          {/* button - */}

                          {loadupdate === item.product.id ? (
                            <span className="w-10 h-10 rounded-full border-red-600 border-b-2 animate-spin"></span>
                          ) : (
                            <>
                              {" "}
                              <button
                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                                onClick={() =>
                                  updateproductcount(
                                    item.product.id,
                                    item.count - 1
                                  )
                                }
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                  />
                                </svg>{" "}
                              </button>
                              {/* between - and + */}
                              <span className="text-lg text-black dark:text-white">
                                {" "}
                                {item.count}{" "}
                              </span>
                              {/* button + */}
                              <button
                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                                onClick={() =>
                                  updateproductcount(
                                    item.product.id,
                                    item.count + 1
                                  )
                                }
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>{" "}
                            </>
                          )}
                        </div>
                      </td>

                      <td className="border-gray-400 border font-extrabold text-center">
                        {item.price}$
                      </td>

                      <td className="border-gray-400 border px-6 py-4 text-center">
                        <button
                          onClick={() => deleteProduct(item.product.id)}
                          className="font-medium bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-all"
                        >
                          {loaddelete === item.product.id ? (
                            <p className="animate-spin w-[30px] h-[30px] border-white border-t-2 rounded-full"></p>
                          ) : (
                            <p>Remove</p>
                          )}
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td className="flex items-center">
                    Your card is empty{" "}
                    <MdOutlineShoppingCart className="text-orange-500" />  {" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end w-[90%] mx-auto">
          <SmartLink href="/chekout">
            <button className="outline-1 px-3 py-1.5 bg-orange-500 rounded-lg text-white flex items-center gap-3">
              <BsCreditCard />
              <p>ChekOut</p>
            </button>
          </SmartLink>
        </div>
      </div>
    </>
  );
}
export default GetLoggedCard;
