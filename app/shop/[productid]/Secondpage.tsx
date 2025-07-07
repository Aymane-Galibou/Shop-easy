"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatedTestimonials } from "@/Components/ui/animated-testimonials";
import RelatedProducts from "./RelatedProducts";

function ProductdetailsMain({
  productid,
  category,
  token,
}: {
  productid: string;
  category: string;
  token: string;
}) {
  type Product = {
    description?: string;
    title?: string;
    imageCover?: string;
    ratingsAverage?: number;
    price?: number;
    id: string;
    images?: string[];
  };

  const [ProductDetails, setProductDetails] = useState<Product>();

  const [testimonials, settestimonials] = useState<string[]>([]);

  //this function is for building an array contain images of the product

  function getproductsdetails(productid: string) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productid}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        settestimonials(data.data.images);
        // console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    // x , y
    window.scrollTo(0, 0);
    getproductsdetails(`${productid}`);
    // console.log(productid)
  }, [productid]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center md:justify-start">
          <AnimatedTestimonials
            testimonials={testimonials}
            ProductDetails={ProductDetails}
            session={token}
            productId={productid}
          />
        </div>

        <div>
          <RelatedProducts categorie={category} />
        </div>
      </div>
    </>
  );
}

export default ProductdetailsMain;
