import React, { useEffect, useState } from "react";
import {
  fetchDataFromApi,
  postDataToApi,
  removeDataFromApi,
} from "../../API/api";

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [messageId, setMessageId] = useState("");
  const [ownerByEmail, setOwnerByEmail] = useState("");
  const [messageByEmail, setMessageByEmail] = useState("");
  const [messageByName, setMessageByName] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const result = await fetchDataFromApi("/api/messages");
      setMessages(result.data || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const filteredMessages = messages
    .map((item) => {
      const attr = item.attributes || {};
      return {
        id: item.id,
        ownerByEmail: attr.owner_email,
        messageByEmail: attr.message_by_email,
        messageByName: attr.message_by_name,
        message: attr.message,
        contact: attr.contact,
      };
    })
    .filter((item) =>
      Object.values(item).some((val) =>
        val !== null && val !== undefined
          ? val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await removeDataFromApi(`/api/messages/${id}`);
      alert("Message deleted successfully.");
      fetchMessages();
    } catch (error) {
      alert("Failed to delete the message.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEditForm) {
      await removeDataFromApi(`/api/messages/${messageId}`);
    }
    try {
      const formData = {
        owner_email: ownerByEmail,
        message_by_email: messageByEmail,
        message_by_name: messageByName,
        message,
        contact: Number(contact),
      };

      let { data } = await postDataToApi("/api/messages", formData, false);
      if (data) {
        alert("Message submitted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEditClick = (item) => {
    setOwnerByEmail(item.ownerByEmail);
    setMessageByEmail(item.messageByEmail);
    setMessageByName(item.messageByName);
    setMessage(item.message);
    setContact(item.contact);
    setMessageId(item.id);
    setShowEditForm(true);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
    setOwnerByEmail("");
    setMessageByEmail("");
    setMessageByName("");
    setMessage("");
    setContact("");
    setMessageId("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Message
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {[
              "Owner Email",
              "Message Email",
              "Message Name",
              "Message",
              "Contact",
              "Actions",
            ].map((head) => (
              <th
                key={head}
                className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredMessages.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No messages found.
              </td>
            </tr>
          )}
          {filteredMessages.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.ownerByEmail}</td>
              <td className="border px-4 py-2">{item.messageByEmail}</td>
              <td className="border px-4 py-2">{item.messageByName}</td>
              <td className="border px-4 py-2">{item.message}</td>
              <td className="border px-4 py-2">{item.contact}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mt-[300px] w-full max-w-xl relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-center">
              {showEditForm ? "Edit Message" : "New Message"}
            </h2>
            <form onSubmit={handleSubmit}>
              {[
                {
                  label: "Owner Email",
                  value: ownerByEmail,
                  onChange: setOwnerByEmail,
                  type: "email",
                },
                {
                  label: "Message Email",
                  value: messageByEmail,
                  onChange: setMessageByEmail,
                  type: "email",
                },
                {
                  label: "Message Name",
                  value: messageByName,
                  onChange: setMessageByName,
                  type: "text",
                },
                {
                  label: "Message",
                  value: message,
                  onChange: setMessage,
                  type: "textarea",
                },
                {
                  label: "Contact",
                  value: contact,
                  onChange: setContact,
                  type: "number",
                },
              ].map(({ label, value, onChange, type }) => (
                <div key={label} className="mb-2">
                  <label>{label}</label>
                  {type === "textarea" ? (
                    <textarea
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  ) : (
                    <input
                      type={type}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  )}
                </div>
              ))}
              <div className="text-center">
                <input
                  type="submit"
                  value="Submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManager;
