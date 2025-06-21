import React, { useEffect, useState } from "react";
import {
  fetchDataFromApi,
  postDataToApi,
  removeDataFromApi,
} from "../../API/api";

const BidsManager = () => {
  const [bids, setBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [email, setEmail] = useState("");
  const [bidId, setBidId] = useState("");
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("electronics");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [bidByName, setBidByName] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [status, setStatus] = useState(false);
  const [bidByEmail, setBidByEmail] = useState("");

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const result = await fetchDataFromApi("/api/bids?populate=*");
      setBids(result.data || []);
    } catch (error) {
      console.error("Failed to fetch bids:", error);
    }
  };

  const filteredBids = bids
    .map((item) => {
      const attr = item.attributes || {};
      return {
        id: item.id,
        email: attr.email,
        owner: attr.owner,
        title: attr.title,
        category: attr.category,
        description: attr.description,
        price: attr.price,
        img: attr.img?.data?.attributes?.url || "",
        imgId: attr.img?.data?.id || "",
        bidByName: attr.bid_by_name,
        bidAmount: attr.bid_amount,
        status: attr.status,
        bidByEmail: attr.bid_by_email,
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
    if (!window.confirm("Are you sure you want to delete this bid?")) return;
    try {
      await removeDataFromApi(`/api/bids/${id}`);
      alert("Bid deleted successfully.");
      fetchBids();
    } catch (error) {
      alert("Failed to delete the bid.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEditForm) {
      await removeDataFromApi(`/api/bids/${bidId}`);
    }
    try {
      let imageId;

      if (img instanceof File) {
        const Img_Data = new FormData();
        Img_Data.append("files", img);
        let imageData = await postDataToApi("/api/upload", Img_Data, true);
        imageId = imageData[0].id;
      } else {
        imageId = imgId;
      }

      const formData = {
        email,
        owner,
        title,
        category,
        description,
        price: Number(price),
        img: imageId,
        bid_by_name: bidByName,
        bid_amount: bidAmount,
        status,
        bid_by_email: bidByEmail,
      };

      let { data } = await postDataToApi("/api/bids", formData, false);
      if (data) {
        alert("Bid submitted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEditClick = (item) => {
    setEmail(item.email);
    setOwner(item.owner);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setPrice(item.price);
    setImg(item.img);
    setImgId(item.imgId);
    setBidByName(item.bidByName);
    setBidAmount(item.bidAmount);
    setStatus(item.status);
    setBidByEmail(item.bidByEmail);
    setBidId(item.id);
    setShowEditForm(true);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
    setEmail("");
    setOwner("");
    setTitle("");
    setCategory("electronics");
    setDescription("");
    setPrice("");
    setImg(null);
    setImgId(null);
    setBidByName("");
    setBidAmount("");
    setStatus(false);
    setBidByEmail("");
    setBidId("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search bids..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Bid
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {[
              "Email",
              "Owner",
              "Title",
              "Image",
              "Description",
              "Price",
              "Bid Name",
              "Bid Amount",
              "Status",
              "Bid Email",
              "Category",
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
          {filteredBids.length === 0 && (
            <tr>
              <td colSpan={12} className="text-center p-4">
                No bids found.
              </td>
            </tr>
          )}
          {filteredBids.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.owner}</td>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">
                {item.img ? (
                  <img
                    src={process.env.REACT_APP_DEV_URL + item.img}
                    className="w-20 h-16 object-cover"
                    alt=""
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">{item.bidByName}</td>
              <td className="border px-4 py-2">{item.bidAmount}</td>
              <td className="border px-4 py-2">
                {item.status ? "Active" : "Inactive"}
              </td>
              <td className="border px-4 py-2">{item.bidByEmail}</td>
              <td className="border px-4 py-2">{item.category}</td>
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
            <h2 className="text-xl font-semibold  text-center">
              {showEditForm ? "Edit Bid" : "New Bid"}
            </h2>
            <form onSubmit={handleSubmit}>
              {[
                {
                  label: "Email",
                  value: email,
                  onChange: setEmail,
                  type: "email",
                },
                {
                  label: "Owner",
                  value: owner,
                  onChange: setOwner,
                  type: "text",
                },
                {
                  label: "Title",
                  value: title,
                  onChange: setTitle,
                  type: "text",
                },

                {
                  label: "Description",
                  value: description,
                  onChange: setDescription,
                  type: "textarea",
                },
                {
                  label: "Price",
                  value: price,
                  onChange: setPrice,
                  type: "number",
                },
                {
                  label: "Bid By Name",
                  value: bidByName,
                  onChange: setBidByName,
                  type: "text",
                },
                {
                  label: "Bid Amount",
                  value: bidAmount,
                  onChange: setBidAmount,
                  type: "number",
                },
                {
                  label: "Bid By Email",
                  value: bidByEmail,
                  onChange: setBidByEmail,
                  type: "email",
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
              <div className="mb-2">
                <label>Status</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={status}
                  onChange={(e) => setStatus(e.target.value === "true")}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="mb-2">
                <label>Image Upload</label>
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="w-full"
                />
              </div>
              <div>
                <label>Category</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={category}
                  onChange={(e)=>{setCategory(e.target.value)}}
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="accessories">Accessories</option>
                  <option value="groceries">Groceries</option>
                  <option value="lifestyle">Home And Lifestyle</option>
                  <option value="health">Health and Beauty</option>
                  <option value="sports">Sports and Outdoors</option>
                  <option value="vintage">Vintage Items</option>
                  <option value="refurbished">Refurbished</option>
                  <option value="auction">Auction</option>
                </select>
              </div>
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

export default BidsManager;
