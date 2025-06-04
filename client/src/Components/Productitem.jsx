import { fetchDataFromApi, postDataToApi, removeDataFromApi } from "../API/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Fragment } from "react";
import Khalti from "./Khalti/Khalti";
import React from "react";
import { useStateContext } from "../ContextProvider/ContextProvider";

const Productitem = () => {
  const owner_email = localStorage.getItem("USER_EMAIL");
  const navigate = useNavigate();
  const { id } = useParams();
  const [bid_amount, set_bid_amount] = useState();
  const [review, set_review] = useState();
  const [fetch_review, set_fetch_review] = useState();

  const [item, setItem] = useState([]);
  const [user_photo, set_user_photo] = useState([]);
  const { payment, set_payment } = useStateContext();
  useEffect(() => {
    GetProductItem();
    GetReviews();
  }, []);
  useEffect(() => {
    if (item && item.length > 0) {
      Get_user_photo();
    }
  }, [item]);

  const handleBidChange = (e) => {
    set_bid_amount(e.target.value);
  };
  const handleReviewChange = (e) => {
    set_review(e.target.value);
  };

  async function GetProductItem() {
    let res = await fetchDataFromApi(`/api/alls?populate=*&filters[id]=${id}`);
    setItem(res.data);
  }
  async function GetReviews() {
    let res = await fetchDataFromApi(
      `/api/reviews?populate=*&filters[product_id]=${id}`
    );
    set_fetch_review(res.data);
  }
  async function Get_user_photo() {
    let res = await fetchDataFromApi(
      `/api/auths?populate=*&filters[email]=${item[0].attributes.email}`
    );
    if (res && res.data.length > 0) {
      set_user_photo(res.data[0].attributes.img.data.attributes.url);
    }
  }
  const handleAddToCart = async (id) => {
    if (!localStorage.getItem("USER_EMAIL")) {
      alert("login first");
      return 0;
    }
    const formData = {
      cart: id,
      user: localStorage.getItem("USER_EMAIL"),
    };

    let { data } = await postDataToApi("/api/carts", formData, false);
    if (data) {
      alert("added to cart successfully");
    }
  };
  const handle_bid_data = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("USER_EMAIL")) {
      alert("login first");
      return 0;
    }

    const formData = {
      email: item[0].attributes.email,
      owner: item[0].attributes.owner,
      bid_amount: bid_amount,
      bid_by_email: localStorage.getItem("USER_EMAIL"),
      bid_by_name: localStorage.getItem("USER_NAME"),
      title: item[0].attributes.title,
      category: item[0].attributes.category,
      description: item[0].attributes.description,
      price: item[0].attributes.price,
      img: item[0].attributes.img.data.id,
      status: false,
    };
    console.log(formData);
    let { data } = await postDataToApi("/api/bids", formData, false);
    if (data) {
      alert("Bided Successfully");
    }
  };
  const deleteProduct = async (id) => {
    let result = await removeDataFromApi(`/api/alls/` + id);
    alert("product deleted successfully");

    window.location.href = `/ownerprofile/${owner_email}`;
  };

  const handle_review_data = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("USER_EMAIL")) {
      alert("login first");
      return 0;
    }

    const formData = {
      reviewer_email: localStorage.getItem("USER_EMAIL"),
      reviewer_name: localStorage.getItem("USER_NAME"),
      review_words: review,
      product_id: item[0].id,
    };
    console.log(formData);
    let { data } = await postDataToApi("/api/reviews", formData, false);
    if (data) {
      alert("Your Review Was Submitted");
    }
  };

  return (
    <Fragment>
      {item && item.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-8 mt-[48px]">
            <div className="bold text-[16px] text-white text-justify ">
              <h1 className="text-2xl text-bold">{item[0].attributes.title}</h1>
              <div
                className="mb-[120px] mt-[64px]"
                type="text"
                name="description"
              >
                {item[0].attributes.description}
              </div>

              <div className="max-w-[255px]">
                <div className="block">
                  <div className="relative flex-1 group">
                    <div
                      onClick={() => {
                        navigate(`/ownerprofile/${item[0].attributes.email}`);
                      }}
                      className="transition-opacity duration-300 ease-in-out opacity-100 cursor-pointer group-hover:opacity-50"
                    >
                      <img
                        className="object-contain w-32 h-32 rounded-full "
                        src={process.env.REACT_APP_DEV_URL + user_photo}
                        alt="owner profile"
                      />
                    </div>
                    <p
                      className="absolute transition-opacity duration-300 -translate-y-4 opacity-0 cursor-pointer group-hover:opacity-100 top-1/2 left-4"
                      type="text"
                      name="ownername"
                      onClick={() => {
                        navigate(`/ownerprofile/${item[0].attributes.email}`);
                      }}
                    >
                      Owner Profile
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-[24px] ">
                  <div>
                    <h5 className="">{item[0].attributes.owner}</h5>
                  </div>
                  <div className="text-red-600">
                    &#8360; {item[0].attributes.price}
                  </div>
                </div>

                {item[0].attributes.category == "auction" && (
                  <form onSubmit={handle_bid_data}>
                    <div className="text-black mb-[12px] mt-8 ">
                      <h3 className="text-white mb-[8px]">Bid The Product</h3>
                      <input
                        className=" text-center text-[#5C6B94] bg-transparent border border-[#5C6B94] py-[2px] px-[8px] "
                        type="number"
                        name="bidprice"
                        step={2000}
                        required
                        value={bid_amount}
                        onChange={handleBidChange}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-[16px]">
                      <button
                        type="submit"
                        value="Submit"
                        className="border border-[#5C6B94] px-[16px] py-[4px]  text-white bg-gradient-to-r from-[#0F131B] to-transparent"
                      >
                        BID NOW
                      </button>
                    </div>
                  </form>
                )}
                <div
                  onClick={() => {
                    if (!localStorage.getItem("USER_EMAIL")) {
                      alert("login first");
                    } else {
                      set_payment(true);
                    }
                  }}
                  className="border cursor-pointer block border-[#5C6B94] px-[16px] py-[4px] bg-gradient-to-r from-[#0F131B] to-transparent max-w-[130px] text-center"
                >
                  {payment && <Khalti price={item[0].attributes.price} />}
                  BUY NOW
                </div>

                <button
                className="py-5"
                  onClick={() => {
                    handleAddToCart(item[0].id);
                  }}
                >
                  ADD TO CART
                </button>
                {owner_email == item[0].attributes.email && (
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      deleteProduct(item[0].id);
                    }}
                  >
                    DELETE THE PRODUCT
                  </button>
                )}
              </div>
            </div>
            <div>
              <img
                className="border rounded-s border-[#5C6B94] p-[16px]"
                src={
                  process.env.REACT_APP_DEV_URL +
                  item[0].attributes.img.data.attributes.url
                }
                alt="Product Item"
                width={627}
                height={727}
              />
              <div className="flex justify-between mt-2 text-gray-500 ">
                By: {item[0].attributes.email}
                <p className="text-gray-400">
                  On: {item[0].attributes.publishedAt}
                </p>{" "}
              </div>
            </div>
          </div>
          <form onSubmit={handle_review_data} className="mt-[76px]">
            <h5 className="text-white mb-[18px]">GIVE REVIEWS</h5>
            <div>
              <input
                type="text"
                className="w-[1092px] h-[100px] pl-[12px] pt-[4px] bg-transparent border border-[#5C6B94] text-[#5C6B94]"
                placeholder="Leave a Review"
                value={review}
                onChange={handleReviewChange}
              />
              <button
                className="px-2 py-1 mt-4 text-white border border-opacity-15"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-4 text-white">REVIEWS</div>
          {fetch_review &&
            fetch_review.length > 0 &&
            fetch_review.map((item) => (
              <div className="p-8 mt-2 text-white bg-black bg-opacity-30">
                <h4> {item.attributes.reviewer_name}</h4>
                <div className="flex justify-between mt-2">
                  <h2>{item.attributes.review_words}</h2>
                  <h4>From {item.attributes.reviewer_email}</h4>
                </div>
                {console.log(item.attributes.review_words)}
              </div>
            ))}
        </>
      )}
    </Fragment>
  );
};

export default Productitem;
