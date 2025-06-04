import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import Search from "./Search";
import { fetchDataFromApi } from "../API/api";
import { useState } from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";

const Header = () => {
  const { ShowSearch, set_ShowSearch } = useStateContext();
  const [user, set_user] = useState();
  const navigate = useNavigate();

  // const { user, userSystem } = useStateContext();
  useEffect(() => {
    const data = localStorage.getItem("USER_NAME");
    set_user(data);
  }, []);

  return (
    <div className="flex justify-between items-center h-[32px] text-[#F7F8F8] ">
      <ul className="flex gap-8 ">
        <li>
          <a href="/">SellerHub</a>
        </li>

        <li>
          <a href="/category/auction">Auction</a>
        </li>
        <li>
          <a href="/category/refurbished">Refurbished</a>
        </li>
        <li>
          <a href="/about">ABOUT US</a>
        </li>
        <li>
          <a href="/cart">CART</a>
        </li>
        <li>
          <CiSearch onClick={() => set_ShowSearch(true)} />
        </li>
        {ShowSearch && <Search />}
      </ul>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex mr-4">
            {user && (
              <button
                onClick={() => {
                  navigate(
                    `/ownerprofile/${localStorage.getItem("USER_EMAIL")}`
                  );
                }}
                className="text-white cursor-pointer px-[16px] py-[4px]  rounded"
              >
                {user}
              </button>
            )}
            <div
              className="cursor-pointer"
              onClick={() => {
                if (localStorage.getItem("USER_EMAIL")) {
                  navigate("/chooseform");
                } else {
                  alert("login first");
                }
              }}
            >
              <CgProfile className="text-3xl" />
            </div>
          </div>

          {user && (
            <button
              onClick={() => {
                localStorage.removeItem("USER_NAME");
                localStorage.removeItem("USER_EMAIL");
                window.location.href = "/";
              }}
              className="text-white border px-[16px] py-[4px] border-[#5C6B94] rounded"
            >
              LogOut
            </button>
          )}
          {!user && (
            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="text-white border px-[16px] py-[4px] border-[#5C6B94] rounded"
            >
              LogIn
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
