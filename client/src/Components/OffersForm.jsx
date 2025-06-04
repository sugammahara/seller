import React, { useState } from "react";

import { postDataToApi } from "../API/api";

const OffersForm = () => {
  const [organization, setOrganization] = useState("");
  const [category, setCaterogy] = useState("acrylics");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCaterogy(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Img_Data = new FormData();
    Img_Data.append("files", img);
    try {
      let imageData = await postDataToApi("/api/upload", Img_Data, true);
      const imageId = imageData[0].id;
      const formData = {
        uploader_email: localStorage.getItem("USER_EMAIL"),
        uploader_name: localStorage.getItem("USER_NAME"),
        title: title,
        category: category,
        description: description,
        time: time,
        img: imageId,
        date: date,
        link: link,
      };

      let { data } = await postDataToApi("/api/offers", formData, false);
      if (data) {
        alert("Flyer Uploaded Successfully");
        window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <div>
      <div>
        <div>
          <div className="relative flex items-center justify-center min-h-screen ">
            <div className=" w-full p-10 bg-[#1E2433] rounded-xl z-10">
              <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-200">
                  UPLOAD YOUR ART!
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                {/* onSubmit={onSubmit} */}
                <div className="grid grid-cols-1 space-y-2">
                  <label className="mb-2 text-sm font-bold tracking-wide text-gray-500">
                    Title
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    name="name"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                  />

                  <label
                    htmlFor="art"
                    className="text-sm font-bold tracking-wide text-gray-500 "
                  >
                    WORKSHOP CATEGORY
                  </label>
                  <select
                    className="p-2 text-base border-gray-300 rounded-lg bo2rder focus:outline-none focus:border-indigo-500"
                    name="category"
                    id="art"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <option value="acrylics">Acrylics</option>
                    <option value="watercolor">Watercolor</option>
                    <option value="oil">Oil Painting</option>
                    <option value="portrait">Portrait</option>
                    <option value="abstract">Abstract</option>
                    <option value="glass">Glass Art</option>
                    <option value="pixel">Pixel Art</option>
                  </select>

                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    DESCRIPTION
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Describe your workshop in short"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    Time of Workshop
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="time"
                    placeholder="Ex: 18:00 (24 hour format)"
                    value={time}
                    onChange={handleTimeChange}
                  />
                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    Date of Workshop
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="date"
                    placeholder="yyyy/mm/dd"
                    value={date}
                    onChange={handleDateChange}
                  />
                  <label className="text-sm font-bold tracking-wide text-gray-500 ">
                    Paste the link of Joining
                  </label>
                  <input
                    className="p-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="link"
                    placeholder="Link"
                    value={link}
                    onChange={handleLinkChange}
                  />
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold tracking-wide text-gray-500">
                    ATTACH DOCUMENT
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full p-10 text-center border-4 border-dashed rounded-lg">
                      <div className="flex flex-col items-center justify-center w-full h-full text-center cursor-pointer ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-20 text-blue-400 group-hover:text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-gray-500 pointer-none ">
                          <span className="text-sm text-blue-500 underline ">
                            CHOOSE YOUR WORKSHOP FLYER HERE.
                          </span>
                        </p>
                        <input
                          type="file"
                          name="img"
                          onChange={handleImgChange}
                          className="justify-center hidden mt-4 text-center text-gray-500"
                        />
                      </div>
                    </label>
                  </div>
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

export default OffersForm;
