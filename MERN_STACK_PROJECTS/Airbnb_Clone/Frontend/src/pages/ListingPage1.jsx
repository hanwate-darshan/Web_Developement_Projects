import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useContext } from "react";
import { listingDataContext } from "../context/ListingContext.jsx";

const ListingPage1 = () => {
  const navigate = useNavigate();

  let {title, setTitle,
     description, setDescription,
frontEndImage1, setfrontEndImage1,
frontEndImage2, setFrontEndImage2,
frontEndImage3, setFrontEndImage3,
backEndImage1, setBackEndImage1,
backEndImage2, setBackEndImage2,
backEndImage3, setBackEndImage3,
rent, setRent,
city, setCity,
landmark, setLandmark,
category, setCategory} = useContext(listingDataContext)


const handleImage1 = (e) =>{
    let file = e.target.files[0]
    setBackEndImage1(file)
    setfrontEndImage1(URL.createObjectURL(file))
    
}
const handleImage2 = (e) =>{
    let file = e.target.files[0]
    setBackEndImage2(file)
    setFrontEndImage2(URL.createObjectURL(file))

}
const handleImage3 = (e) =>{
    let file = e.target.files[0]
    setBackEndImage3(file)
    setFrontEndImage3(URL.createObjectURL(file))

}



  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center py-10">
      
      {/* Back Button */}
      <FaArrowCircleLeft
        className="w-10 h-10 text-red-500 cursor-pointer absolute top-6 left-6 hover:text-red-700 transition "
        onClick={() => navigate("/")}
      />

      {/* Form Card */}
      <form className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 " onSubmit={(e)=>{e.preventDefault(); navigate("/listingpage2")}} >
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-red-500 text-center">
          Set up your home
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Start by adding basic details about your place
        </p>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Cozy 2BHK near city center"
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black transition"
            required
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="desc" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            rows="4"
            placeholder="Tell guests what makes your place special..."
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black transition resize-none"
            required
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
          />
        </div>

       






{/* Images */}
<div className="flex flex-col gap-4">

  {/* Image 1 */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Image 1
    </label>
    <input
      type="file"
      className="text-sm file:mr-3 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-gray-100 file:text-gray-700
      hover:file:bg-gray-200 transition"
      required
      onChange={handleImage1}
    />
  </div>

  {/* Image 2 */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Image 2
    </label>
    <input
      type="file"
      className="text-sm file:mr-3 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-gray-100 file:text-gray-700
      hover:file:bg-gray-200 transition"
      required
      onChange={handleImage2}
    />
  </div>

  {/* Image 3 */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Image 3
    </label>
    <input
      type="file"
      className="text-sm file:mr-3 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:bg-gray-100 file:text-gray-700
      hover:file:bg-gray-200 transition"
      required
      onChange={handleImage3}
    />
  </div>

</div>




















        {/* Rent */}
        <div className="flex flex-col gap-1">
          <label htmlFor="rent" className="text-sm font-medium text-gray-700">
            Rent (per night)
          </label>
          <input
            type="number"
            id="rent"
            placeholder="₹2500"
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black transition"
            required
                onChange={(e)=>setRent(e.target.value)}
                value={rent}
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="Mumbai"
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black transition"
            required
                onChange={(e)=>setCity(e.target.value)}
                value={city}
          />
        </div>

        {/* Landmark */}
        <div className="flex flex-col gap-1">
          <label htmlFor="landmark" className="text-sm font-medium text-gray-700">
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            placeholder="Near Metro Station"
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black transition"
            required
                onChange={(e)=>setLandmark(e.target.value)}
                value={landmark}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-[#FF385C] hover:bg-[#e31c5f]
          text-white font-semibold py-3 rounded-lg transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default ListingPage1;
