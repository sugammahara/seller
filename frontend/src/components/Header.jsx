import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaCloud } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-[#0659716e] flex justify-between py-5 items-center ">
      <div className="flex justify-center items-center gap-12">
        <a
          href="/"
          className=" hover:border-red-100 hover:rounded-lg hover:bg-sky-500 hover:text-white px-5 py-2 cursor-pointer"
        >
          Home         
        </a>
        <a
          href="/products"
          className=" hover:border-red-100 hover:rounded-lg hover:bg-sky-500 hover:text-white px-5 py-2 cursor-pointer"
        >
          products
        </a>
        <a
          href="/about"
          className=" hover:border-red-100 hover:rounded-lg hover:bg-sky-500 hover:text-white px-5 py-2 cursor-pointer"
        >
          About us
        </a>
        <a
          href="/contact"
          className=" hover:border-red-100 hover:rounded-lg hover:bg-sky-500 hover:text-white px-5 py-2 cursor-pointer"
        >
          Contact Us
        </a>
      </div>

      <div>
        <input
          type="text"
          className="border rounded-full w-80 h-10 placeholder:p-5"
          placeholder="Search For Products"
        />
      </div>
      <div className="flex gap-5">
        <div>
          <IoMdNotifications size={40} />
        </div>
        <div>
          {" "}
          <FaCloud size={40} />
        </div>
        <a href="/login">
          <RiAccountCircleFill size={40} />
        </a>
      </div>
    </div>
  );
};

export default Header;
