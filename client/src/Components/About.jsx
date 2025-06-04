import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import React from "react";

const About = () => {
  return (
    <div className="bg-[#1E2433]">
      <div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <div className="grid justify-between grid-rows-3 text-white">
              {/* Introduction */}
              <div className="rounded-lg h-max animate-fadeinright">
                <h1 className="text-[28px] px-5">Introduction</h1>
                <p className="px-5 pt-2 text-justify">
                  Welcome to SellerHub — your all-in-one online marketplace for
                  everyday essentials and more. Whether you're shopping for
                  household goods, electronics, fashion, or groceries, we've got
                  you covered. SellerHub is designed to make your shopping
                  experience fast, easy, and enjoyable. With features like
                  real-time product search, secure payments, and convenient
                  delivery options, we bring everything you need right to your
                  fingertips.
                </p>
              </div>

              {/* Our Goals and Mission */}
              <div className="mt-4 rounded-lg h-max animate-fadeinright">
                <h1 className="text-[28px] px-5">Our Goals and Mission</h1>
                <p className="px-5 pt-2 text-justify">
                  At SellerHub, our mission is to revolutionize the way people
                  shop online by combining reliability, convenience, and
                  innovation. We aim to empower buyers and sellers through
                  seamless technology, allowing users to explore top deals,
                  participate in live auctions, and access verified reviews and
                  ratings. Our goal is to create a trusted ecosystem where
                  quality products meet great value — all within a user-friendly
                  and secure platform.
                </p>
              </div>

              {/* Why Choose SellerHub */}
              <div className="mt-4 rounded-lg h-max animate-fadeinright">
                <h1 className="text-[28px] px-5">Why Choose SellerHub?</h1>
                <p className="px-5 pt-2 text-justify">
                  SellerHub offers more than just shopping. With advanced
                  features like auction bidding for rare finds, product reviews
                  and ratings, personalized recommendations, and integrated
                  online payments, we ensure a modern and efficient eCommerce
                  experience. Easily manage your cart, track offers, and
                  discover products with our powerful search engine. Join
                  thousands of happy customers who trust SellerHub to deliver
                  quality, convenience, and value — every day.
                </p>
              </div>
            </div>
          </div>
          <div>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 768: 2, 800: 2 }}
            >
              <Masonry gutter="24px">
                <img
                  className="w-full h-auto animate-fadeinup"
                  src="/devs/sugam.jpg"
                  alt="imagebrowse3"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <img
                  className="w-full h-auto animate-fadeinup"
                  src="/devs/kiran.jpg"
                  alt="imagebrowse3"
                  width={0}
                  height={0}
                  sizes="100vw"
                />

                <img
                  className="w-full h-auto animate-fadeinup"
                  src="/devs/abhinav.jpg"
                  alt="imagebrowse3"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </div>
      <h1 className="text-6xl text-center text-white">Developed By:</h1>
      <div className="max-w-4xl mx-auto py-10">
        <div className="space-y-10">
          {/* Developer Card */}
          {[
            {
              name: "Sugam Mahara",
              role: "Full-Stack Developer",
              contact: "9813083437",
              email: "sugammahara@gmail.com",
              img: "/devs/sugam.jpg",
            },
            {
              name: "Kiran Dahal",
              role: "Full-Stack Developer",
              contact: "9863008384",
              email: "kirandahal@gmail.com",
              img: "/devs/kiran.jpg",
            },
            {
              name: "Abhinav Lamsal",
              role: "Full-Stack Developer",
              contact: "9818264252",
              email: "abhinav@gmail.com",
              img: "/devs/abhinav.jpg",
            },
          ].map((dev, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-6 bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <div>
                <h1 className="text-3xl font-bold text-white">{dev.name}</h1>
                <p className="text-xl text-white">{dev.role}</p>
                <p className="text-lg text-white mt-2">
                  Contact No: {dev.contact}
                  <br />
                  Email: {dev.email}
                </p>
              </div>
              <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden">
                <img
                  src={dev.img}
                  alt={dev.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
