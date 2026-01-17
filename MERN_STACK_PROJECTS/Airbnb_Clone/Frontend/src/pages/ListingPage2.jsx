
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaFire } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { LuTentTree } from "react-icons/lu";
import { GiWoodCabin, GiTreehouse } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { listingDataContext } from "../context/ListingContext.jsx";

const ListingPage2 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  let {category , setCategory} = useContext(listingDataContext)

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 px-4 py-10">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/listingpage1")}
        className="absolute top-6 left-6 text-[#FF385C] hover:scale-110 transition"
      >
        <FaArrowCircleLeft className="w-8 h-8" />
      </button>

      {/* Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Heading */}
        <div className="text-center py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF385C]">
            Set your category
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Which of these best describes your place?
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          
          {[
            { name: "Trending", icon: <FaFire /> },
            { name: "Houses", icon: <FaHouseChimney /> },
            { name: "Rooms", icon: <MdBedroomParent /> },
            { name: "Farm", icon: <PiFarm /> },
            { name: "Pool", icon: <MdOutlinePool /> },
            { name: "Tents", icon: <LuTentTree /> },
            { name: "Cabins", icon: <GiWoodCabin /> },
            { name: "Shops", icon: <BsShop /> },
            { name: "Treehouse", icon: <GiTreehouse /> },
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => setSelected(item.name)}
              className={`flex flex-col items-center justify-center gap-2
              border rounded-xl p-4 cursor-pointer transition
              ${
                selected === item.name
                  ? "border-[#FF385C] bg-red-50 text-[#FF385C]"
                  : "border-gray-200 hover:border-[#FF385C] hover:text-[#FF385C]"
              }`}
            >
              <div className="text-2xl">{item.icon}</div>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}

        </div>

        {/* Button */}
        <button
          disabled={!selected}
          className={`mt-8 w-full py-3 rounded-xl font-semibold transition
          ${
            selected
              ? "bg-[#FF385C] hover:bg-[#e31c5f] text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => navigate("/listingpage3")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingPage2;
