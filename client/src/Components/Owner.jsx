import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import React, { useEffect, useState } from "react";

import MessageForm from "./MessageForm";
import Productcard from "./Productcard";
import { fetchDataFromApi } from "../API/api";
import { useParams } from "react-router-dom";

const Owner = () => {
  const { owner_email } = useParams();
  const [Owner, setOwner] = useState();
  const [Owner_data, setOwner_data] = useState();

  useEffect(() => {
    GetOwnerDetails();
    GetOwnerProducts();
  }, []);
  const GetOwnerDetails = async () => {
    let res = await fetchDataFromApi(
      `/api/auths?populate=*&filters[email]=${owner_email}`
    );
    setOwner(res.data);
  };
  const GetOwnerProducts = async () => {
    let res = await fetchDataFromApi(
      `/api/alls?populate=*&filters[email]=${owner_email}`
    );
    setOwner_data(res.data);
  };

  const [form, set_form] = useState(false);

  return (
    <div>
      {form && <MessageForm set_form={set_form} />}
      {Owner && Owner.length > 0 && (
        <div className="">
          <div className="relative">
            <div className="relative w-[1120px] h-80 ">
              <img
                src="/profile.jpg"
                alt="bg-image"
                className="object-cover w-full h-full opacity-60"
              />
            </div>
            <div className="absolute mb-32 -translate-x-[70px] translate-y-[250px] bottom-1 left-1/2 gap-9">
              <div className="relative w-48 h-48">
                <img
                  className="absolute top-0 left-0 w-48 h-48 overflow-hidden rounded-2xl object-cover "
                  src={
                    process.env.REACT_APP_DEV_URL +
                    Owner[0].attributes.img.data.attributes.url
                  }
                  alt="Satya"
                />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-3xl font-bold text-[#2dd4bf] ">
              {Owner[0].attributes.name}
            </h1>
            <h3 className="mb-2 text-[#aee9f2] text-opacity-40">
              {Owner[0].attributes.email}
            </h3>
          </div>
          <div className="mb-8">
            <button
              onClick={() => {
                set_form(true);
              }}
              className="px-12 py-2 text-black bg-green-200 border rounded"
            >
              Contact Now
            </button>
          </div>
          <div className="mb-4 text-3xl text-green-200">Products</div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 768: 2, 900: 3 }}
          >
            <Masonry gutter="24px">
              {Owner_data &&
                Owner_data.length > 0 &&
                Owner_data.map((item) => <Productcard item={item} />)}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
    </div>
  );
};

export default Owner;
