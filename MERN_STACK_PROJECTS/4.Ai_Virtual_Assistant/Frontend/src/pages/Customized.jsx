// import React from 'react'
// import Card from '../components/Card.jsx'
// import image1 from "../assets/image1.png"
// import image2 from "../assets/image2.jpg"
// import image3 from "../assets/image4.png"
// import image4 from "../assets/image5.png"
// import image5 from "../assets/image6.jpeg"
// import image6 from "../assets/image7.jpeg"
// import image7 from "../assets/authBg.png"
// import { RiImageAiFill } from "react-icons/ri";

// const Customized = () => {
//   return (
//     <div className='w-full h-screen overflow-auto  flex justify-center items-center bg-linear-to-t from-[black] to-[#0a0a69]'>
//       <h1>Select your <span>Assistant Image</span> </h1>
//       <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-10  '>

//       <Card image={image1} />
//       <Card image={image2} />
//       <Card image={image3} />
//       <Card image={image4} />
//       <Card image={image5} />
//       <Card image={image6} />
//       <Card image={image7} />
//       <div
//       className="w-37.5 h-62.5 bg-[#090945] border-2 border-blue-800 
//       rounded-2xl overflow-hidden cursor-pointer
//       transition-all duration-300 ease-in-out
//       hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40
//       hover:border-blue-400 flex items-center justify-center"
//     >
//       <RiImageAiFill  className='text-5xl text-white' />
//     </div>
//       </div>
//     <button>Next</button>
      
//     </div>
//   )
// }

// export default Customized












import React from "react";
import Card from "../components/Card.jsx";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image4.png";
import image4 from "../assets/image5.png";
import image5 from "../assets/image6.jpeg";
import image6 from "../assets/image7.jpeg";
import image7 from "../assets/authBg.png";
import { RiImageAiFill } from "react-icons/ri";

const Customized = () => {
  return (
    <div
      className="w-full min-h-screen overflow-auto 
      flex flex-col items-center justify-start
      bg-linear-to-t from-black to-[#0a0a69]
      px-4 py-10"
    >
      {/* Heading */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl 
        font-bold text-white text-center mb-10"
      >
        Select your{" "}
        <span className="text-blue-400 drop-shadow-lg">
          Assistant Image
        </span>
      </h1>

      {/* Cards Wrapper */}
      <div
        className="w-full max-w-6xl 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-6 place-items-center"
      >
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        {/* AI Custom Card */}
        <div
          className="w-35 h-55 sm:w-37.5 sm:h-60 
          bg-[#090945] border-2 border-blue-800 
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/40
          hover:border-blue-400 flex items-center justify-center"
        >
          <RiImageAiFill className="text-5xl text-white" />
        </div>
      </div>

      {/* Button */}
      <button
        className="mt-12 px-10 py-3 rounded-full 
        bg-blue-500 hover:bg-blue-600 
        text-white font-semibold text-lg
        shadow-lg shadow-blue-500/40
        transition-all duration-300 active:scale-95 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Customized;
