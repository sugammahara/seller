import React, { useState } from "react";

import { postDataToApi } from "../API/api";
import { useNavigate } from "react-router-dom";

const Productcard = (product) => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const navigate = useNavigate();
  return (
    <div>
      {product.item && (
        <div
          onClick={() => {
            navigate(`/overview/${product.item.id}`);
          }}
          className="border rounded-lg shadow dark:border-slate-900 dark:bg-slate-800"
        >
          <img
            key={`allproduct.item-${product.item.id}`}
            className="w-full h-auto"
            src={
              process.env.REACT_APP_DEV_URL +
              product.item.attributes.img.data.attributes.url
            }
            alt="imagebrowse5"
          />
          <div className="px-[4px] text-white">
            <h2 className="pb-[4px]">{product.item.attributes.title}</h2>
            <p className=" py-[4px] text-lg line-clamp-2">
              {product.item.attributes.description}
            </p>
            <p className="text-xl mb-[10px] text-[#ea580c]">
              &#8360;{product.item.attributes.price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productcard;
