import React, { useState } from "react";

import { postDataToApi } from "../API/api";
import { useParams } from "react-router-dom";

const MessageForm = ({ set_form }) => {
  const { owner_email } = useParams();

  const [message, setMessage] = useState();

  const [contact, setContact] = useState();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        owner_email: owner_email,
        message_by_email: localStorage.getItem("USER_EMAIL"),
        message_by_name: localStorage.getItem("USER_NAME"),
        message: message,
        contact: contact,
      };
      console.log(formData);

      let { data } = await postDataToApi("/api/messages", formData, false);
      if (data) {
        alert("Message Sent");
        window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <div className="absolute top-0 bottom-0 right-0 z-100">
      <div>
        <div>
          <div className="relative flex items-center justify-center min-h-screen ">
            <div className=" w-full p-10 bg-[#1E2433] rounded-xl z-10">
              <h3
                className="text-center text-white cursor-pointer"
                onClick={() => {
                  set_form(false);
                }}
              >
                Close
              </h3>
              <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-200">
                  Send Your Message
                </h2>
               
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    Message
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Describe your message in short"
                    name="description"
                    value={message}
                    onChange={handleMessageChange}
                  />

                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    Contact
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="number"
                    placeholder="Contact number"
                    value={contact}
                    onChange={handleContactChange}
                  />
                </div>

                <div className="text-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="px-8 py-2 mt-4 text-white border cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
