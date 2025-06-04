import { useEffect, useState } from "react";

import React from "react";
import { fetchDataFromApi } from "../API/api";
import { useParams } from "react-router-dom";

const Offers = () => {
  const [workitem, setworkitem] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getworkshopitem();
  }, []);

  async function getworkshopitem() {
    let result = await fetchDataFromApi(
      `/api/offers?populate=*&filters[id]=${id}`
    );
    setworkitem(result.data);
  }

  return (
    <>
      {workitem &&
        workitem.length > 0 &&
        workitem.map((workitem) => (
          <div className="flex flex-cols-1">
            <div>
              
              <div className="grid grid-cols-2 mx-auto gap-9">
                <div className="ml-0">
                  <img
                    className="border rounded-s border-[#5C6B94] p-[16px] "
                    src={
                      process.env.REACT_APP_DEV_URL +
                      workitem.attributes.img.data.attributes.url
                    }
                    alt="Product Item"
                    width={627}
                    height={727}
                  />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-white">
                    {workitem.name || "Painting Workshop"}
                    {workitem.attributes.name}
                  </h2>
                  <h5 className="mb-4 text-gray-300">
                    {workitem.attributes.description}
                  </h5>
                  <p className="mb-4 text-gray-300">
                    {workitem.attributes.desc}
                  </p>
                  <p className="pb-8 text-gray-600 ">
                    You can join the workshop when the organizer starts their
                    meeting. Click the link below to join your workshop.
                  </p>
                  <h7 className="mr-2 text-gray-300">Your Meet Link:</h7>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {workitem.attributes.link}
                  </a>
                </div>
              </div>
            </div>
            <div class=" py-8 pl-4  mt-8">
              <div class="w-full shadow-lg">
                <div class="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
                  <div class="px-4">
                    <div class="border-b pb-4 border-gray-400 border-dashed">
                      <h1 className="mt-2 mb-4 text-lg font-medium leading-6 text-gray-800 focus:outline-none dark:text-gray-100">
                        Zoom call with Workshop team members
                      </h1>
                      <p class="text-xl font-light leading-3 text-gray-500 dark:text-gray-300 mb-4">
                        {workitem.attributes.time}
                      </p>
                      <p class="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">
                        Discussion on Still Life Art at first.
                      </p>
                    </div>
                    <div class="border-b pb-4 border-gray-400 border-dashed pt-5 ">
                      <a
                        tabindex="0"
                        class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2"
                      >
                        Orientation session with new members starts from
                      </a>
                      <p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300 mt-4">
                        {workitem.attributes.date}
                      </p>
                    </div>
                    <div className="text-center">
                      <button className="p-3 mt-4 rounded-lg bg-cyan-100">
                        Book an appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default Offers;
