import React from "react";
import dp from "../assets/dp.png";

const ReceiverMessage = ({image,message}) => {
  return (
    <div className="flex justify-start mb-3 px-2">
      <div className="max-w-[70%] bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm flex flex-col gap-2">

        {/* Image (optional) */}
        {image && <img
          src={image}
          alt="received"
          className="w-40 rounded-lg object-cover"
        />}
        

        {/* Message text */}
        {message && <span className="text-sm leading-relaxed">
          {message}
        </span>}
        

        {/* Time */}
        <span className="text-[10px] text-gray-400 self-end">
          10:46 AM
        </span>
      </div>
    </div>
  );
};

export default ReceiverMessage;
