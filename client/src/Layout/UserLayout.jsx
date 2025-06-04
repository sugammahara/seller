import { Navigate, Outlet } from "react-router-dom";

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import React from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";

const UserLayout = () => {
  const { token } = useStateContext();
  // if (!token) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div className=" bg-[#1E2433] flex flex-col justify-between items-center min-h-screen">
      <div className=" px-[24px] pt-[48px] max-w-[1140px] mx-auto w-full">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
