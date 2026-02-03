import React, { useContext } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/ListingContext.jsx";

const ListingPage3 = () => {
  const navigate = useNavigate();

  const {
    title,
    description,
    frontEndImage1,
    frontEndImage2,
    frontEndImage3,
    rent,
    city,
    landmark,
    handleAddListing,
  } = useContext(listingDataContext);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">

  {/* Back Button */}
  <button
    onClick={() => navigate("/listingpage2")}
    className="absolute top-6 left-6 text-[#FF385C] hover:scale-110 transition"
  >
    <FaArrowCircleLeft className="w-8 h-8" />
  </button>

  {/* Main Card */}
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

    {/* Content Wrapper */}
    <div className="p-6 sm:p-10 flex flex-col gap-8">

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 text-center">
        {title}
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>

      {/* Images Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <img
          src={frontEndImage1}
          alt="Home Image 1"
          className="w-full h-64 object-cover rounded-xl"
        />
        <img
          src={frontEndImage2}
          alt="Home Image 2"
          className="w-full h-64 object-cover rounded-xl"
        />
        <img
          src={frontEndImage3}
          alt="Home Image 3"
          className="w-full h-64 object-cover rounded-xl"
        />
      </div>

      {/* Price & Location */}
      <div className="text-center flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-[#FF385C]">
          ₹{rent} / night
        </h2>
        <p className="text-gray-500 uppercase tracking-wide text-sm">
          {city}, {landmark}
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleAddListing}
        className="w-full bg-[#FF385C] hover:bg-[#e31c5f]
        text-white font-semibold py-4 rounded-xl
        transition active:scale-95"
      >
        Add Listing
      </button>

    </div>
  </div>
</div>


  )
};

export default ListingPage3;
