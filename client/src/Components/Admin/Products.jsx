import React, { useEffect, useState } from "react";
import {
  fetchDataFromApi,
  postDataToApi,
  removeDataFromApi,
} from "../../API/api";

const ProductsManager = () => {
  // State for product list and search
  const [allItems, setAllItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Form fields state
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("electronics");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [imgId, setImgId] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Fetch products on mount
  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const result = await fetchDataFromApi("/api/alls?populate=*");
      setAllItems(result.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Map and filter products for search
  const filteredAlls = allItems
    .map((item) => {
      const attr = item.attributes || {};
      return {
        id: item.id,
        email: attr.email,
        owner: attr.owner,
        title: attr.title,
        price: attr.price,
        description: attr.description,
        category: attr.category,
        location: attr.location,
        img: attr.img?.data?.attributes?.url || "",
        imgId: attr.img?.data?.id || "",
      };
    })
    .filter((item) =>
      Object.values(item).some((val) =>
        val
          ? val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    );

  // Delete with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await removeDataFromApi(`/api/alls/${id}`);
      alert("Item deleted successfully.");
      fetchAllItems();
    } catch (error) {
      alert("Failed to delete the item.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showEditForm) {
      await removeDataFromApi(`/api/alls/${productId}`);
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
        email: email,
        owner: owner,
        title: title,
        category: category,
        description: description,
        price: price,
        img: imageId,
        location: location,
      };

      let { data } = await postDataToApi("/api/alls", formData, false);
      if (data) {
        alert("Your product is submitted.");
        window.location.reload();
      }
    } catch (error) {}
  };

  const handleEditClick = (item) => {
    setEmail(item.email);
    setOwner(item.owner);
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setPrice(item.price);
    setLocation(item.location);
    setImg(item.img);
    setImgId(item.imgId);
    setProductId(item.id);
    setShowEditForm(true);
    setShowForm(true);
    console.log(item);
  };
  const handlecloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
    setEmail("");
    setOwner("");
    setTitle("");
    setCategory("electronics");
    setDescription("");
    setPrice("");
    setLocation("");
    setImg(null);
    setImgId(null);
    setProductId("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search and New button */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by title, email, owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New
        </button>
      </div>

      {/* Products Table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {[
              "Email",
              "Price",
              "Owner",
              "Image",
              "Description",
              "Title",
              "Location",
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
          {filteredAlls.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center p-4">
                No records found.
              </td>
            </tr>
          )}
          {filteredAlls.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.price}</td>
              <td className="border border-gray-300 px-4 py-2">{item.owner}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.img ? (
                  <img
                    src={process.env.REACT_APP_DEV_URL + item.img}
                    alt={item.title}
                    className="w-20 h-16 object-cover"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.location}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2 flex items-center justify-center flex-col  gap-2">
                {/* You can add edit functionality here later */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
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
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              onClick={() => handlecloseForm()}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
             {showEditForm && <span>Edit Products</span>}
              {!showEditForm && <span>Add New Products</span>}
            </h2>
            <form onSubmit={handleSubmit} className="">
              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label>Owner</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={owner}
                  onChange={handleOwnerChange}
                />
              </div>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div>
                <label>Category</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={category}
                  onChange={handleCategoryChange}
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
              <div>
                <label>Description</label>
                <textarea
                  className="w-full border px-3 py-2 rounded"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
              <div>
                <label>Location</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={location}
                  onChange={handleLocationChange}
                />
              </div>
              <div>
                <label>Image Upload</label>
                <input
                  type="file"
                  className="w-full"
                  onChange={handleImgChange}
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

export default ProductsManager;
