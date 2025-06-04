import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-[#263065] to-[#1e2433] w-full">
      <div className=" px-[24px] max-w-[1140px] mx-auto pt-[120px] pb-[24px] ">
        <h5 className="text-[#F7F8F8] ">©2023, ALL RIGHTS RESERVED.</h5>
        <h5 className="text-[#F7F8F8]">SellerHub</h5>
        <a href="/contact">
          {" "}
          <h5 className="text-[#F7F8F8]">Contact Us</h5>
        </a>
      </div>
    </div>
  );
};

export default Footer;
