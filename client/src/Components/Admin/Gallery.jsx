import React, { useEffect, useState } from "react";
import {
  fetchDataFromApi,
  postDataToApi,
  removeDataFromApi,
} from "../../API/api";

const GalleryManager = () => {
  const [gallery, setGallery] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState(null);
  const [imgId, setImgId] = useState(null);
  const [galleryId, setGalleryId] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const result = await fetchDataFromApi("/api/galleries?populate=*");
      setGallery(result.data || []);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  };

  const filteredGallery = gallery
    .map((item) => {
      const attr = item.attributes || {};
      return {
        id: item.id,
        name: attr.name,
        email: attr.email,
        img: attr.img?.data[0].attributes?.url || "",
        imgId: attr.img?.data[0].id || "",
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
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      await removeDataFromApi(`/api/galleries/${id}`);
      alert("Deleted successfully.");
      fetchGallery();
    } catch (error) {
      alert("Failed to delete.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEditForm) {
      await removeDataFromApi(`/api/galleries/${galleryId}`);
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
        name,
        email,
        img: imageId,
      };

      let { data } = await postDataToApi("/api/galleries", formData, false);
      if (data) {
        alert("Gallery entry submitted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEditClick = (item) => {
    setName(item.name);
    setEmail(item.email);
    setImg(item.img);
    setImgId(item.imgId);
    setGalleryId(item.id);
    setShowEditForm(true);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
    setName("");
    setEmail("");
    setImg(null);
    setImgId(null);
    setGalleryId("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search gallery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Entry
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {["Name", "Email", "Image", "Actions"].map((head) => (
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
          {filteredGallery.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No entries found.
              </td>
            </tr>
          )}
          {filteredGallery.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">
              
                  <img
                    src={process.env.REACT_APP_DEV_URL + item.img}
                    className="w-20 h-16 object-cover"
                    alt=""
                  />
                
              </td>
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
              {showEditForm ? "Edit Gallery" : "New Gallery Entry"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-2">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-2">
                <label>Image Upload</label>
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                  className="w-full"
                />
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

export default GalleryManager;
