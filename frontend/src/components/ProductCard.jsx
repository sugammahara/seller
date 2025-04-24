import React from "react";

export const ProductCard = () => {
  const datu = [
    {
      name: "iphone",
      price: 50,
    },
    {
      name: "samsung",
      price: 560,
    },
    {
      name: "iphone",
      price: 50,
    },
    {
      name: "mi",
      price: 50,
    },
    {
      name: "iphone",
      price: 50,
    },
    {
      name: "iphone",
      price: 50,
    },
    {
      name: "iphone",
      price: 50,
    },
    {
      name: "iphone",
      price: 50,
    },
    {
      name: "iphone",
      price: 50,
    },
    {
      name: "iphone",
      price: 50,
    },
    {
      name: "iphone",
      price: 50,
    },
    { name: "mi", price: 60 },
  ];
  console.log(datu);
  return (
    <div className="w-full h-200 container mx-auto">
      <h1> Products Card</h1>
      <div
        className="grid grid-cols-4 gap-5
 "
      >
        {datu.map((item, index) => (
          <div
            key={index}
            className="h-120 p-5 flex flex-col justify-between bg-red-50"
          >
            <h1>{item.name}</h1>
            <img className="border" src="./vintage.webp" alt={item.name} />
            <h2>Price: {item.price}</h2>
            <button className="px-5 py-3 bg-red-200 w-50 rounded-xl hover:bg-red-800 hover:text-white cursor-pointer">
              Add to cart
            </button>
          </div>
        ))}

        <div className=" h-120 p-5 flex flex-col justify-between bg-red-50">
          <h1>Product Name</h1>
          <img className="border" src="./vintage.webp" alt="" />
          <h2>Price</h2>
          <button className="px-5 py-3 bg-red-200 w-50 rounded-xl hover:bg-red-800 hover:text-white cursor-pointer ">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
