import React from "react";

const Chooseform = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <header className="py-4 text-center text-white ">
          <h1 className="text-4xl font-bold">Seller Ventures</h1>
          <p className="mt-4 text-gray-400 text-l">
            (Choose what you are planning to do)
          </p>
        </header>
        <div>
          <main className="items-center justify-center gap-8 p-4 mt-8 ">
            <a href={"/uploadform"}>
              <section className="p-8 mb-8 bg-white rounded-lg shadow-md cursor-pointer option-container">
                <h2 className="mb-4 text-3xl font-semibold">
                  Sell Your Products
                </h2>
                <p className="mb-4 text-gray-600">
                  Explore the possibility of selling your products
                </p>
              </section>
            </a>
            <a href={"/bidrequests"}>
              <section className="p-8 mb-8 bg-white rounded-lg shadow-md cursor-pointer option-container">
                <h2 className="mb-4 text-3xl font-semibold">Bid Requests</h2>
                <p className="mb-4 text-gray-600">Dive into bid requests.</p>
              </section>
            </a>
            <a href={"/offersform"}>
              <section className="p-8 mb-8 bg-white rounded-lg shadow-md cursor-pointer option-container">
                <h2 className="mb-4 text-3xl font-semibold">
                  Start Your Product offers
                </h2>
                <p className="mb-4 text-gray-600">
                  Share your offers in products through here
                </p>
              </section>
            </a>
            <a href={"/commissions"}>
              <section className="p-8 mb-8 bg-white rounded-lg shadow-md cursor-pointer option-container">
                <h2 className="mb-4 text-3xl font-semibold">
                  Message Requests
                </h2>
                <p className="mb-4 text-gray-600">
                  Share your artistic skills by taking commissioned orders from
                  buyers.
                </p>
              </section>
            </a>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Chooseform;
