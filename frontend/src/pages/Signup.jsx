import React from "react";
import { Link } from "react-router-dom";
export const Signup = () => {
  return (
    <div className="w-full h-150 flex justify-center items-center">
      <form
        action="  "
        className="flex gap-5 pt-3 flex-col border border-[#a07878ed]  pb-20 px-30 border-5 rounded-2xl shadow-2xl bg-[#f5e5e69c] "
      >
        <h1 className="text-4xl ">Signup FORM</h1>
        <label className="text-xl" htmlFor=" ">
          {" "}
          Username
        </label>
        <input className="border-2" type="text" />
        <label className="text-xl " htmlFor="">
          Phone
        </label>
        <input className="border-2" type="number" />
        <label className="text-xl" htmlFor="">
          {" "}
          Password
        </label>
        <input className=" border-2" type="password" />
        <div className="flex justify-center ">
          {" "}
          <button className="bg-[#ce9c9d] w-30 rounded-4xl px-5 py-2 hover:bg-red-800 hover:text-white cursor-pointer">
            Submit
          </button>{" "}
        </div>
        <h2> Already have an account?</h2>
        <Link to={"/login"}>sign in </Link>
      </form>
    </div>
  );
};
