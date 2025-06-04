import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import React, { useState } from "react";

import { postDataToApi } from "../API/api";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate = useNavigate();
  const registerImages = [
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
    { id: 1, path: "/profile.jpg" },
    { id: 1, path: "/profile.jpg" },
    { id: 1, path: "/profile.jpg" },
  ];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Img_Data = new FormData();
    Img_Data.append("files", img);
    try {
      let imageData = await postDataToApi("/api/upload", Img_Data, true);
      const imageId = imageData[0].id;
      const formData = {
        email: email,
        password: password,
        name: name,
        img: imageId,
      };

      let { data } = await postDataToApi("/api/auths", formData, false);
      if (data) {
        alert("account created successfully");
        Navigate("/login");
      }
    } catch (error) {}
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
        <form onSubmit={handleSubmit} className="mt-[104px]">
          <h5 className="text-white mb-[4px]">WELCOME TO SellerHub</h5>
          <p className="text-[#B7B9B9] mb-[72px]">
            Delve into our feelings,sight and emotions through our artwork.
          </p>
          <label className="block text-white">FULL NAME</label>
          <input
            className="text-white mt-[8px] mb-[16px] bg-transparent border border-[#5C6B94] rounded pl-[12px]  py-[8px] pr-[79px]"
            placeholder="Saibaba Nepal"
            value={name}
            onChange={handleNameChange}
          ></input>
          <label className="block text-white">EMAIL</label>
          <input
            className="text-white mt-[8px] mb-[16px] bg-transparent border border-[#5C6B94] rounded pl-[12px]  py-[8px] pr-[79px]"
            placeholder="test_email@gmail.com"
            value={email}
            onChange={handleEmailChange}
          ></input>
          <label className="block text-white">PASSWORD</label>
          <input
            className="text-white block  mt-[8px] mb-[16px] bg-transparent border border-[#5C6B94] rounded  pl-[12px] py-[8px] pr-[79px]"
            placeholder=".........."
            value={password}
            onChange={handlePasswordChange}
          ></input>
          <label className="block text-white">CONFIRM PASSWORD</label>
          <input
            className=" text-white block  mt-[8px] mb-[16px] bg-transparent border border-[#5C6B94] rounded  pl-[12px] py-[8px] pr-[79px]"
            placeholder=".........."
          ></input>
          <label className="block text-white">UPLOAD IMAGE</label>
          <input
            className="text-white block mt-[8px] mb-[16px] bg-transparent border border-[#5C6B94] rounded pl-[12px] py-[8px] pr-[79px]"
            type="file"
            onChange={handleImgChange}
          />
          <button
            type="submit"
            className="text-white border px-[16px] py-[4px] border-[#5C6B94] rounded"
          >
            REGISTER
          </button>
          <p className="mt-[32px] text-[#F7F8F8]">
            Already have an account?
            <a href="/login" className="text-[#B7B9B9] cursor-pointer ml-2">
              Login
            </a>
          </p>
        </form>
        <div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 768: 2, 900: 3 }}
          >
            <Masonry gutter="24px">
              {registerImages.map((img) => {
                return (
                  <img
                    key={`group-${img.id}`}
                    className="w-full h-auto"
                    src={img.path}
                    alt="imagebrowse5"
                    width={0}
                    height={0}
                    sizes="100vw"
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
export default Signup;
