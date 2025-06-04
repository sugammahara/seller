import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";

const GuestLayout = () => {
  const { user } = useStateContext();

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div className=" bg-[#1E2433]">
        <div className=" px-[24px] pt-[48px] max-w-[1140px] mx-auto min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;
