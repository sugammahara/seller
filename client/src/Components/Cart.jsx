import { fetchDataFromApi, removeDataFromApi } from "../API/api";

import Khalti from "./Khalti/Khalti";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";

const Cart = () => {
  const [cart_id, set_cart_id] = useState([]);
  const [cart_data, set_cart_data] = useState([]);
  const [count, set_count] = useState(null);
  const { payment, set_payment } = useStateContext();
  useEffect(() => {
    getcartid();
  }, []);
  useEffect(() => {
    if (cart_id !== null) {
      fetch_cartItems();
    }
  }, [cart_id]);
  useEffect(() => {
    if (cart_data) {
      countData();
    }
  }, [cart_data]);

  async function getcartid() {
    try {
      let result = await fetchDataFromApi(
        `/api/carts?populate=*&filters[user]=${localStorage.getItem(
          "USER_EMAIL"
        )}`
      );
      set_cart_id(result.data);
    } catch (error) {
      console.error("Error fetching cart ID:", error);
    }
  }
  async function fetch_cartItems() {
    try {
      let promises = cart_id.map(async (item) => {
        let res = await fetchDataFromApi(
          `/api/alls?populate=*&filters[id]=${item.attributes.cart}`
        );
        return res.data; // Return the data from each async call
      });

      // Wait for all promises to resolve
      let cartDataArray = await Promise.all(promises);
      set_cart_data(cartDataArray);
      countData();
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
  async function countData() {
    set_count(null);

    let total = 0;
    cart_data.forEach((item) => {
      total += item[0].attributes.price;
    });
    set_count(total);
  }
  async function deletecartItems(id) {
    let res = await fetchDataFromApi(
      `/api/carts?populate=*&filters[cart]=${id}`
    );
    console.log();
    let result = await removeDataFromApi(`/api/carts/` + res.data[0].id);
    set_cart_id(cart_id.filter((cart) => cart.id !== res.data[0].id));
  }
  return (
    <div>
      <div>
        <div className="grid grid-cols-2 mt-[40px] gap-[133px]">
          <div className="grid grid-cols-1 gap-8">
            {!cart_data || cart_data.length === 0 ? (
              <h1 className="mb-8 text-2xl text-white">Your Cart is Empty.</h1>
            ) : (
              cart_data.map((cart) => (
                <div key={cart.id} className="grid grid-cols-2 py-5">
                  <div className="rounded-sm">
                    <img
                      className="rounded-sm py-[16px] px-[16px] border"
                      src={
                        process.env.REACT_APP_DEV_URL +
                        cart[0].attributes.img.data.attributes.url
                      }
                      alt="img1"
                      width={256}
                      height={320}
                    />
                  </div>
                  <div className="grid grid-rows-2 pl-[20px]">
                    <div className="font-semibold text-white">
                      {cart[0].attributes.owner}
                    </div>
                    <div className="flex items-end self-end justify-between text-white">
                      <div>
                        <p className="py-2 text-gray-300">
                          {cart[0].attributes.category}
                        </p>
                        <p>{cart[0].attributes.price}</p>
                      </div>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          deletecartItems(cart[0].id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-white">
            Grand Total: {count}
            <span className="text-sm text-white/[0.67] pl-[12px]">
              {/* {grandTotalPrice} */}
            </span>
            <p>
              <button
                onClick={() => {
                  set_payment(true);
                }}
                className="border px-[16px] py-[4px] text-sm mt-[10px]"
              >
                COMPLETE ORDER
              </button>
              {payment && <Khalti price={count} />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
