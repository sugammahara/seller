import "react-multi-carousel/lib/styles.css";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { fetchDataFromApi, postDataToApi } from "../API/api";
import { useContext, useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import Productcard from "./Productcard";

import { useStateContext } from "../ContextProvider/ContextProvider";
import HomeCarousel from "./HomeCarousel";

const Home = () => {
  
  const [featuredItems, setFeaturedItems] = useState([]);
  const [auction, setAuction] = useState([]);
  const { ShowSearch, set_ShowSearch } = useStateContext();

  const [visibleCount, setVisibleCount] = useState(6);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    
    getFeaturedItems();
  }, []);
  useEffect(() => {
    getAuctionItems();
  }, []);
  async function getFeaturedItems() {
    let result = await fetchDataFromApi(`/api/alls?populate=*`);
    setFeaturedItems(result.data);
  }
  async function getAuctionItems() {
    let result = await fetchDataFromApi(
      `/api/alls?populate=*&filters[category]=auction`
    );
    setAuction(result.data);
  }
  console.log(featuredItems);
  return (
    <div className="mt-2">
      <HomeCarousel />

      <div>
        <h3 className="text-[#F7F8F8] ">BROWSE BY CATEGORY</h3>
        <div className=" grid grid-cols-3 gap-8 mt-[16px] mb-[12px] ">
          <div className="relative w-full rounded-sm group">
            <a href="/category/electronics">
              <img
                src="/category/electronics.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50 "
              />
            </a>
            <div className="px-[4px] text-white opacity-0 group-hover:opacity-100 hover:text-3xl transition-all duration-500 ease-in-out">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                Electronics
              </h2>
            </div>
          </div>
          <div className="relative w-full rounded-sm group">
            <a href="/category/fashion">
              <img
                src="/category/fashion.jpg"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50 "
                alt="imagebrowse"
              />
            </a>
            <div className="px-[4px] text-white opacity-0 group-hover:opacity-100 hover:text-3xl transition-all duration-500 ease-in-out">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Fashion
              </h2>
            </div>
          </div>
          <div className="relative aspect-square group">
            <a href="/category/accessories">
              <img
                src="/category/accessories.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50"
              />
            </a>
            <div className="px-[4px] text-white opacity-0 group-hover:opacity-100 hover:text-3xl transition-all duration-500 ease-in-out">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                Accessories
              </h2>
            </div>
          </div>
          <div className="relative aspect-square group">
            <a href="/category/groceries">
              <img
                src="/category/groceries.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50"
              />
            </a>
            <div className="px-[4px] text-white opacity-0 group-hover:opacity-100 hover:text-3xl transition-all duration-500 ease-in-out">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                Groceries
              </h2>
            </div>
          </div>
          <div className="relative aspect-square group ">
            <a href="/category/lifestyle">
              <img
                src="/category/home.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50"
              />
            </a>
            <div className="px-[4px] text-white opacity-0 group-hover:opacity-100 hover:text-3xl transition-all duration-500 ease-in-out">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                Home and Lifestyle
              </h2>
            </div>
          </div>
          <div className="relative aspect-square group">
            <a href="/category/health">
              <img
                src="/category/health.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50 "
              />
            </a>
            <div className="px-[4px] text-white opacity-0 group-hover:opacity-100 hover:text-3xl transition-all duration-500 ease-in-out">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                Health and Beauty
              </h2>
            </div>
          </div>
          <div className="relative aspect-square group">
            <a href="/category/sports">
              <img
                src="/category/sports.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50 "
              />
            </a>
            <div className="text-white transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 hover:text-3xl ">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Sports and Outdoors
              </h2>
            </div>
          </div>
          <div className="relative aspect-square group">
            <a href="/category/vintage">
              <img
                src="/category/vintage.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50 "
              />
            </a>
            <div className="text-white transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 hover:text-3xl ">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Vintage Items
              </h2>
            </div>
          </div>
          <div className="relative aspect-square group">
            <a href="/category/refurbished">
              <img
                src="/category/refurbished.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50 "
              />
            </a>
            <div className="text-white transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 hover:text-3xl ">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Refurbished Items
              </h2>
            </div>
          </div>
          <div className="relative aspect-square group">
            <a href="/category/auction">
              <img
                src="category/auction.jpg"
                alt="imagebrowse"
                className="absolute inset-0 object-cover w-full h-full group-hover:opacity-50 "
              />
            </a>
            <div className="text-white transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 hover:text-3xl ">
              <h2 className="pb-[4px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Auction Items
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[48px]">
        <h3 className="text-[#F7F8F8] pb-[16px] ">ALL Products</h3>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 900: 3 }}>
          <Masonry gutter="24px">
            {/* {console.log(products)} */}
            {featuredItems &&
              featuredItems.slice(0, visibleCount).map((product) => (
                <a href={`/overview/${product.id}`}>
                  <Productcard
                    key={`allproduct-${product.id}`}
                    item={product}
                  />
                </a>
              ))}
          </Masonry>
        </ResponsiveMasonry>
        {visibleCount < featuredItems.length && (
          <h3
            className="text-[#F7F8F8] py-[12px] cursor-pointer"
            onClick={handleViewMore}
          >
            VIEW MORE ↓
          </h3>
        )}
      </div>
      <h3 className="text-[#F7F8F8] pb-[16px] ">AVAILABLE AUCTIONS</h3>

      {auction && (
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infiniteLoop={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          className="flex gap-4"
          arrows={true}
          centerMode={true}
          slidesToSlide={1}
        >
          {auction &&
            auction.map((auction) => (
              <div className="p-4 aspect-square" key={`categoory-${"utsav"}`}>
                <a href={`/overview/${auction.id}`}>
                  <div className="h-64">
                    <img
                      className="w-full h-full "
                      src={
                        process.env.REACT_APP_DEV_URL +
                        auction.attributes.img.data.attributes.url
                      }
                      alt="home"
                    />
                  </div>
                </a>
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default Home;
