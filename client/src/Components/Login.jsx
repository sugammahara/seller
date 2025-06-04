import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import React from "react";
import { fetchDataFromApi } from "../API/api";
import { useState } from "react";

const loginImages = [
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
  { id: 1, path: "/profile.jpg" },
];
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    let { data } = await fetchDataFromApi(
      `/api/auths?populate=*&filters[$and][0][email]=${formData.email}&filters[$and][1][password]=${formData.password}`
    );

    if (!data.length) {
      alert("wrong credentials");
    } else {
      localStorage.setItem("USER_NAME", data[0].attributes.name);
      localStorage.setItem("USER_EMAIL", data[0].attributes.email);
      window.location.href = "/";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center h-[32px] text-[#F7F8F8] ">
        <ul className="flex gap-8 ">
          <li>
            <a href="/">SellerHub</a>
          </li>

          <li>
            <a href="/about">ABOUT</a>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-2">
        <form className="mt-[104px]" onSubmit={handleSubmit}>
          <h5 className="text-white mb-[4px]">WELCOME BACK</h5>
          <p className="text-[#B7B9B9] mb-[72px]">
            We have been waiting for you
          </p>
          <label className="block text-white">Email</label>
          <input
            className=" mt-[8px] text-white mb-[16px] bg-transparent border border-[#5C6B94] rounded pl-[12px]  py-[8px] pr-[79px]"
            placeholder="maryjane@gmail.com"
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            id="email"
          ></input>
          <label className="block text-white">Password</label>
          <input
            className="block  text-white mt-[8px] mb-[16px] bg-transparent border border-[#5C6B94] rounded  pl-[12px] py-[8px] pr-[79px]"
            placeholder=".........."
            type="password"
            value={password}
            onChange={handlePasswordChange}
            name="password"
            id="password"
          ></input>

          <button
            type="submit"
            className="text-white border px-[16px] py-[4px] border-[#5C6B94] rounded"
          >
            LOGIN
          </button>
          <a href="" className="text-[#B7B9B9] ml-[80px]">
            Forgot Password?
          </a>
          <p className="mt-[32px] text-[#F7F8F8]">
            Donot have an account?
            <a href="/signup" className="text-[#B7B9B9] cursor-pointer ml-2">
              Get Started
            </a>
          </p>
        </form>
        <div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 768: 2, 900: 3 }}
          >
            <Masonry gutter="24px">
              {loginImages.map((img) => {
                return (
                  <img
                    key={`group-${img.id}`}
                    className="w-full h-auto"
                    src={img.path}
                    alt="imagebrowse5"
                  />
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    </div>
  );
};

export default Login;
