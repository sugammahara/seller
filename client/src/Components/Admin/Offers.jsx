import React, { useEffect, useState } from "react";
import {
  fetchDataFromApi,
  postDataToApi,
  removeDataFromApi,
} from "../../API/api";

const OfferManager = () => {
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [offerId, setOfferId] = useState("");
  const [uploaderEmail, setUploaderEmail] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("electronics");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const result = await fetchDataFromApi("/api/offers?populate=*");
      setOffers(result.data || []);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  const filteredOffers = offers
    .map((item) => {
      const attr = item.attributes || {};
      return {
        id: item.id,
        uploaderEmail: attr.uploader_email,
        uploaderName: attr.uploader_name,
        title: attr.title,
        category: attr.category,
        description: attr.description,
        img: attr.img?.data?.attributes?.url || "",
        imgId: attr.img?.data?.id || "",
        time: attr.time,
        date: attr.date,
        link: attr.link,
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
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await removeDataFromApi(`/api/offers/${id}`);
      alert("Offer deleted successfully.");
      fetchOffers();
    } catch (error) {
      alert("Failed to delete the offer.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEditForm) {
      await removeDataFromApi(`/api/offers/${offerId}`);
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
        uploader_email: uploaderEmail,
        uploader_name: uploaderName,
        title,
        category,
        description,
        img: imageId,
        time,
        date,
        link,
      };

      let { data } = await postDataToApi("/api/offers", formData, false);
      if (data) {
        alert("Offer submitted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEditClick = (item) => {
    setUploaderEmail(item.uploaderEmail);
    setUploaderName(item.uploaderName);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setImg(item.img);
    setImgId(item.imgId);
    setTime(item.time);
    setDate(item.date);
    setLink(item.link);
    setOfferId(item.id);
    setShowEditForm(true);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
    setUploaderEmail("");
    setUploaderName("");
    setTitle("");
    setCategory("electronics");
    setDescription("");
    setImg(null);
    setImgId(null);
    setTime("");
    setDate("");
    setLink("");
    setOfferId("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search offers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Offer
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {[
              "Uploader Email",
              "Uploader Name",
              "Title",
              "Image",
              "Description",
              "Time",
              "Date",
              "Link",
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
          {filteredOffers.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center p-4">
                No offers found.
              </td>
            </tr>
          )}
          {filteredOffers.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.uploaderEmail}</td>
              <td className="border px-4 py-2">{item.uploaderName}</td>
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
              <td className="border px-4 py-2">{item.time}</td>
              <td className="border px-4 py-2">{item.date}</td>
              <td className="border px-4 py-2">
                <a
                  href={item.link}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                </a>
              </td>
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
            <h2 className="text-xl font-semibold text-center">
              {showEditForm ? "Edit Offer" : "New Offer"}
            </h2>
            <form onSubmit={handleSubmit}>
              {[
                {
                  label: "Uploader Email",
                  value: uploaderEmail,
                  onChange: setUploaderEmail,
                  type: "email",
                },
                {
                  label: "Uploader Name",
                  value: uploaderName,
                  onChange: setUploaderName,
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
                { label: "Time", value: time, onChange: setTime, type: "time" },
                { label: "Date", value: date, onChange: setDate, type: "date" },
                { label: "Link", value: link, onChange: setLink, type: "link" },
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
                  onChange={(e) => setCategory(e.target.value)}
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

export default OfferManager;
