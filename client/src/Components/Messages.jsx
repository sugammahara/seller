import React, { useEffect, useState } from "react";
import { fetchDataFromApi, removeDataFromApi } from "../API/api";

import ImageModal from "../ContextProvider/ImageModal";
import { MdZoomIn } from "react-icons/md";

const Messages = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const [messages, setMessages] = useState();
  useEffect(() => {
    GetMessageRequests();
  }, []);
  const rejectMessage = async (id) => {
    let result = await removeDataFromApi(`/api/messages/` + id);
    window.location.reload();
  };

  const GetMessageRequests = async () => {
    let res = await fetchDataFromApi(
      `/api/messages?populate=*&filters[owner_email]=${localStorage.getItem(
        "USER_EMAIL"
      )}`
    );
   
    setMessages(res.data);
  };
  return (
    <div>
      {messages &&
        messages.length > 0 &&
        messages.map((item) => (
          <div className="mt-8 text-black">
            <table className="w-full text-left bg-white rounded">
              <thead>
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>

                  <th className="p-4">Contact</th>
                  <th className="p-4">Message</th>

                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4">{item.attributes.message_by_name}</td>
                  <td className="p-4">{item.attributes.message_by_email}</td>

                  <td className="p-4">{item.attributes.contact}</td>
                  <td className="p-4">{item.attributes.message}</td>

                  <td className="pr-3">
                    <button
                      onClick={() => {
                        rejectMessage(item.id);
                      }}
                      className="px-8 py-2 ml-4 bg-red-400 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default Messages;
