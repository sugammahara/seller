import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "../API/api";

export default function HomeCarousel() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getCarouselItems();
  }, []);

  async function getCarouselItems() {
    const result = await fetchDataFromApi(`/api/offers?populate=*`);
    setCarouselItems(result.data);
  }

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (carouselItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [carouselItems]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (carouselItems.length === 0) return null;

  const attributes = carouselItems[currentIndex].attributes;
  const eventDate = new Date(attributes.date);
  const imageUrl =
    process.env.REACT_APP_DEV_URL + attributes.img.data.attributes.url;

  return (
    <div className="relative w-full container mx-auto overflow-hidden rounded-2xl shadow-lg">
      <div
        key={currentIndex}
        className="relative text-white transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }}
      >
        <div
          className="absolute w-full inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center rounded-2xl"
        >
          <h2 className="text-2xl font-bold">{attributes.title}</h2>
          <p className="text-sm mt-1">
            {eventDate.toLocaleDateString()} –{" "}
            {eventDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <button
            onClick={() => window.open(attributes.link, "_blank")}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold w-fit"
          >
            Learn More
          </button>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 bottom-0 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 bottom-0 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  );
}
